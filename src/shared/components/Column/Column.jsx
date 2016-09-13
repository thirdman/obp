import React from 'react';
import cx from 'classnames';

const styles = require('./column.scss');

const Column = ({ isFlex = true, columns = 12, of = 12, devMode = false, children}) => (
	<div
		className={cx(
			styles.Column,
			(devMode ? styles.devMode : ''),
			(isFlex ? styles.isFlex : ''))
			}
		data-columns={columns}
		data-of={of}
	>
		{children}
	</div>
);

Column.propTypes = {
	columns: React.PropTypes.number,
	of: React.PropTypes.number,
	isFlex: React.PropTypes.bool,
	devMode: React.PropTypes.bool,
	children: React.PropTypes.oneOfType([
		React.PropTypes.arrayOf(React.PropTypes.node),
		React.PropTypes.node
	])
};

export default Column;