/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
// import ReactDOM from 'react-dom';
// import ApiClient from './helpers/ApiClient';
// import { Router, browserHistory } from 'react-router';
// import withScroll from 'scroll-behavior';
// import getRoutes from './routes';

// const client = new ApiClient();
// const history = withScroll(() => browserHistory)();
// const dest = document.getElementById('content');
// const store = stores.get();

console.log('client got activated2');

if (process.env.NODE_ENV !== 'production') {
	window.React = React; // enable debugger
}

if (!__DEVTOOLS__ && !window.devToolsExtension) {
	// rerender the whole thing WITH mobx devtool included
}
