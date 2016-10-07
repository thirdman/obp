import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
	App,
	AgreementOverview,
	AgreementView,
	AgreementEdit,
	AgreementsSummary,
	// ComponentDocs,  // refactor out when cofirmed the new docs work
	DevHome,
	DevComponentDocs,
	DevIcons,
	Login,
	NotFound,
	SettingsIntegrations,
	SettingsIntegrationsDetail,
	TempApiManager
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
		const { auth, app } = store;
		// Kick you back to login page if have not logged in
		auth.checkLoggedIn()
		.then(() => {
			return app.promiseRefreshOrgDetails();
		})
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
			<Route path="login" onEnter={onLogin} component={Login} />
			{ /* Routes - do require logged in*/ }
				<IndexRoute component={TempApiManager} />
				<Route path=":orgId" component={SettingsIntegrations} />
				<Route path="docs" component={DevComponentDocs} />
				<Route path="dev" component={DevHome} />
				<Route path="dev/home" component={DevHome} />
				<Route path="dev/docs" component={DevComponentDocs} />
				<Route path="dev/icons" component={DevIcons} />
				<Route path="create" component={Create} />
				<Route path="edit" component={Edit} />
				<Route path="overview" component={Overview} />
				<Route path="report" component={Report} />
			<Route onEnter={requireLogin}>
				<Route path="summary" component={Summary} />
			</Route>
				<Route path="view" component={View} />
				<Route path=":orgId/agreements" component={AgreementsSummary} />
				<Route path=":orgId/agreements/:agreementId" component={AgreementOverview} />
				<Route path=":orgId/agreements/:agreementId/:sectionName" component={AgreementView} />
				<Route path=":orgId/agreements/:agreementId/:sectionName/edit" component={AgreementEdit} />
				<Route path=":orgId/integrations" component={SettingsIntegrations} />
				<Route path=":orgId/integrations/xero(/:section)" component={SettingsIntegrationsDetail} />
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};