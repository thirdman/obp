import { Component } from 'react';
import { Summary } from 'layouts';
import { Breadcrumbs, ObjectInfo } from 'components';
import { Header, Placeholder, Secondary} from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class AgreementsSummary extends Component {
	render() {
		const { routeParams, route} = this.props;
		return (
			<Summary>
				<div key={'layoutHeader'} >
					<Breadcrumbs params={routeParams} route={route} />
					<Header title="Agreements Summary" />
				</div>
				<div key={'layoutMain'}>
					<Placeholder content="A list of agreements will be here when we make it..." />
					<ObjectInfo type="agreement" title="Dave is here" />
					<ObjectInfo type="agreement" title="Dave is here" />
					<ObjectInfo type="agreement" title="Dave is here" />
					<ObjectInfo type="agreement" title="Dave is here" />
				</div>
				<Secondary key={'layoutSecondary'} content="secondary data will be here" />
			</Summary>
		);
	}
}