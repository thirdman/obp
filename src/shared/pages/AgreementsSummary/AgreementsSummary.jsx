import { Component } from 'react';
import { Summary } from 'layouts';
import { ObjectInfo } from 'components';
import { Header, Placeholder, Secondary} from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class AgreementsSummary extends Component {
	render() {
		return (
			<Summary>
				<Header key={'layoutHeader'} title="Agreements Summary" />
				<div key={'layoutMain'}>
					<Placeholder content="A list of agreements will be here when we make it..." />
					<ObjectInfo type="agreements" title="Dave is here" />
					<ObjectInfo type="agreements" title="Dave is here" />
					<ObjectInfo type="agreements" title="Dave is here" />
					<ObjectInfo type="agreements" title="Dave is here" />
				</div>
				<Secondary key={'layoutSecondary'} content="secondary data will be here" />
			</Summary>
		);
	}
}