import { Component } from 'react';
import { Summary } from 'layouts';
// import { ObjectInfo } from 'components';
import { Header, Secondary} from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class TempApiManager extends Component {
	render() {
		return (
			<Summary>
				<Header key={'layoutHeader'} title="Nomos one API manager" />
				<div key={'layoutMain'}>
					<p>Select your organisation in the sidebar to continue</p>
				</div>
				<Secondary key={'layoutSecondary'} content=" " />
			</Summary>
		);
	}
}