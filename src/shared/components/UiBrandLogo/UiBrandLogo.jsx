import React from 'react';
import { IndexLink } from 'react-router';
import cx from 'classnames';

const styles = require('./UiBrandLogo.scss');

const UiBrandLogo = ({ isSmall }) => (
	<div className={cx(styles.UiBrandLogo, (isSmall ? styles.isSmall : ''))}>
		<IndexLink to="/" className={styles.brandLink}>
			<span className={styles.iconWrap} />
			{!isSmall ?
				<span>{'nomos one'}</span>
				: null
			}
			<span className={styles.saving} />
		</IndexLink>
	</div>
);

UiBrandLogo.propTypes = {
	isSmall: React.PropTypes.bool,
	isLoading: React.PropTypes.bool
};

export default UiBrandLogo;
