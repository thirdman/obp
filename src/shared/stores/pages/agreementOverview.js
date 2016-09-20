import { observable, action } from 'mobx';
// import _ from 'lodash';

import client from '../../../helpers/ApiClient';

export default class AgreementOverviewStore {

	@observable user = {};
	@observable error = '';

	@action
	updateError(error = null) {
		this.error = error;
	}

	@action
	fetchAgreement(agreementId = null) {
		if (!this.verifyId(agreementId)) {
			this.updateError({
				type: 'message',
				data: "Agreement's ID is invalid"
			});
		} else {
			client.get(`/organisations/1/agreements/${agreementId}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		}
	}

	verifyId(id) {
		return Number(id);
	}
}
