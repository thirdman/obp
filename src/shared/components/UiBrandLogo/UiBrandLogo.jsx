import React from 'react';
import { IndexLink } from 'react-router';
import {Icon} from 'components';
import cx from 'classnames';

const styles = require('./UiBrandLogo.scss');

const UiBrandLogo = ({ isSmall, isLoading }) => (
	<div
		className={
			cx(styles.UiBrandLogo,
			(isSmall ? styles.isSmall : ''),
			(isLoading ? styles.isLoading : ''))
		}
	>
		<IndexLink to="/" className={styles.brandLink}>
			<span className={styles.iconWrap}>
				<Icon source="nomos/" icon="logo_colour" color="default" />
			</span>
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
