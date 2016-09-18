import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import { UiBrandLogo } from 'components';
import cx from 'classnames';

export default class MainNavWrap extends Component {

	static propTypes = {
		isNavOpen: PropTypes.bool,
		navDocked: PropTypes.bool,
		animatable: PropTypes.bool,
		doToggle: PropTypes.func
	};

	render() {
		const {
			isNavOpen = true,
			navDocked,
			animatable
		} = this.props;
		const styles = require('./MainNavWrap.scss');

		return (
			<div
				className={cx(styles.MainNavWrap, {
					[styles.navOpen]: isNavOpen,
					[styles.navDocked]: navDocked,
					[styles.animatable]: animatable})}>
				<div className={styles.navBarContent}>
					<UiBrandLogo isSmall={navDocked} />
						<div className={styles.navigation}>
							<a className={styles.menuItem}>Docs</a>
						</div>
				</div>
			</div>
		);
	}
}