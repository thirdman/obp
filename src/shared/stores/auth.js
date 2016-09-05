import { observable, computed, action } from 'mobx';
// import { app, service } from '~/src/shared/app';
import _ from 'lodash';

export default class AuthStore {

  jwt = null;

  @observable user = {};

  init() {
    // get token from localStorage
    const token = (global.TYPE === 'CLIENT')
      ? window.localStorage.token
      : null;

    // auto-login with jwt
    if (token) this.jwtAuth({ token });
  }

  @action
  updateUser(data = null) {
    this.user = data || {};
  }

  jwtAuth({ token }) {
    console.log(' jwtAuth to be implemented');
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
  login({ email, password }) {
    console.log(' login to be implemented');
    /*
    return app()
      .authenticate({ type: 'local', email, password })
      .then((result) => this.updateUser(result.data));
    */
  }

  @action
  register({ email, password, username }) {
    console.log(' register to be implemented');
    /*
    return service('user')
      .create({ email, password, username });
    */
  }

  @action
  logout() {
    console.log(' logout to be implemented');
    /*
    app()
      .logout()
      .then(() => this.updateUser({}));
    */
  }
}
