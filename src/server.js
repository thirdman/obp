import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';

import stores from './shared/stores';
import config from './config';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
// import getRoutes from './routes';

import { RouterContext, match } from 'react-router';
import { Provider } from 'mobx-react';

let targetUrl = process.env.API_HOST;
if (process.env.MODE === 'local') {
	targetUrl += ':' + process.env.APIPORT;
}

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
	target: targetUrl,
	ws: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server ---------------------------------
app.use('/api', (req, res) => {
	proxy.web(req, res, {target: targetUrl});
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
	let json;
	if (error.code !== 'ECONNRESET') {
		console.error('proxy error', error);
	}
	if (!res.headersSent) {
		if (typeof res.writeHead === 'function') res.writeHead(500, {'content-type': 'application/json'});
	}

	json = {error: 'proxy_error', reason: error.message};
	res.end(JSON.stringify(json));
});


// serve assets to client, ssr if enabled -------------------------------------------------------------------
app.use((req, res) => {
	const client = new ApiClient(req);
	const store = stores.inject({
		app: { ssrLocation: req.url }
	});

	function hydrateOnClient() {
		res.send('<!doctype html>\n' +
			ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
	}

	if (__DEVELOPMENT__) {
		// Do not cache webpack stats: the script file would change since
		// hot module replacement is enabled in the development env
		webpackIsomorphicTools.refresh();
	}
	// if (__DISABLE_SSR__) {
	// skips serverside rendering for now
	if (true) {
		hydrateOnClient();
		return;
	}
});

// server listens to ports specified in config ------------------------------------------------
if (config.port) {
	server.listen(config.port, (err) => {
		if (err) {
			console.error(err);
		}
		console.info('----\n==> ✅  %s is running, talking to API server on %s:%s.', config.app.title, config.apiHost, config.apiPort);
		console.info('==> 💻  Open %s:%s in a browser to view the app.', config.host, config.port);
	});
} else {
	console.error('==>     ERROR: No PORT environment variable has been specified');
}