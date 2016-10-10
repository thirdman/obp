import React, {Component} from 'react';

const styles = require('../Placeholder.scss');

export default class Text extends Component {
	getRandomWidth(max, min) {
		let generatedWidth = Math.floor(Math.random() * max) + min;
		return (
			generatedWidth
		);
	}
	render() {
		const {
			mask = 'white',
			width,
			isStaggered = true,
			type // one of normal, sentence, or fill
		} = this.props;
		let rightWidth;
		let rightStyles;

		let tempStyles = {
			backgroundColor: mask
		};

		rightWidth = '16px';
		if (width) {
			rightWidth = 100 - width;
		}
		if (isStaggered && !width) {
			rightWidth = this.getRandomWidth(25, 5);
		}
		if (type === 'fill') {
			rightWidth = 100;
		}
		if (type === 'sentence') {
			rightWidth = this.getRandomWidth(20, 10);
		}

		rightStyles = {
			backgroundColor: mask,
			width: rightWidth + '%'
		};

		return (
			<div className={styles.Text} >
				<div className={styles.Mask + ' ' + styles.MaskTop} style={tempStyles} />
				<div className={styles.Mask + ' ' + styles.MaskLeft} style={tempStyles} />
				<div className={styles.Mask + ' ' + styles.MaskRight} style={rightStyles} />
				{type === 'sentence' ?
					<div className={styles.dividers}>
						<div
							className={styles.divider}
							style={{backgroundColor: mask, left: `${this.getRandomWidth(15, 10)}%`}}
						/>
						<div
							className={styles.divider}
							style={{backgroundColor: mask, left: `${this.getRandomWidth(35, 20)}%`}}
						/>
						<div
							className={styles.divider}
							style={{backgroundColor: mask, left: `${this.getRandomWidth(55, 40)}%`}}
						/>
						<div
							className={styles.divider}
							style={{backgroundColor: mask, left: `${this.getRandomWidth(70, 60)}%`}}
						/>
					</div>
					: null
				}
			</div>
		);
	}

}