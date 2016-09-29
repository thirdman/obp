import { observable, computed, action } from 'mobx';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import client from '../../helpers/ApiClient';
import routeHelper from '../../helpers/RouteHelper';

export default class AuthStore {

	jwt = null;

	@observable user = {};
	@observable orgs = [
		{
			type: 'organisations',
			id: 3045,
			attributes: {name: 'Dave2s Demo Org'}
		}, {
			type: 'organisations',
			id: 282,
			attributes: {name: 'Dtest2 Legal Firm'}
		}, {
			type: 'organisations',
			id: 2737,
			attributes: {name: 'Gareth is cool'}
		}, {
			type: 'organisations',
			id: 3058,
			attributes: {name: 'NEW ORG 18/12'}
		}];
	@observable error = '';

	@action
	updateUser(data = null) {
		this.user = data || {};
		this.error = '';
	}

	@action
	updateError(error = null) {
		this.error = error;
	}

	@action
	updateOrgs(orgs = []) {
		this.orgs = orgs;
	}

	@computed
	get check() {
		return !_.isEmpty(this.user);
	}


	@action
	login({ username, password }) {
		client.post('/login', {
			data: {
				username,
				password
			}
		}).then((res) => {
			const data = res.data[0];
			this.saveJwt(data.authorization);
			this.updateUser({ username });
			this.getOrgs();
			this.proceedToNextPath();
		}).catch((err) => {
			this.clearJwt();
			this.updateError(err.errors[0]);
		});
	}

	@action
	logout() {
		window.localStorage.token = '';
		this.updateUser({});
		this.updateOrgs([]);
		this.updateError('');
	}

	jwtAuth() {
		return new Promise((resolve, reject) => {
			client.post('/refresh').then((res) => {
				resolve(res);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	checkLoggedIn() {
		return new Promise((resolve, reject) => {
			if (!window.localStorage.token) {
				reject();
			} else {
				client.setJwt(window.localStorage.token);
				this.jwtAuth()
				.then((res) => {
					const data = res.data[0];
					this.saveJwt(data.authorization);
					this.updateUser({ username: data.username });
					this.getOrgs();
					resolve();
				}).catch((err) => {
					this.clearJwt();
					reject(err);
				});
			}
		});
	}

	getOrgs() {
		client.get('/organisations').then((res) => {
			this.updateOrgs(res.data);
		}).catch((err) => {
			this.updateError(err.errors[0]);
		});
	}

	saveJwt(jwt) {
		window.localStorage.token = jwt;
		client.setJwt(jwt);
	}

	clearJwt() {
		window.localStorage.token = null;
		client.setJwt(null);
	}

	proceedToNextPath() {
		const nextPath = routeHelper.nextPath || '/';

		browserHistory.push(nextPath);
		routeHelper.clear();
	}

	getOrg(id) {
		let currentOrg = _.find(this.orgs, (org) => {
			return org.id === id;
		});
		return currentOrg;
	}
}
