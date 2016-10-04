import { Component } from 'react';
import { Link } from 'react-router';
import { View } from 'layouts';
import { Button, Column, HorizontalRule, Row, SubNavWrap } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';
import {
	ConnectionSection,
	EntitySection,
	InvoiceSection
} from './containers';

const globalStyles = require('../App/App.scss');

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
			provider: 'xero',
			title: 'Xero',
			subtitle: 'Beautiful accounting software',
			shortDescription: `Beautiful cloud-based accounting software
				that connects people with the right numbers anytime,
				anywhere, on any device.`,
			longDescription: `Improve cashflow and get paid quickly
				and easily when you send online invoices.
				You\'ll have a better connection with your customers
				– and know when they\'ve opened your invoice.`,
			whatYouCanDo: `Using Xero integration, you can send invoices
				directly to your xero account. In nomos one, you will see
				the status of invoices for quick and easy monitoring.`,
			logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Xero-logo-hires-RGB.png',
			websiteUrl: 'https://www.xero.com',
			connectionUrl: '',
			returnUrl: '',
			categories: ['accounting', 'invoicing']
		};
		const {logoUrl, title, longDescription, whatYouCanDo, websiteUrl, subtitle} = defaultConnection;
		let connected;

		if (currentOrg.accessTokens.xero &&
			currentOrg.accessTokens.xero.connectedAt) {
			connected = true;
		}

		return (
			<View>
				<Header key={'layoutHeader'} title={`Integration Detail: ${title}`} />
				<div key={'layoutHero'} className={globalStyles.padding}>
					<Row>
						<Column occupy={2}>
							<img src={logoUrl} width={100} height={100} alt={title} />
						</Column>
						<Column occupy={6}>
							<h4>Integration</h4>
							<h3>{title}</h3>
							<span>{subtitle}</span>
						</Column>
						<Column occupy={3}>
							<h4>Status</h4>
							<div>{`${connected ? '*Connected*' : '- Not Connected -'}`}</div>
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
						<Link to={'/integrations'}>
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
							link: `/${currentOrg.id}/integrations/xero`,
							name: 'connect'
						},
						{
							label: 'Settings',
							link: `/${currentOrg.id}/integrations/xero/invoice-settings`,
							name: 'invoice-settings'
						},
						{
							label: 'Match',
							link: `/${currentOrg.id}/integrations/xero/match-entity`,
							name: 'match-entity'
						}
					]}
				/>
				<div key={'layoutMain'} className={globalStyles.padding}>
					{this.getMainComp()}
				</div>
				<div key={'layoutSecondary'} >
					Temporary text to remind Gareth about this space
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
