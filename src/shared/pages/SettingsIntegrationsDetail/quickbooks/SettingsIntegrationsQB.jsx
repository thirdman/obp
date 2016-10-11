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

const styles = require('./SettingsIntegrationsQB.scss');
const globalStyles = require('../App/App.scss');

@connect('store')
export default class SettingsIntegrationsQB extends Component {

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
			provider: 'qb',
			title: 'QuickBooks',
			subtitle: 'Easy Accounting Software',
			shortDescription: 'Built for your small business. Approved by accountants.',
			longDescription: `Intuit QuickBooks Online® is an easy-to-use, feature-rich online
			version of America\’s most
popular accounting software for small businesses. It helps small businesses save time
organizing their financial data in one place – anytime, anywhere – with no accounting
knowledge necessary. Users can access their data on any internet-connected PC or Mac
computer via popular web browsers without having to install software. QuickBooks Mobile
is a free companion app that makes QuickBooks Online data available on Apple and
Android mobile devices. Small businesses can choose from three version options based on
their businesses needs
– QuickBooks Online Simple Start, QuickBooks Online Essentials and QuickBooks Online
Plus. The service offers small business owners additional seats and permission controls to
give multiple users access to the account for greater efficiency and to enable real-time
collaboration with their accountants.`,
			whatYouCanDo: `Using the QuickBooks integration, you can send invoices
				directly to your account. In nomos one, you will see
				the status of invoices for quick and easy monitoring.`,
			logoUrl: 'https://quickbooks-au-s3.intuitstatic.com/showroom_cms/image/content/dam/intuit/quickbooks/i18n/en/Australia/homepage/logo-qbo.png',
			websiteUrl: 'https://quickbooks.intuit.com/',
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
						title="Ranked"
						content="#1"
						units="worldwide"
						hasDivider
						isHorizontal
						/>
					<Statistic
						title="Online subscribers"
						content="1.4"
						units="Million"
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
