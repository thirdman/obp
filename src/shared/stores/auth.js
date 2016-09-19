import { observable, computed, action } from 'mobx';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import client from '../../helpers/ApiClient';
import routeHelper from '../../helpers/RouteHelper';

export default class AuthStore {

	jwt = null;

	@observable user = {};
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
			window.localStorage.token = data.authorization;
			this.updateUser({ username });
			this.proceedToNextPath();
		}).catch((err) => {
			this.updateError(err.errors[0]);
		});
	}

	@action
	logout() {
		window.localStorage.token = '';
		this.updateUser({});
	}

	jwtAuth({ token }) {
		return new Promise((resolve, reject) => {
			client.post('/refresh', {
				headers: [
					{tag: 'authorization', value: token}
				]
			}).then((res) => {
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
				this.jwtAuth({ token: window.localStorage.token })
				.then((res) => {
					const data = res.data[0];
					window.localStorage.token = data.authorization;
					this.updateUser({ username: data.username });
					resolve();
				}).catch(() => {
					reject();
				});
			}
		});
	}

	proceedToNextPath() {
		const nextPath = routeHelper.nextPath || '/';

		browserHistory.push(nextPath);
		routeHelper.clear();
	}

/*
	@action
	register({ email, password, username }) {
		console.log(' register to be implemented');
		/*
		return service('user')
			.create({ email, password, username });
		*
	}
*/
}
