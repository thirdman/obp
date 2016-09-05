var Express = require('express');
var webpack = require('webpack');

var config = require('../src/config');
var webpackConfig = require('./dev.config');
var compiler = webpack(webpackConfig);

var host = process.env.WEBPACK_HOST;
var port = (Number(config.port) + 1) || 3001;
var serverOptions = {
	contentBase: host + ':' + port,
	quiet: true,
	noInfo: true,
	hot: true,
	inline: true,
	lazy: false,
	publicPath: webpackConfig.output.publicPath,
	headers: {'Access-Control-Allow-Origin': '*'},
	stats: {colors: true}
};

var app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, function onAppListening(err) {
	if (err) {
		console.error(err);
	} else {
		console.info('==> 🚧  Webpack development server listening on %s:%s', host, port);
	}
});
