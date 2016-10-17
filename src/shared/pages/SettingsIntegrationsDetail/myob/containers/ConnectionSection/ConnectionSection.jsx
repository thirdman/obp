/* eslint max-len: off */
import React, {Component} from 'react';
import { autobind } from 'core-decorators';
import { ApiClient as client } from 'helpers';
import { Link } from 'react-router';
import { Button, ContentItem, InputSelect, InputText, Message, Row, Section } from 'components';

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
		let code = this.getQueryVar('code');
		console.log(code);
		if (doneAuth && code) {
			client.post(`/organisations/${currentOrg.id}/myob/doneAuthMyob`, {
				data: { code }
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
		client.post(`/organisations/${currentOrg.id}/myob/generateTokenMyob`)
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

		if (token && token.myob && token.myob.connectedAt) {
			return (
				<div>
					<h3>{'Connection Information'}</h3>
					<Message type="success" content="Successfully connected to MYOB" />
					<Section title={'What next?'} description={'Now that you have connected your MYOB account, there\'s some things to check'}>
						<ol>
							<li>
								<p>Configure your Entities</p>
									<p>{`It's important to make sure your ${orgName} contacts are matched to the relevant nomos one Entites. This will ensure that data will be assigned to the correct things.`}</p>
								<Link to={`/${currentOrg.id}/integrations/myob/match-entity`}>
									<Button content="View Entities" classNameProps={['highlighted']} />
								</Link>
							</li>
							<li>
									<p>Check your Integration Settings</p>
									<p>{'Check your settings to ensure this integration will work as you expect.'}</p>
								<Link to={`/${currentOrg.id}/integrations/myob/invoice-settings`}>
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
					<Button
						content={connecting ? 'Loading ... ' : 'Connect to MYOB'}
						onClickProps={this.onClick} />
					<Section
						title="Select your Company File"
						hasBackground
						hasBorder
						description="The company file represents the MYOB company that nomos one will interact with. You will need to authorise using your admin username and password"
					>
						<ContentItem
							title="company file"
						>
							<InputSelect
								color="white"
								classNameProps={['wide']}
								options={[
									{title: 'The one', value: 'one', helpContent: 'Selects the value of one'},
									{title: 'Dos', value: 'two', helpContent: 'In Spanish the word for two is \'dos'},
									{title: 'Toru', value: 'three', helpContent: 'Toru is three'}
								]}
							/>
						</ContentItem>
						<ContentItem title="Username" hasPadding={false} >
							<InputText
								type="text"
								classNameProps={['normal']}
								backgroundColor="#fff"
							/>
						</ContentItem>
						<ContentItem title="Password" hasPadding={false}>
							<InputText
								type="password"
								classNameProps={['normal']}
								backgroundColor="#fff"
							/>
						</ContentItem>
						<Row>
							<Button classNameProps={['highlighted']} content="connect" />
							<Button classNameProps={['grey']} content="cancel" />
						</Row>
				</Section>
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
