/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';

import { render } from 'react-dom';
import './shared/stores'; // initialize stores
import { rehydrate, hotRehydrate } from './utils/state';
import context from './shared/context';
import getRoutes from './shared/routes';

const ContextProvider = context.getProvider();
const dest = document.getElementById('content');
const store = rehydrate();

// enable debugger
if (process.env.NODE_ENV !== 'production') {
	window.React = React;
}

render(
	<ContextProvider context={{ store: hotRehydrate() }}>
		<Router
			routes={getRoutes(store)}
			history={browserHistory}
			render={applyRouterMiddleware(useScroll())}
		/>
	</ContextProvider>,
	dest
);


if (!__DEVTOOLS__ && !window.devToolsExtension) {
	// rerender the whole thing WITH mobx devtool included
}
