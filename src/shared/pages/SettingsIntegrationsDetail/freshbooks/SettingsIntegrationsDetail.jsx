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
		const defaultConnection = {
			id: 1,
			connectionDetail: null,
			provider: 'fb',
			title: 'FreshBooks',
			subtitle: 'Small Business Accounting Software That Makes Billing Painless',
			shortDescription: `The all-new FreshBooks is accounting software that makes running your
				small business easy, fast and secure. Spend less time on accounting and more time doing
				the work you love.`,
			longDescription: `FreshBooks is simple and intuitive, so you’ll spend less time on
				paperwork and wow your clients with how professional you look.
			
			Automate time consuming tasks like organizing expenses, tracking your time, and
			following up with clients with just a few clicks.
			
			FreshBooks lives in the cloud so you can securely access it from your desktop,
			phone and tablet wherever you are.`,
			whatYouCanDo: `Using the FreshBooks integration, you can send invoices
				directly to your account. In nomos one, you will see
				the status of invoices for quick and easy monitoring.`,
			logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/FreshBooks_Cloud_Accounting_Logo.svg/203px-FreshBooks_Cloud_Accounting_Logo.svg.png',
			websiteUrl: 'https://www.freshbooks.com',
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
							label: 'Connection Information',
							link: `/${currentOrg.id}/integrations/freshbooks`,
							name: 'connect'
						},
						{
							label: 'Entities & Contacts',
							link: `/${currentOrg.id}/integrations/freshbooks/match-entity`,
							name: 'match-entity'
						},
						{
							label: 'Settings',
							link: `/${currentOrg.id}/integrations/freshbooks/invoice-settings`,
							name: 'invoice-settings'
						}
					]}
				/>
				<div key={'layoutMain'} className={globalStyles.padding}>
					{this.getMainComp()}
				</div>
				<div key={'layoutSecondary'} >
					<Statistic
						title="invoices paid using FreshBooks"
						content="$60"
						units="Billion"
						hasDivider
						isHorizontal
						/>
					<Statistic
						title="Annual hours saved"
						content="192"
						units="per user"
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
