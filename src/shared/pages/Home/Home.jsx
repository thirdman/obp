import { Component } from 'react';
import { connect } from '../../../utils/state';

const globalStyles = require('../App/App.scss');

@connect('store')
export default class Home extends Component {
	render() {
		return (
			<div className={globalStyles.container}>
				<p>We are at  asda Home. sdf ssd fdsf f. !</p>
			</div>
		);
	}
}