import { observable, computed, action } from 'mobx';
import _ from 'lodash';

import client from '../../helpers/ApiClient';

export default class AppStore {

	@observable currentOrg = {
		id: '',
		accessTokens: {}
	};

	@action
	changeCurrentOrg(id) {
		this.currentOrg = {
			id,
			accessTokens: {}
		};
	}

	@action
	updateCurrentOrg(key, val) {
		this.currentOrg[key] = val;
	}

	@computed
	get activeOrgs() {
		return !_.isEmpty(this.currentOrg);
	}

	fetchOrgToken() {
		client.get(`/organisations/${this.currentOrg.id}/accessTokens`)
		.then((res) => {
			this.updateCurrentOrg('accessTokens',
				res.data[0].attributes.accessTokens || {});
		})
		.catch((err) => {
			console.log(err);
		});
	}

	onUrlChange() {
		return (event) => {
			let orgId = event.pathname.split('/')[1];
			orgId = Number(orgId);
			if (this.currentOrg.id !== orgId) {
				this.changeCurrentOrg(orgId);
				this.refreshOrgDetails();
			}
			if (event.pathname.indexOf('integrations') > -1 &&
				!this.currentOrg.accessTokens) {
				this.refreshOrgDetails();
			}
		};
	}

	refreshOrgDetails() {
		if (client.jwt &&
			this.currentOrg.id) {
			this.fetchOrgToken();
		}
	}

	promiseRefreshOrgDetails() {
		return new Promise((resolve, reject) => {
			if (client.jwt && this.currentOrg.id) {
				client.get(`/organisations/${this.currentOrg.id}/accessTokens`)
				.then((res) => {
					this.updateCurrentOrg('accessTokens',
						res.data[0].attributes.accessTokens || {});
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
			} else {
				resolve();
			}
		});
	}
}
