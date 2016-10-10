import React, {Component} from 'react';

const styles = require('../Placeholder.scss');

export default class Square extends Component {

	render() {
		const {
			mask = 'white',
			hasMargins = true
		} = this.props;
		let tempStyles = {
			backgroundColor: mask
		};
		return (
			<div className={styles.Square} >
				{hasMargins ?
					<div className={styles.backgroundAnimation}>
						<div className={styles.Mask + ' ' + styles.MaskTop} style={tempStyles} />
						<div className={styles.Mask + ' ' + styles.MaskLeft} style={tempStyles} />
						<div className={styles.Mask + ' ' + styles.MaskRight} style={tempStyles} />
					</div>
					: null
				}
				{hasMargins ?
					<div className={styles.MaskSolo} style={tempStyles} />
					: null
				}
			</div>
		);
	}

}