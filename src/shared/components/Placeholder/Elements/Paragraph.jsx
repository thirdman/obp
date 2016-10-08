import React, {Component} from 'react';
import {Square, Text} from '../Elements';

const styles = require('../Placeholder.scss');

export default class Paragraph extends Component {

	render() {
		const {
			mask = 'white',
			margin = 8
		} = this.props;
		let blockStyles = {
			backgroundColor: mask,
		};
		let fillerStyles = {
			backgroundColor: mask,
			display: 'table-cell'
		};
		let paragraphStyles = {
			border: `${margin}px solid ${mask}`
		};
		return (
			<div className={styles.Paragraph + ' ' + styles.backgroundAnimation} style={paragraphStyles}>
				<div className={styles.leftSection}>
					<Square hasMargins mask={mask} />
					<div className={styles.MaskSolo} style={fillerStyles} />
				</div>
				<div className={styles.rightSection}>
					<Text mask={mask} />
					<Text mask={mask} />
					<Text mask={mask} />
				<div className={styles.Mask + ' ' + styles.MaskSolo} style={blockStyles} />
				</div>
			</div>
		);
	}

}