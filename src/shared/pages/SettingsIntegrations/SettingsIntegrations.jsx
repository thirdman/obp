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
const myobLogo = 'https://4mation.com.au/wp-content/uploads/2015/02/myob-logo.png';
const qbLogo = 'https://quickbooks-au-s3.intuitstatic.com/showroom_cms/image/content/dam/intuit/quickbooks/i18n/en/Australia/homepage/logo-qbo.png';
const sageLogo = 'https://media.glassdoor.com/sqll/1150/sage-squarelogo-1459185264949.png';
const fbLogo = 'https://media.glassdoor.com/sqlm/413709/freshbooks-squarelogo.png';

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
					<Link to={`/${currentOrg.id}/integrations/myob`}>
						<ObjectInfo
							title={`MYOB ${connected ? ' - connected' : ''}`}
							type="custom"
							subType="Financial Software"
							imageUrl={myobLogo}
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
					<Link to={`/${currentOrg.id}/integrations/qb`}>
						<ObjectInfo
							title={`QuickBooks ${connected ? ' - connected' : ''}`}
							type="custom"
							subType="Financial Software"
							imageUrl={qbLogo}
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
					<Link to={`/${currentOrg.id}/integrations/sage`}>
						<ObjectInfo
							title={`Sage ${connected ? ' - connected' : ''}`}
							type="custom"
							subType="Financial Software"
							imageUrl={sageLogo}
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
					<Link to={`/${currentOrg.id}/integrations/fb`}>
						<ObjectInfo
							title={`FreshBooks ${connected ? ' - connected' : ''}`}
							type="custom"
							subType="Financial Software"
							imageUrl={fbLogo}
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
