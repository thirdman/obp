import React, {Component} from 'react';
import {Circle, Text} from '../Elements';

const styles = require('../Placeholder.scss');

export default class Media extends Component {

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
		};
		let paragraphStyles = {
			border: `${margin}px solid ${mask}`
		};
		return (
			<div className={styles.Paragraph + ' ' + styles.backgroundAnimation} style={paragraphStyles}>
				<div className={styles.leftSection} style={fillerStyles}>
					<Circle mask={mask} hasMargins />
					<div className={styles.MaskSolo} style={fillerStyles} />
				</div>
				<div className={styles.rightSection}>
					<Text mask={mask} width={25} />
					<Text mask={mask} type="sentence" />
					<Text mask={mask} type="fill" />
				<div className={styles.Mask + ' ' + styles.MaskSolo} style={blockStyles} />
				</div>
			</div>
		);
	}

}