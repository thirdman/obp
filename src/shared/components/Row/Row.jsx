import React from 'react';
import cx from 'classnames';

const styles = require('./Row.scss');

const Row = ({ isFlex = true, occupy = 1, of = 1, devMode = false, children}) => (
	<div
		data-occupy={occupy}
		data-of={of}
		className={cx(
			styles.Row,
			(devMode ? styles.devMode : ''),
			(isFlex ? styles.isFlex : ''))} >
		{children}
	</div>
);

Row.propTypes = {
	occupy: React.PropTypes.number,
	of: React.PropTypes.number,
	isFlex: React.PropTypes.bool,
	devMode: React.PropTypes.bool,
	children: React.PropTypes.oneOfType([
		React.PropTypes.arrayOf(React.PropTypes.node),
		React.PropTypes.node
	])
};

export default Row;