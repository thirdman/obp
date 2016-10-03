/* eslint max-len: off */
import React, {Component} from 'react';
import { autobind } from 'core-decorators';
import { ApiClient as client } from 'helpers';
import { Button, Section } from 'components';

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
		const { doneAuth, token } = this.props;
		const { connecting } = this.state;

		if (token && token.xero && token.xero.connectedAt) {
			return (
				<div>
					<h3>{'Connection Section'}</h3>
					<div>{'This organisation is connected to Xero'}</div>
					<Section title={'Entities'} hasDivider>
					{
						/*
												{matchedContacts.length ?
													(<EntityMatched
															matchedContacts={matchedContacts}
															unlink={this.unlinkEntity.bind(this)} />
													) : null
												}
						*/
						/*
												<EntityMatcher
													currentSection={currentSection}
													provider={title}
													nomosEntities={nomosEntities}
													providerContacts={providerContacts}
													matchedArray={matchedArray}
													link={this.linkEntity.bind(this)}
													createEntityInNomos={this.createEntityInNomos.bind(this)} />
						*/
					}
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
