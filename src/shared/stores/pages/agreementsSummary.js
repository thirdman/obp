import { observable, action } from 'mobx';
// import _ from 'lodash';

// import client from '../../helpers/ApiClient';

export default class AgreementSummaryStore {

	@observable user = {};
	@observable error = '';

	@action
	updateError(error = null) {
		this.error = error;
	}
}
