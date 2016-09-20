import { observable, action } from 'mobx';
// import _ from 'lodash';

import client from '../../../helpers/ApiClient';

export default class AgreementOverviewStore {

	@observable agreement = null;
	@observable fetching = true;
	@observable error = null;

	@action
	updateError(error = null) {
		this.error = error;
		this.fetching = false;
	}

	@action
	updateAgreement(agreement) {
		this.agreement = agreement;
		this.fetching = false;
	}

	@action
	fetchAgreement(agreementId = null) {
		this.fetching = true;

		if (!this.verifyId(agreementId)) {
			this.updateError({
				type: 'message',
				data: "Agreement's ID is invalid"
			});
		} else {
			client.get(`/organisations/1/agreements/${agreementId}`)
			.then((res) => {
				this.updateAgreement(res.data[0]);
			})
			.catch((err) => {
				this.updateError(err.errors[0]);
			});
		}
	}

	verifyId(id) {
		return Number(id);
	}
}
