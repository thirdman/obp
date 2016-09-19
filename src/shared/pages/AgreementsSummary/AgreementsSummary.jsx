import { Component } from 'react';
import { Overview } from 'layouts';
import { ObjectInfo, SubNavWrap } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class AgreementsSummary extends Component {
	render() {
		return (
			<Overview>
				<p key={'layoutHeader'}>We are at 1 !</p>
				<Header key={'layoutHeader'} title="Agreements Summary" />
				<ObjectInfo key={'layoutHero'} title="This is a test title" />
				<SubNavWrap key={'layoutNav'} >
					<li>one</li>
					<li>two</li>
					<li>three</li>
				</SubNavWrap>
				<p key={'layoutSupplimentary'}>We are at 4 !</p>
				<p key={'layoutMain'}>We are at 5 !</p>
				<p key={'layoutSecondary'}>We are at 6 !</p>
				<p key={'layoutFooter'}>We are at 7 !</p>
			</Overview>
		);
	}
}