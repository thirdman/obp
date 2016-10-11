import { Component } from 'react';
import { Link } from 'react-router';
import { View } from 'layouts';
import { Button, Column, HorizontalRule, Row, Statistic, SubNavWrap } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';
import {
	ConnectionSection,
	EntitySection,
	InvoiceSection
} from './containers';

const styles = require('./SettingsIntegrationsMYOB.scss');
const globalStyles = require('../App/App.scss');

@connect('store')
export default class SettingsIntegrationsMYOB extends Component {

	state = {
		section: null
	}

	componentWillMount() {
		const { routeParams } = this.props;
		this.setState({
			section: routeParams.section || 'connect'
		});
	}

	componentWillReceiveProps(nextProps) {
		const { routeParams } = nextProps;
		this.setState({
			section: routeParams.section || 'connect'
		});
	}

	render() {
		const { currentOrg = null } = this.context.store.app;
		const { section } = this.state;
		const defaultConnection = {
			id: 1,
			connectionDetail: null,
			provider: 'myob',
			title: 'MYOB',
			subtitle: 'Online accounting helps simplify success',
			shortDescription: `Whether you're big or small, MYOB has the tools you need
				to succeed in business.`,
			longDescription: `Our online solutions ensure you stay ahead of tax changes,
				keep control of your finances, be more productive and reduce risk.
				Find the solution that best suits your needs – from taking care of day to day accounts,
				to more complex business management.`,
			whatYouCanDo: `Using MYOB integration, you can send invoices
				directly to your account. In nomos one, you will see
				the status of invoices for quick and easy monitoring.`,
			logoUrl: 'https://4mation.com.au/wp-content/uploads/2015/02/myob-logo.png',
			websiteUrl: 'https://www.myob.com',
			connectionUrl: '',
			returnUrl: '',
			categories: ['accounting', 'invoicing']
		};
		const {logoUrl, title, longDescription, whatYouCanDo, websiteUrl, subtitle} = defaultConnection;
		let connected;

		if (currentOrg.accessTokens.myob &&
			currentOrg.accessTokens.myob.connectedAt) {
			connected = true;
		}

		return (
			<View>
				<Header key={'layoutHeader'} title={`Integration Detail: ${title}`} />
				<div key={'layoutHero'} className={globalStyles.padding}>
					<Row>
						<Column occupy={2}>
							<img src={logoUrl} width={'100%'} alt={title} />
						</Column>
						<Column occupy={6}>
							<h4>Integration</h4>
							<h3>{title}</h3>
							<span>{subtitle}</span>
						</Column>
						<Column occupy={3}>
							<h4>Status</h4>
							<div className={styles.connectedStatus + ' ' + (connected ? styles.isConnected : '')}>
								{`${connected ? 'Connected' : '- Not Connected -'}`}
							</div>
						</Column>
					</Row>
					<Row>
						<Column occupy={2} />
						<Column occupy={6}>
							<h4>What is {`${title}`}</h4>
								{longDescription}
							<h4>What Can You Do With It?</h4>
							<div>{whatYouCanDo}</div>
						</Column>
						<Column occupy={3}>
							<h4>Type</h4>
							<div>Accounting Software</div>
							<h4>Further Information</h4>
							<span><a href={websiteUrl}>{websiteUrl}</a></span>
						</Column>
					</Row>
						<Link to={`/${currentOrg.id}/integrations`}>
							<Button classNameProps={['text']} content="Back to integrations" />
						</Link>
						<HorizontalRule />
				</div>
				<SubNavWrap
					key={'layoutNav'}
					selected={section}
					listData={[
						{
							label: 'Connection',
							link: `/${currentOrg.id}/integrations/myob`,
							name: 'connect'
						},
						{
							label: 'Settings',
							link: `/${currentOrg.id}/integrations/myob/invoice-settings`,
							name: 'invoice-settings'
						},
						{
							label: 'Entities & Contacts',
							link: `/${currentOrg.id}/integrations/myob/match-entity`,
							name: 'match-entity'
						}
					]}
				/>
				<div key={'layoutMain'} className={globalStyles.padding}>
					{this.getMainComp()}
				</div>
				<div key={'layoutSecondary'} >
					<Statistic
						title="MYOB helps over"
						content="1.2"
						units="Million"
						hasDivider
						isHorizontal
						/>
					<Statistic
						title="Tax returns each year"
						content="2"
						units="million"
						hasDivider
						isHorizontal
						/>
					<Statistic
						title="Accountant Partners"
						content="400 000"
						hasDivider
						isHorizontal
						/>
				</div>
			</View>
		);
	}

	getMainComp() {
		const { currentOrg = null } = this.context.store.app;
		const { section } = this.state;
		switch (section) {
			case 'connect':
				return (
					<ConnectionSection
						token={currentOrg.accessTokens} />
				);
			case 'done-auth':
				return (
					<ConnectionSection
						token={currentOrg.accessTokens}
						doneAuth />
				);
			case 'match-entity':
				return (
					<EntitySection />
				);
			case 'invoice-settings':
				return (
					<InvoiceSection />
				);
			default:
				return null;
		}
	}
}
