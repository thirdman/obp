import { observable, computed, action } from 'mobx';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import client from '../../helpers/ApiClient';
import routeHelper from '../../helpers/RouteHelper';

export default class AuthStore {

	jwt = null;

	@observable user = {};
	@observable orgs = [
		{ orgName: 'Org 1' },
		{ orgName: 'Org 2' },
		{ orgName: 'Org 3' }
	];
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

	@action
	getOrgs() {
		this.orgs = [
			{ orgName: 'Org 1' },
			{ orgName: 'Org 2' },
			{ orgName: 'Org 3' }
		];
		/*
		client.get('/organisations').then((res) => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
		*/
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
}
