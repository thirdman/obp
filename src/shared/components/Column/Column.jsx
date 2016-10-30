import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import classSet from 'react-classset';

const styles = require('./Column.scss');

export default class Column extends Component {
	render() {
		const {
			occupy = 12,
			of = 12,
			devMode = false,
			isFlex = true,
			classNameProps = [],
			children
		} = this.props;
		let classes;
		let toggleClasses;

		toggleClasses = classSet({
			[styles.isFlex]: isFlex,
			[styles.devMode]: devMode
		});

		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div
				data-occupy={occupy}
				data-of={of}
				className={cx(
					styles.Column,
					classes,
					toggleClasses)} >
				{children}
			</div>
		);
	}

	static propTypes = {
		occupy: PropTypes.number,
		of: PropTypes.number,
		isFlex: PropTypes.bool,
		devMode: PropTypes.bool,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		])
	};
}