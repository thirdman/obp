import { Component } from 'react';
import { autobind } from 'core-decorators';
import { browserHistory } from 'react-router';
import { View } from 'layouts';
// import { SubNavWrap } from 'components';
import { Header } from 'containers';
// import { connect } from '../../../utils/state';

// @connect('store')
export default class SettingsIntegrations extends Component {

	/*
	componentWillMount() {
		const { routeParams } = this.props;
		console.log(routeParams);
	}
	*/

	@autobind
	onClick(link) {
		return () => {
			browserHistory.push(link);
		};
	}

	render() {
		const { location, routeParams } = this.props;
		console.log(routeParams);
		console.log(location);
		return (
			<View>
				<Header key={'layoutHeader'} title={'Your Integrations'} />
				<div key={'layoutHero'}>
					<p>Select the integration you wish to activate or edit</p>
				</div>
				<div> key={'layoutMain'} >
					{
					// KENNEK TO PUT API MANAGER LIST HERE
					// SO WE CAN SEE IT
					}
				</div>
				<div key={'layoutSecondary'} >
					Temporary text to remind Gareth about this space
				</div>
			</View>
		);
	}
}
