import React from 'react';
import cx from 'classnames';

const styles = require('./Column.scss');

const Column = ({ isFlex = true, occupy = 12, of = 12, devMode = false, children}) => (
	<div
		data-occupy={occupy}
		data-of={of}
		className={cx(
			styles.Column,
			(devMode ? styles.devMode : ''),
			(isFlex ? styles.isFlex : ''))} >
		{children}
	</div>
);

Column.propTypes = {
	occupy: React.PropTypes.number,
	of: React.PropTypes.number,
	isFlex: React.PropTypes.bool,
	devMode: React.PropTypes.bool,
	children: React.PropTypes.oneOfType([
		React.PropTypes.arrayOf(React.PropTypes.node),
		React.PropTypes.node
	])
};

export default Column;