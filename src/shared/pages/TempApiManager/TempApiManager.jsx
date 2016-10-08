import { Component } from 'react';
import { Summary } from 'layouts';
import { Placeholder } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';

@connect('store')
export default class TempApiManager extends Component {

	render() {
		return (
			<Summary>
				<Header key={'layoutHeader'} title="Nomos one API manager" />
				<div key={'layoutMain'}>
					<p>Enable app integrations by selecting an organisation in
					the sidebar, then the integration you wish to add or edit.</p>
					<h3>What is an integration?</h3>
					<p>Integrations allow you to extend the
							functionality of nomos one with related software you use. For example, if you
							use Xero accounting software, you can view invoice information right with your
							entities inside nomos one. </p>
				</div>
				<div key={'layoutSecondary'} >
					{' '}
				</div>
			</Summary>
		);
	}
}