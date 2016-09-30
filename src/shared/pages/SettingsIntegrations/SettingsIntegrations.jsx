import { Component } from 'react';
import { Link } from 'react-router';
import { View } from 'layouts';
// import { SubNavWrap } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class SettingsIntegrations extends Component {

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
			<View>
				<Header key={'layoutHeader'} title={`Your Integrations for ${orgName}`} />
				<div key={'layoutHero'}>
					<p>Select the integration you wish to activate or edit</p>
				</div>
				<div key={'layoutMain'} >
					<Link to={`/${currentOrg.id}/integrations/xero`}>
						<span>{`Xero ${connected ? '- Connected' : ''}`}</span>
					</Link>
				</div>
				<div key={'layoutSecondary'} >
					Temporary text to remind Gareth about this space
				</div>
			</View>
		);
	}
}
