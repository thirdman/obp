import { Component } from 'react';
import { Link } from 'react-router';
import { Summary } from 'layouts';
import { Button, HorizontalRule, ObjectInfo } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';

const styles = require('./SettingsIntegrations.scss');

// Khanh we need to abstract this for future flexibility:
// const xeroLogo = '/images/assets/xero.png';
// Faked logo url because png won't work:
const xeroLogo = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Xero-logo-hires-RGB.png';

@connect('store')
export default class SettingsIntegrations extends Component {
	state = {
		insert: []
	}
	getAdditionalContent() {
		return (
			<div className={styles.connectedStatus}>
				<h4>Status</h4>
				<div>Connected</div>
			</div>
		);
	}
	doAddObject() {
		let newCount = this.state.insert.length + 1;
		let newObj = {title: `title ${newCount}`};
		return () => {
			this.setState((state) => (
			{ insert: state.insert.concat(newObj)}
			));
		};
	}
	doRemoveObject() {
		let theCount = this.state.insert.length - 1;
		return () => {
			let data = this.state.insert;
			data = data.splice(data, theCount);
			this.setState({insert: data});
		};
	}

	render() {
		const { app, auth } = this.context.store;
		const { currentOrg = null } = app;
		const org = auth.getOrg(currentOrg.id);
		let orgName = org && org.attributes.name;
		let connected;
		if (currentOrg.accessTokens.xero &&
			currentOrg.accessTokens.xero.connectedAt) {
			connected = true;
		}

		return (
			<Summary>
				<Header key={'layoutHeader'} title={`Your Integrations for ${orgName}`} />
				<div key={'layoutHero'}>
					<p>Select the integration you wish to activate or edit</p>
				</div>
				<div key={'layoutMain'} className={styles.SettingsIntegrations}>
					<Button onClickProps={this.doAddObject()} content="Add another" />
					<Button onClickProps={this.doRemoveObject()} content="Remove another" />
					<HorizontalRule />
					<Link to={`/${currentOrg.id}/integrations/xero`}>
						<ObjectInfo
							title={`Xero ${connected ? ' - connected' : ''}`}
							type="custom"
							subType="Financial Software"
							imageUrl={xeroLogo}
							buttons={[
								{	text: 'View',
									helpText: 'View this Integration',
									icon: {
										icon: 'view',
										color: 'lightGrey',
										classNameProps: ['normal']
										},
									classNameProps: ['normal']
								}
							]}
							classNameProps={['hasBorder']}
							additionalContent={connected ? this.getAdditionalContent() : null}
						/>
					</Link>
					{this.state.insert && this.state.insert.map((obj, index) => {
                return (
									<ObjectInfo key={index} title={`${obj.title}`}classNameProps={['hasBorder']} />
                );
            })}
				</div>
				<div key={'layoutSecondary'} >
					<h4>What is an integration?</h4>
					<p>Integrations allow you to extend the
							functionality of nomos one with related software you use. For example, if you
							use Xero accounting software, you can view invoice information right with your
							entities inside nomos one. </p>
				</div>
			</Summary>
		);
	}
}
