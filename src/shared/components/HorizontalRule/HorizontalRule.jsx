import React, { Component } from 'react';
import classSet from 'react-classset';
import cx from 'classnames';

const styles = require('./HorizontalRule.scss');

export default class HorizontalRule extends Component {
	render() {
		const {
			color = 'line',
			width = 100,
			isCentered = true,
			hasMargins = true,
			classNameProps = []
			} = this.props;

		let toggleClasses;
		let classes;
		let tempStyle;

		toggleClasses = classSet({
			[styles.isCentered]: isCentered,
			[styles.hasMargins]: hasMargins
		});

		classes = classNameProps.slice();
		classes = classes.concat(color);
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		if (width) {
			tempStyle = {
				width: width + '%',
			};
		}

		return (
			<div className={cx(styles.HorizontalRule, classes, toggleClasses)} style={tempStyle} />
		);
	}
	static propTypes = {
		color: React.PropTypes.string,
		width: React.PropTypes.number,
		isCentered: React.PropTypes.bool,
		hasMargins: React.PropTypes.bool,
		classNameProps: React.PropTypes.array
	};
}

