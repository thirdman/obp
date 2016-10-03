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
			subtitle: 'beautiful accounting software',
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
					<div>{subtitle}</div>
					<Row>
					<img src={logoUrl} width={100} height={100} alt={title} />
					</Row>
					<Row>
						<Column occupy={3}>
							<h4>Integration</h4>
							<p>{title}</p>
						</Column>
						<Column occupy={3}>
							<h4>Type</h4>
							<p>Accounting Software</p>
						</Column>
						<Column occupy={3}>
							<h4>Status</h4>
							<p>{`${connected ? '*Connected*' : '- Not Connected -'}`}</p>
						</Column>
						<Column occupy={3}>
							<h4>Further Information</h4>
							<span><a href={websiteUrl}>{websiteUrl}</a></span>
						</Column>
					</Row>
					<Row>
						<Column occupy={6}>
							<h4>What is {`${title}`}</h4>
								{longDescription}
						</Column>
						<Column occupy={6}>
							<h4>What Can You Do With It?</h4>
							<p>{whatYouCanDo}</p>
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
							label: 'Match',
							link: `/${currentOrg.id}/integrations/xero/match-entity`,
							name: 'match-entity'
						},
						{
							label: 'Settings',
							link: `/${currentOrg.id}/integrations/xero/invoice-settings`,
							name: 'invoice-settings'
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
