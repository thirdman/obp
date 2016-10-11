import { Component } from 'react';
import { Summary } from 'layouts';
// import { Placeholder } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';

const imgGettingStarted1 = 'https://github.com/NomosAdmin/nomos-frontend/blob/master/src/shared/images/misc/gettingstarted_1.jpg';
const imgGettingStarted2 = 'https://github.com/NomosAdmin/nomos-frontend/blob/master/src/shared/images/misc/gettingstarted_2.jpg';
@connect('store')
export default class TempApiManager extends Component {

	render() {
		return (
			<Summary>
				<Header key={'layoutHeader'} title="App integrations manager" />
				<div key={'layoutMain'}>
					<h3>Getting Started</h3>
					<ol>
						<li>
							<p>To get started click on an Organisation from the list</p>
							<img
								src={imgGettingStarted1}
								alt={'Getting started screenshot 1'}
								style={{border: '1px solid #ddd', borderRadius: '3px'}}
							/>
						</li>
						<li>
							<p>Then click on the integration you would like to use</p>
							<img
								src={imgGettingStarted2}
								alt={'Getting started screenshot 21'}
								style={{border: '1px solid #ddd', borderRadius: '3px'}}
							/>
						</li>
					</ol>
				</div>
				<div key={'layoutSecondary'} >
					<h3>What is an integration?</h3>
					<p>Integrations allow you to extend the
							functionality of nomos one with related software you use. For example, if you
							use Xero accounting software, you can view invoice information right with your
							entities inside nomos one.
					</p>
				</div>
			</Summary>
		);
	}
}