import { Component } from 'react';
import { Link } from 'react-router';
import { View } from 'layouts';
import { Button, Column, HorizontalRule, Row, Statistic, SubNavWrap } from 'components';
import { Header } from 'containers';
import { connect } from 'state';
import {
	ConnectionSection,
	EntitySection,
	InvoiceSection
} from './containers';

const styles = require('./SettingsIntegrationsDetail.scss');
const globalStyles = require('../../App/App.scss');

@connect('store')
export default class SettingsIntegrationsDetail extends Component {

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
		const {logoUrl, title, longDescription, whatYouCanDo, websiteUrl, subtitle} = defaultConnection;
		let connected;

		if (currentOrg.accessTokens.sage &&
			currentOrg.accessTokens.sage.connectedAt) {
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
							label: 'Connection Information',
							link: `/${currentOrg.id}/integrations/sage`,
							name: 'connect'
						},
						{
							label: 'Entities & Contacts',
							link: `/${currentOrg.id}/integrations/sage/match-entity`,
							name: 'match-entity',
							isDisabled: !connected
						},
						{
							label: 'Settings',
							link: `/${currentOrg.id}/integrations/sage/invoice-settings`,
							name: 'invoice-settings',
							isDisabled: !connected
						}
					]}
				/>
				<div key={'layoutMain'} className={globalStyles.padding}>
					{this.getMainComp()}
				</div>
				<div key={'layoutSecondary'} >
					<Statistic
						title="Support Staff"
						content="5000"
						hasDivider
						isHorizontal
						/>
					<Statistic
						title="Accountant Partners"
						content="48500"
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

const defaultConnection = {
	id: 1,
	connectionDetail: null,
	provider: 'sage',
	title: 'Sage',
	subtitle: 'Online accounting helps simplify success',
	shortDescription: `We give businesses around the world the information, insight and tools
	they need to succeed today.`,
	longDescription: `We provide small and medium
	sized organisations with a range of easy-to-use business management software and services -
	from accounting and payroll, to enterprise resource planning, customer relationship
	management and payments. Our customers receive continuous advice and support through our
	global network of local experts to help them solve their business problems, giving them the
	confidence to achieve their business ambitions.`,
	whatYouCanDo: `Using the Sage integration, you can send invoices
		directly to your account. In nomos one, you will see
		the status of invoices for quick and easy monitoring.`,
	logoUrl: 'https://www.sage.co.uk/~/media/markets/uk/images/corporate/sage-green-logo.jpg',
	websiteUrl: 'http://www.sage.com/company/solutions',
	connectionUrl: '',
	returnUrl: '',
	categories: ['accounting', 'invoicing']
};