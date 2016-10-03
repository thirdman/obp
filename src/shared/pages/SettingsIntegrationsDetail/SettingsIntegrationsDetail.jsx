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
		let connected;

		if (currentOrg.accessTokens.xero &&
			currentOrg.accessTokens.xero.connectedAt) {
			connected = true;
		}

		return (
			<View>
				<Header key={'layoutHeader'} title={'Integration Detail'} />
				<div key={'layoutHero'} className={globalStyles.padding}>
					<Row>
						<Column occupy={3}>
							<h4>Integration</h4>
							<p>Xero</p>
						</Column>
						<Column occupy={3}>
							<h4>Type</h4>
							<p>Accounting Software</p>
						</Column>
						<Column occupy={3}>
							<h4>Status</h4>
							<p>{`${connected ? '*Connected*' : '- Not Connected -'}`}</p>
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
							label: 'Invoice',
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
