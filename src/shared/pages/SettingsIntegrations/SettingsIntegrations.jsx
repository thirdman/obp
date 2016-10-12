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
const logos = {
	xero: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Xero-logo-hires-RGB.png',
	myob: 'https://4mation.com.au/wp-content/uploads/2015/02/myob-logo.png',
	quickbooks: 'https://quickbooks-au-s3.intuitstatic.com/showroom_cms/image/content/dam/intuit/quickbooks/i18n/en/Australia/homepage/logo-qbo.png',
	freshbooks: 'https://media.glassdoor.com/sqlm/413709/freshbooks-squarelogo.png',
	sage: 'https://media.glassdoor.com/sqll/1150/sage-squarelogo-1459185264949.png'
};

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
		let apiList = ['xero', 'myob', 'quickbooks', 'freshbooks', 'sage'];
		let connected = {};
		apiList.map((api) => { connected[api] = this.isConnected(api); });

		return (
			<Summary>
				<Header key={'layoutHeader'} title={`Your Integrations for ${orgName}`} />
				<div key={'layoutHero'}>
					<p>Select the integration you wish to activate or edit</p>
				</div>
				<div key={'layoutMain'} className={styles.SettingsIntegrations}>
					{apiList.map((api, index) => {
						return (
							<Link
								key={`api-${index}`}
								to={`/${currentOrg.id}/integrations/${api}`}>
								<ObjectInfo
									title={`${api} ${connected[api] ? ' - connected' : ''}`}
									type="custom"
									subType="Financial Software"
									imageUrl={logos[api]}
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
									additionalContent={connected[api] ? this.getAdditionalContent() : null}
								/>
							</Link>);
						})
					}
				</div>
				<div key={'layoutSecondary'} >
					<h4>What is an integration?</h4>
					<p>{`Integrations allow you to extend the functionality of
							nomos one with related software you use. For example, if you
							use Xero accounting software, you can view invoice information
							right with your entities inside nomos one.`}</p>
				</div>
			</Summary>
		);
	}

	isConnected(api) {
		const { currentOrg = null } = this.context.store.app;

		return currentOrg.accessTokens[api] &&
			currentOrg.accessTokens[api].connectedAt;
	}
}
