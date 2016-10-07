import { Component } from 'react';
import { Link } from 'react-router';
import { Summary } from 'layouts';
import { ObjectInfo } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';

const styles = require('./SettingsIntegrations.scss');

// Khanh we need to abstract this for future flexibility:
// const xeroLogo = '/images/assets/xero.png';
// Faked logo url because png won't work:
const xeroLogo = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Xero-logo-hires-RGB.png';

@connect('store')
export default class SettingsIntegrations extends Component {

	getAdditionalContent() {
		return (
			<div className={styles.connectedStatus}>
				<h4>Status</h4>
				<div>Connected</div>
			</div>
		);
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
