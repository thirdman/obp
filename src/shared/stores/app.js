import { observable, computed, action } from 'mobx';
import _ from 'lodash';

export default class AppStore {

	@observable currentOrg = '';

	@action
	changeCurrentOrg(org) {
		this.currentOrg = org;
	}

	@action
	updateCurrentOrg(id) {
		this.currentOrg = id;
	}

	@computed
	get activeOrgs() {
		return !_.isEmpty(this.currentOrg);
	}

	onUrlChange() {
		return (event) => {
			let orgId = event.pathname.split('/')[1];

			if (Number(orgId)) {
				this.updateCurrentOrg(Number(orgId));
			}
		};
	}
}
