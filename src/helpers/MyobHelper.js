import moment from 'moment';
import client from './ApiClient';

module.exports = {

	validateToken(token) {
		let connectedAt = Number(token.connectedAt) || 0;
		let expiresIn = Number(token.expires_in) || 1200;

		if ((connectedAt + (expiresIn * 1000) -	5000) >
			moment().format('x')) {
			// token is still valid for at least another 5 seconds
			return true;
		} else {
			// token has expired
			return false;
		}
	},

	checkAndRefreshToken(myobToken, org) {
		return new Promise((resolve, reject) => {
			let newFirmToken;

			// checking if token has expired or not
			if (this.validateToken(myobToken)) {
				resolve(myobToken);
			} else {
				// token has expired, refresh token
				client.post(`/organisations/${org.id}/myob/refreshTokenMyob`, {
					data: {
						accessToken: myobToken
					}
				})
				.then((res) => {
					newFirmToken = res.data[0].myobAccessToken;
					resolve(newFirmToken);
				})
				.catch((err) => {
					reject(err);
				});
			}
		});
	},

	request(type, url, myobToken, org, data = {}) {
		return new Promise((resolve, reject) => {
			this.checkAndRefreshToken(myobToken, org)
			.then((checkedToken) => {
				this.appStore.updateCurrentOrg('accessTokens', {
					...org.accessTokens,
					myob: checkedToken
				});

				return client[type](url, {
					data: {
						...data,
						accessToken: JSON.parse(JSON.stringify(checkedToken))
					}
				});
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err.errors[0].detail);
				// throw err;
			});
		});
	}
};
