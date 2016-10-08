import React, {Component} from 'react';

const styles = require('../Placeholder.scss');

export default class Circle extends Component {

	render() {
		const {
			mask = 'white',
			size,
			hasMargins = true
		} = this.props;
		let tempStyles = {
			backgroundColor: mask,
			width: (size ? `${size}px` : '100%'),
			height: (size ? `${size}px` : '100%'),
		};
		return (
			<div className={styles.Circle + ' ' + (hasMargins ? styles.hasMargins : '')} >
					<div
						className={styles.backgroundAnimation + ' ' + styles.circleMask}
						style={tempStyles}
					/>
			</div>
		);
	}

}