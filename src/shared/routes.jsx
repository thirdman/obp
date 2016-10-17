import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
	App,
	AgreementOverview,
	AgreementView,
	AgreementEdit,
	AgreementsSummary,
	// ComponentDocs,  // refactor out when cofirmed the new docs work
	DevContent,
	DevHome,
	DevComponentDocs,
	DevIcons,
	Login,
	NotFound,
	Redirect,
	SettingsIntegrations,
	XeroDetail,
	MyobDetail,
	QuickbooksDetail,
	FreshbooksDetail,
	SageDetail,
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
			<Route onEnter={requireLogin}>
				<IndexRoute component={TempApiManager} />
				<Route path="docs" component={DevComponentDocs} />
				<Route path="dev/home" component={DevHome} />
				<Route path="dev/docs" component={DevComponentDocs} />
				<Route path="dev/icons" component={DevIcons} />
				<Route path="dev/content" component={DevContent} />
				<Route path="dev" component={DevHome} />
				<Route path="create" component={Create} />
				<Route path="edit" component={Edit} />
				<Route path="overview" component={Overview} />
				<Route path="report" component={Report} />
				<Route path="summary" component={Summary} />
				<Route path="view" component={View} />
				<Route path="redirect" component={Redirect} />
				<Route path=":orgId" component={SettingsIntegrations} />
				<Route path=":orgId/agreements" component={AgreementsSummary} />
				<Route path=":orgId/agreements/:agreementId" component={AgreementOverview} />
				<Route path=":orgId/agreements/:agreementId/:sectionName" component={AgreementView} />
				<Route path=":orgId/agreements/:agreementId/:sectionName/edit" component={AgreementEdit} />
				<Route path=":orgId/integrations" component={SettingsIntegrations} />
				<Route path=":orgId/integrations/xero(/:section)" component={XeroDetail} />
				<Route path=":orgId/integrations/myob(/:section)" component={MyobDetail} />
				<Route path=":orgId/integrations/quickbooks(/:section)" component={QuickbooksDetail} />
				<Route path=":orgId/integrations/freshbooks(/:section)" component={FreshbooksDetail} />
				<Route path=":orgId/integrations/sage(/:section)" component={SageDetail} />
			</Route>
			{ /* Catch all route */ }
			<Route path="*" component={NotFound} status={404} />
		</Route>
	);
};