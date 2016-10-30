import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import classSet from 'react-classset';

const styles = require('./Row.scss');

export default class Row extends Component {
	render() {
		const {
			occupy = 1,
			of = 1,
			devMode = false,
			isFlex = true,
			hasPadding = false,
			collapseMargin,
			backgroundColor,
			classNameProps = [],
			children
		} = this.props;
		let classes;
		let toggleClasses;

		toggleClasses = classSet({
			[styles.isFlex]: isFlex,
			[styles.hasPadding]: hasPadding,
			[styles.collapseMargin]: collapseMargin,
			[styles.devMode]: devMode
		});

		classes = classNameProps.slice();
		classes = classes.concat(backgroundColor);
		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div
				data-occupy={occupy}
				data-of={of}
				className={cx(
					styles.Row,
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
		hasPadding: PropTypes.bool,
		collapseMargin: PropTypes.bool,
		backgroundColor: PropTypes.string,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		])
	};
}