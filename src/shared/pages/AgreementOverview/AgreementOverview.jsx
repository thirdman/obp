import { Component } from 'react';
import { Overview } from 'layouts';
import { connect } from '../../../utils/state';

// const globalStyles = require('../App/App.scss');

@connect('store')
export default class AgreementOverview extends Component {
	componentWillMount() {
		const { routeParams } = this.props;
		const { agreementOverview } = this.context.store.pages;

		agreementOverview.fetchAgreement(routeParams.agreementId);
		this.context.store.pages.agreementOverview.updateError('sdfsfdsfd');
	}

	render() {
		return (
			<Overview>
				<p key={'layoutHeader'}>We are at 1 !</p>
				<p key={'layoutHero'}>We are at 2 !</p>
				<p key={'layoutNav'}>We are at 3 !</p>
				<p key={'layoutSupplimentary'}>We are at 4 !</p>
				<p key={'layoutMain'}>We are at 5 !</p>
				<p key={'layoutSecondary'}>We are at 6 !</p>
				<p key={'layoutFooter'}>We are at 7 !</p>
			</Overview>
		);
	}
}