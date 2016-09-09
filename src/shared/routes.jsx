import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
	App,
	ComponentDocs,
	Home,
	Login,
	NotFound
} from 'pages';

export default (store) => {
	const requireLogin = (nextState, replace, cb) => {
		const { auth, route } = store;
		// Kick you back to login page if have not logged in
		if (!auth.check) {
			route.updateNextPath(location.pathname);
			replace({
				pathname: '/login'
			});
		}
		cb();
	};
	/**
	 * Please keep routes in alphabetical order
	 */
	return (
		<Route path="/" component={App}>
			{ /* Routes - do not require logged in*/ }
			<IndexRoute component={Home} />
			<Route path="login" component={Login} />
			{ /* Routes - do require logged in*/ }
			<Route onEnter={requireLogin}>
				<Route path="docs" component={ComponentDocs} />
			</Route>
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};