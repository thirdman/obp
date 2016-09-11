import { observable, computed, action } from 'mobx';
import { browserHistory } from 'react-router';
import _ from 'lodash';

export default class AuthStore {

	jwt = null;

	@observable user = {};

	init() {
		// get token from localStorage
		const user = (typeof window !== 'undefined')
			? window.localStorage.user
			: null;
		if (!_.isEmpty(user)) {
			this.updateUser(JSON.parse(user));
		}
		// auto-login with jwt
		// if (token) this.jwtAuth({ token });
	}

	@action
	updateUser(data = null) {
		this.user = data || {};
	}

	jwtAuth({ token }) {
		console.log(token, ' jwtAuth to be implemented');
		/*
		return app()
			.authenticate({ type: 'token', token })
			.then((result) => this.updateUser(result.data))
			.catch((err) => console.error(err)); // eslint-disable-line no-console
		*/
	}

	@computed
	get check() {
		return !_.isEmpty(this.user);
	}


	@action
	login({ username, password, nextPath }) {
		window.localStorage.user = JSON.stringify({ username, password });
		this.updateUser({ username, password });
		if (nextPath) {
			browserHistory.push(nextPath);
		}
		// return app()
		//   .authenticate({ type: 'local', email, password })
		//   .then((result) => this.updateUser(result.data));
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
	@action
	logout() {
		window.localStorage.user = JSON.stringify('');
		this.updateUser({});
		/*
		app()
			.logout()
			.then(() => this.updateUser({}));
		*/
	}
}
