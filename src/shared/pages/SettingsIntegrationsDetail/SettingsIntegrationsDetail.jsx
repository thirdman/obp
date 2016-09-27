import { Component } from 'react';
import { autobind } from 'core-decorators';
import { browserHistory } from 'react-router';
import { View } from 'layouts';
import { SubNavWrap } from 'components';
import { Header } from 'containers';
// import { connect } from '../../../utils/state';

// @connect('store')
export default class SettingsIntegrationsDetail extends Component {

	/*
	componentWillMount() {
		const { routeParams } = this.props;
		console.log(routeParams);
		// const { agreementOverview } = this.context.store.pages;
		// agreementOverview.fetchAgreement(routeParams.sectionName);
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
				<Header key={'layoutHeader'} title={'PUT TITLE HERE'} />
				<div key={'layoutHero'}>
					<p>Gareth will put the xero logo here?</p>
				</div>
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={0}
					listData={[
						{label: 'Summary', href: '/integrations/xero'},
						{label: 'Delete?', href: '/integrations/xero'},
						{label: 'Delete?', href: '/integrations/xero'}
					]}
				/>
				<div> key={'layoutMain'} >
					{
					// KENNEK TO PUT API MANAGER DETAIL HERE
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
