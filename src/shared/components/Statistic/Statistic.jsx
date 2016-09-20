import { Component, PropTypes } from 'react';
import CountTo from 'react-count-to';
import cx from 'classnames';

const styles = require('./Statistic.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class Statistic extends Component {
	static propTypes = {
		content: PropTypes.string,
		title: PropTypes.string,
		units: PropTypes.string,
		isAnimated: PropTypes.bool,
		countTime: PropTypes.number,
		classNameProps: PropTypes.array
	}

	countDecimals(value) {
		if (Math.floor(value) !== value) {
			return value.toString().split('.')[1].length || 0;
			} else {
		return 0;
		}
	}

	isNumber(number) {
		return !isNaN(parseFloat(number)) && isFinite(number);
	}

	render() {
		const {
			classNameProps = [],
			units,
			title,
			isAnimated = false,
			countTime = 700
		} = this.props;
		let { content } = this.props;
		const classes = classNameProps.map((classV) => styles[classV]).join(' ');
		let contentNumber;
		let digitCount = 0;
		let trimContent;
		let isNumber;

		// To be reviewed later

		if (isNumber(parseFloat(content))) {
			contentNumber = parseFloat(content);
			digitCount = this.countDecimals(contentNumber);
		} else if (isNumber(content.substring(1).replace(/[, ]+/g, ''))) {
			trimContent = content.substring(0, 1);
			contentNumber = content.substring(1).replace(/[, ]+/g, '');
			contentNumber = parseFloat(contentNumber.replace(/[, ]+/g, '').trim());
			digitCount = this.countDecimals(parseFloat(contentNumber));
		} else if (parseFloat(content.replace(/[, ]+/g, '').trim())) {
			contentNumber = content.replace(/[, ]+/g, '').trim();
			contentNumber = contentNumber.replace(/[, ]+/g, '').trim();
			digitCount = this.countDecimals(contentNumber);
		} else {
			contentNumber = null;
		}

		return (
			<div
				className={cx(
					styles.Statistic,
					classes
				)} >
				<div className={styles.divider} />
				<h4 className={globalStyles.subtitle}>{title}</h4>
				<div className={styles.theContent}>
					{isAnimated && trimContent ?
						trimContent
						: null
					}
					{isAnimated && contentNumber && countTime ?
						<CountTo to={contentNumber} speed={1000} digits={digitCount} />
						: null
					}
					{!isAnimated ? content : null }
				</div>
				<div className={styles.theUnits}>
					{units}
				</div>
			</div>
		);
	}
}