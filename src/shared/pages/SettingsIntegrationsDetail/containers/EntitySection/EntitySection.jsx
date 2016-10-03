/* eslint max-len: off */
import React, {Component} from 'react';
import {
	ApiClient as client,
	XeroHelper as xeroClient,
	ReactSafePromise as safePromise
} from 'helpers';
import { autobind } from 'core-decorators';
// import { Button } from 'components';
import { connect } from '../../../../../utils/state';

@connect('store')
class EntitySection extends Component {

	state = {
		loaded: false,
		loading: '',
		error: false,
		nomosEntities: [],
		xeroContacts: [],
		xeroCodes: []
	}

	componentDidMount() {
		xeroClient.appStore = this.context.store.app;
		if (this.isConnected()) {
			this.fetchData();
		}
	}

	render() {
		const {
			loaded,
			loading,
			nomosEntities,
			xeroContacts,
			xeroCodes
		} = this.state;
		return (
			<div>
				<h3>{'Entity Section'}</h3>
				<div>{'Here goes the entities matching section'}</div>
				{loaded &&
					<div>
						<div>{`Nomos entities: ${nomosEntities.length}`}</div>
						<div>{`Xero contacts: ${xeroContacts
							.contacts.Contacts.Contact.length}`}</div>
						<div>{`Xero codes: ${xeroCodes
							.xeroAccountCodes.Account.length}`}</div>
					</div>}
				<div>{ loading }</div>
			</div>
		);
	}

	@autobind
	fetchData() {
		const { currentOrg = {} } = this.context.store.app;

		this.loading('Getting firm entities ....');
		this.safePromise(
			client.get(`organisations/${currentOrg.id}/entities`))
		.then((res) => {
			this.setState({ nomosEntities: res.data });
			this.loading('Getting Xero contacts ....');
			return this.safePromise(xeroClient.request(
				'post',
				`organisations/${currentOrg.id}/xero/contacts`,
				currentOrg.accessTokens.xero,
				currentOrg
			));
		})
		.then((res) => {
			this.setState({ xeroContacts: res.data[0] });
			this.loading('Getting Xero account codes ....');
			return this.safePromise(xeroClient.request(
				'post',
				`organisations/${currentOrg.id}/xero/accountCodes`,
				currentOrg.accessTokens.xero,
				currentOrg
			));
		})
		.then((res) => {
			this.setState({ xeroCodes: res.data[0] });
			this.loading('Matching entities with contacts ....');
			this.setState({ loaded: true });
		})
		.catch((err) => {
			console.log(err);
			this.loading(`Please contact support,
				the error is: ${decodeURI(err)}`,
				true);
		});
	}

	isConnected() {
		const { currentOrg = {} } = this.context.store.app;
		if (currentOrg.accessTokens ||
			currentOrg.accessTokens.xero ||
			currentOrg.accessTokens.xero.connectedAt) {
			return true;
		} else {
			return false;
		}
	}

	loading(loading = '', error = false) {
		this.setState({
			loading,
			error
		});
	}
}

export default safePromise(EntitySection);