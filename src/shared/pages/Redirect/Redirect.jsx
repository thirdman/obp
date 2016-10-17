import React, {Component} from 'react';

const globalStyles = require('../App/App.scss');

export default class Redirect extends Component {

	componentDidMount() {
		let stateParams = this.getQueryVar('state');

		if (stateParams) {
			stateParams = JSON.parse(stateParams);
			if (stateParams.proceedTo) {
				window.location.href = window.location.href
					.replace(
						'/redirect',
						`/${stateParams.organisationId}${stateParams.proceedTo}`
					);
			}
		}
	}

	render() {
		return (
			<div className={globalStyles.container}>
				<h1>Redirecting....</h1>
			</div>
		);
	}

	getQueryVar(variable) {
		let query = window.location.search.substring(1);
		let vars = query.split('&');
		for (let i = 0; i < vars.length; i++) {
			let pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) === variable) {
				return decodeURIComponent(pair[1]);
			}
		}
		return false;
	}
}