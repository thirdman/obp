import { Component } from 'react';
import { Link } from 'react-router';
import { View } from 'layouts';
// import { SubNavWrap } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class SettingsIntegrations extends Component {

	/*
	componentWillMount() {
		const { routeParams } = this.props;
		console.log(routeParams);
	}
	*/

	render() {
		const { app, auth } = this.context.store;
		const { currentOrg = null } = app;
		const org = auth.getOrg(currentOrg);
		let orgName = org && org.attributes.name;

		return (
			<View>
				<Header key={'layoutHeader'} title={`Your Integrations for ${orgName}`} />
				<div key={'layoutHero'}>
					<p>Select the integration you wish to activate or edit</p>
				</div>
				<div key={'layoutMain'} >
					<Link to={`/${currentOrg}/integrations/xero`}>
						<span>{'Xero'}</span>
					</Link>
				</div>
				<div key={'layoutSecondary'} >
					Temporary text to remind Gareth about this space
				</div>
			</View>
		);
	}
}
