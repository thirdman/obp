import { observable, computed, action } from 'mobx';
import _ from 'lodash';

export default class AppStore {

   @observable currentOrg = 'Org 1';

   @action
   changeCurrentOrg(org) {
      this.currentOrg = org;
   }

   @computed
	get activeOrgs() {
		return !_.isEmpty(this.currentOrg);
	}
}
