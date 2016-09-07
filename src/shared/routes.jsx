import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
	App,
	ComponentDocs,
	Home,
	NotFound
} from 'pages';

export default () => {
	/**
	 * Please keep routes in alphabetical order
	 */
	return (
		<Route path="/" component={App}>
			{ /* Routes - do not require logged in*/ }
			<IndexRoute component={Home} />
			<Route path="docs" component={ComponentDocs} />
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};