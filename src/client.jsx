/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import { browserHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';

import './shared/stores'; // initialize stores
import { rehydrate, hotRehydrate } from './utils/state';
import getRoutes from './shared/routes';
import App from './App';

const dest = document.getElementById('content');
const store = rehydrate();
const routes = getRoutes(store);

// enable debugger
if (process.env.NODE_ENV !== 'production') {
	window.React = React;
}

function renderApp(AppComponent) {
	render(
		<AppContainer>
			<AppComponent
				store={hotRehydrate()}
				routes={routes}
				history={browserHistory}
				render={applyRouterMiddleware(useScroll())}
			/>
		</AppContainer>,
		dest
	);
}

renderApp(App);

if (module.hot) {
	module.hot.accept(() =>
		renderApp(App)
	);
}

if (!__DEVTOOLS__ && !window.devToolsExtension) {
	// rerender the whole thing WITH mobx devtool included
}


/**
 * Warning from React Router, caused by react-hot-loader.
 * The warning can be safely ignored, so filter it from the console.
 * Otherwise you'll see it every time something changes.
 * See https://github.com/gaearon/react-hot-loader/issues/298
 */
if (module.hot) {
	const orgError = console.error; // eslint-disable-line no-console
	console.error = (message) => { // eslint-disable-line no-console
		if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
		// Log the error as normally
			orgError.apply(console, [message]);
		}
	};
}