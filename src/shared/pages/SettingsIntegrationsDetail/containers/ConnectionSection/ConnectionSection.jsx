/* eslint max-len: off */
import React, {Component} from 'react';
import { autobind } from 'core-decorators';
import { ApiClient as client } from 'helpers';
import { Link } from 'react-router';
import { Button, Message, Section } from 'components';

import { connect } from '../../../../../utils/state';

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
		let org = this.getQueryVar('org');

		if (doneAuth && oauthToken && oauthVerifier) {
			client.post(`/organisations/${currentOrg.id}/xero/doneAuth`, {
				data: {
					oauth_token: oauthToken,
					oauth_verifier: oauthVerifier,
					org
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
		client.post(`/organisations/${currentOrg.id}/xero/generateToken`)
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

		if (token && token.xero && token.xero.connectedAt) {
			return (
				<div>
					<h3>{'Connection Section'}</h3>
					<Message type="success" content="Successfully connected to Xero" />
					<Section title={'What next?'} description={'Now that you have connected your [xero] account, there\'s some things to check'}>
						<ol>
							<li>
								<h4>Configure your entities</h4>
								<Link to={`/${currentOrg.id}/integrations/xero/match-entity`}>
									{`It's important to make sure your ${orgName} contacts are matched to the relevant nomos one Entites. This will ensure that data will be assigned to the correct things.`}
									<Button content="View Entities" />
								</Link>
							</li>
							<li>
								<Link to={`/${currentOrg.id}/integrations/xero/invoice-settings`}>
									<h4>Integration Settings</h4>
									<p>{'Check your settings to ensure this integration will work as you expect.'}</p>
									<Button content="View Settings" />
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
					<h3>{'Connection Section'}</h3>
					<div>{'Here goes the connection section'}</div>
					<Button
						content={connecting ? 'Loading ... ' : 'Connect to Xero'}
						onClickProps={this.onClick} />
				</div>
			);
		} else {
			return (
				<div>
					<h3>{'Connection Section'}</h3>
					<div>{'Verifying details ....'}</div>
				</div>
			);
		}
	}
}
