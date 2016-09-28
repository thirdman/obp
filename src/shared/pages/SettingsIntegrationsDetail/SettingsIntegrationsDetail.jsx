import { Component } from 'react';
import { View } from 'layouts';
import { SubNavWrap } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';
import {
	ConnectionSection,
	EntitySection,
	InvoiceSection
} from './containers';

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

		return (
			<View>
				<Header key={'layoutHeader'} title={'PUT TITLE HERE'} />
				<div key={'layoutHero'}>
					<p>Gareth will put the xero logo here?</p>
				</div>
				<SubNavWrap
					key={'layoutNav'}
					selected={section}
					listData={[
						{
							label: 'Connection',
							link: `/${currentOrg}/integrations/xero`,
							name: 'connect'
						},
						{
							label: 'Match',
							link: `/${currentOrg}/integrations/xero/match-entity`,
							name: 'match-entity'
						},
						{
							label: 'Invoice',
							link: `/${currentOrg}/integrations/xero/invoice-settings`,
							name: 'invoice-settings'
						}
					]}
				/>
				<div key={'layoutMain'} >
					{this.getMainComp()}
				</div>
				<div key={'layoutSecondary'} >
					Temporary text to remind Gareth about this space
				</div>
			</View>
		);
	}

	getMainComp() {
		const { section } = this.state;
		switch (section) {
			case 'connect':
				return (
					<ConnectionSection />
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
