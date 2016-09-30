import moment from 'moment';
import client from './ApiClient';

module.exports = {

	validateToken(token) {
		let connectedAt = Number(token.connectedAt) || 0;
		let expiresIn = Number(token.oauth_expires_in) || 1800;

		if ((connectedAt + (expiresIn * 1000) -	5000) >
			moment().format('x')) {
			// token is still valid for at least another 5 seconds
			return true;
		} else {
			// token has expired
			return false;
		}
	},

	checkAndRefreshToken(xeroToken, org) {
		return new Promise((resolve, reject) => {
			let newFirmToken;

			// checking if token has expired or not
			if (this.validateToken(xeroToken)) {
				resolve(xeroToken);
			} else {
				// token has expired, refresh token
				client.post(`/organisations/${org.id}/xero/refreshToken`, {
					data: {
						accessToken: xeroToken
					}
				})
				.then((res) => {
					newFirmToken = res.data[0].xeroAccessToken;
					resolve(newFirmToken);
				})
				.catch((err) => {
					reject(err);
				});
			}
		});
	},

	request(type, url, xeroToken, org) {
		return new Promise((resolve, reject) => {
			this.checkAndRefreshToken(xeroToken, org)
			.then((checkedToken) => {
				this.appStore.updateCurrentOrg('accessTokens', {
					...org.accessTokens,
					xero: checkedToken
				});

				return client[type](url, {
					data: {
						accessToken: JSON.parse(JSON.stringify(checkedToken))
					}
				});
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err.errors[0].details);
				// throw err;
			});
		});
	}
};
