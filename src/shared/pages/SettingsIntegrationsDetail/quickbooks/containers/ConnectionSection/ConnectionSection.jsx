/* eslint max-len: off */
import React, {Component} from 'react';
import { autobind } from 'core-decorators';
import { ApiClient as client } from 'helpers';
import { Link } from 'react-router';
import { Button, Message, Section } from 'components';

import { connect } from 'state';

@connect('store')
export default class ConnectionSection extends Component {

	state = {
		connecting: false
	}

	componentDidMount() {
		const { doneAuth } = this.props;
		const { app } = this.context.store;
		const { currentOrg = null } = app;
		// https://gist.github.com/jlong/2428561
		let oauthToken = this.getQueryVar('oauth_token');
		let oauthVerifier = this.getQueryVar('oauth_verifier');
		let realmId = this.getQueryVar('realmId');

		if (doneAuth && oauthToken && oauthVerifier) {
			client.post(`/organisations/${currentOrg.id}/quickbooks/doneAuthQuickbooks`, {
				data: {
					oauth_token: oauthToken,
					oauth_verifier: oauthVerifier,
					realmId
				}
			})
			.then(() => {
				app.fetchOrgToken();
			})
			.catch((err) => {
				console.log(err);
			});
		}
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

	@autobind
	connecting(connecting) {
		this.setState({ connecting });
	}

	@autobind
	onClick() {
		const { currentOrg = null } = this.context.store.app;
		this.connecting(true);
		client.post(`/organisations/${currentOrg.id}/quickbooks/generateTokenQuickbooks`)
		.then((res) => {
			let link = res && res.data && res.data[0].url;
			window.location = link;
		})
		.catch((err) => {
			console.log(err);
			this.connecting(false);
		});
	}

	render() {
		return (
			<div>
				{ this.getAuthSection() }
			</div>
		);
	}

	getAuthSection() {
		const { app, auth } = this.context.store;
		const { currentOrg = null } = app;
		const org = auth.getOrg(currentOrg.id);
		const { doneAuth, token } = this.props;
		const { connecting } = this.state;
		let orgName = org && org.attributes.name;

		if (token && token.quickbooks && token.quickbooks.connectedAt) {
			return (
				<div>
					<h3>{'Connection Section'}</h3>
					<Message type="success" content="Successfully connected to Quickbooks" />
					<Section title={'What next?'} description={'Now that you have connected your QuickBooks account, there\'s some things to check'}>
						<ol>
							<li>
								<p>Configure your Entities</p>
									<p>{`It's important to make sure your ${orgName} contacts are matched to the relevant nomos one Entites. This will ensure that data will be assigned to the correct things.`}</p>
								<Link to={`/${currentOrg.id}/integrations/quickbooks/match-entity`}>
									<Button content="View Entities" classNameProps={['highlighted']} />
								</Link>
							</li>
							<li>
									<p>Check your Integration Settings</p>
									<p>{'Check your settings to ensure this integration will work as you expect.'}</p>
								<Link to={`/${currentOrg.id}/integrations/quickbooks/invoice-settings`}>
									<Button content="View Settings" classNameProps={['highlighted']} />
								</Link>
							</li>
						</ol>
					</Section>
				</div>
			);
		}

		if (!doneAuth) {
			return (
				<div>
					<h3>{'Connection Information'}</h3>
					<div>{'Here goes the connection section'}</div>
					<Button
						content={connecting ? 'Loading ... ' : 'Connect to QuickBooks'}
						onClickProps={this.onClick} />
				</div>
			);
		} else {
			return (
				<div>
					<h3>{'Connection Information'}</h3>
					<div>{'Verifying details ....'}</div>
				</div>
			);
		}
	}
}
