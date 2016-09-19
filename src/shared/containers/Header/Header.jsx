import React from 'react';
import cx from 'classnames';
import { Breadcrumbs } from 'components';

const styles = require('./Header.scss');

const Header = ({ title, hasDivider = false, hasBreadcrumbs = true }) => (
	<div className={cx(styles.Header, (hasDivider ? styles.hasDivider : null))}>
		{hasBreadcrumbs ?
			<Breadcrumbs />
			: null
		}
		{title ?
			<h2>{title}</h2>
			: null
		}
	</div>
);

Header.propTypes = {
	title: React.PropTypes.string,
	hasDivider: React.PropTypes.bool,
	hasBreadcrumbs: React.PropTypes.bool
};

export default Header;
