import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
	App,
	AgreementOverview,
	AgreementsSummary,
	ComponentDocs,
	Home,
	Login,
	NotFound
} from 'pages';
import {
	Create,
	Edit,
	Overview,
	Report,
	Summary,
	View
} from 'layouts';

import routeHelper from '../helpers/RouteHelper';

export default (store) => {
	const requireLogin = (nextState, replace, cb) => {
		const { auth } = store;
		// Kick you back to login page if have not logged in
		console.log('checking logged in or not.... ');
		auth.checkLoggedIn()
			.then(() => {
				cb();
			})
			.catch(() => {
				routeHelper.updateNextPath(location.pathname);
				replace({
					pathname: '/login'
				});

				cb();
			});
	};

	const onLogin = (nextState, replace, cb) => {
		const { auth } = store;
		auth.checkLoggedIn()
			.then(() => { cb(); })
			.catch(() => { cb(); });
	};
	console.log(typeof requireLogin);
	/**
	 * Please keep routes in alphabetical order
	 */
	return (
		<Route path="/" component={App}>
			{ /* Routes - do not require logged in*/ }
			<IndexRoute component={Home} />
			<Route path="login" onEnter={onLogin} component={Login} />
			{ /* Routes - do require logged in*/ }
			<Route path="docs" component={ComponentDocs} />
			<Route path="create" component={Create} />
			<Route path="edit" component={Edit} />
			<Route path="overview" component={Overview} />
			<Route path="report" component={Report} />
			<Route path="summary" component={Summary} />
			<Route path="view" component={View} />
			<Route path="agreements" component={AgreementsSummary} />
			<Route path="agreements/:agreementId" component={AgreementOverview} />
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};