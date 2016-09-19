import { Component } from 'react';
import { Overview } from 'layouts';
import { ObjectInfo, SubNavWrap } from 'components';
import { Header, Placeholder, Secondary} from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class AgreementsSummary extends Component {
	render() {
		return (
			<Overview>
				<Header key={'layoutHeader'} title="Agreements Summary" />
				<ObjectInfo key={'layoutHero'} title="This is a test title" />
				<SubNavWrap key={'layoutNav'} >
					<li>one</li>
					<li>two</li>
					<li>three</li>
				</SubNavWrap>
				<Placeholder key={'layoutMain'} title="Content here" />
				<Secondary key={'layoutSecondary'} />
			</Overview>
		);
	}
}