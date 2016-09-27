import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import { Avatar, UiBrandLogo } from 'components';
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
							<div className={styles.media}>
								<span className={styles.figure}>
									<Avatar
										type="org"
										size="small"
										title="Tyrion Lannister"
										imageUrl="https://pbs.twimg.com/profile_images/668279339838935040/8sUE9d4C.jpg"
									/>
								</span>
								<span className={styles.body}>
									<h5>name will be here</h5>
								</span>
							</div>
						</div>
				</div>
			</div>
		);
	}
}