import { Component } from 'react';
import { Overview } from 'layouts';
import { ObjectInfo, SubNavWrap } from 'components';
import { Header, ObjectSummary, Main, Secondary} from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class AgreementsSummary extends Component {
	render() {
		return (
			<Overview>
				<Header key={'layoutHeader'} title="Agreements Summary" />
				<ObjectInfo key={'layoutHero'} title="This is a test title" />
				<ObjectSummary key={'layoutHero'} />
				<SubNavWrap key={'layoutNav'} >
					<li>one</li>
					<li>two</li>
					<li>three</li>
				</SubNavWrap>
				<Main key={'layoutMain'} />
				<Secondary key={'layoutSecondary'} />
			</Overview>
		);
	}
}