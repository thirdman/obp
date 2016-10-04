import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const styles = require('./SparkPercentage.scss');

export default class SparkPercentage extends Component {

	render() {
		const {
			classNameProps = [],
			percentage
			} = this.props;

		let classes;
		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		const maskStyle = {
			height: (100 - percentage) + '%'
		};

		return (
			<div className={cx(styles.SparkPercentage, classes)}>
				<div className={styles.colorBar}>
					<div className={styles.mask} style={maskStyle} />
				</div>
				{percentage}%
			</div>
		);
	}

	static propTypes = {
		percentage: PropTypes.number,
		classNameProps: PropTypes.array
	}
}

