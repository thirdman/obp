import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import GeminiScrollbar from 'react-gemini-scrollbar';
import { Avatar, Icon, UiBrandLogo } from 'components';
import cx from 'classnames';
import { connect } from '../../../utils/state';

@connect('store')
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
					<GeminiScrollbar className={styles.ScrollZone}>
						<div className={styles.navigation}>
							{ this.getOrgsComp() }
						</div>
					</GeminiScrollbar>
				</div>
			</div>
		);
	}

	getOrgsComp() {
		const { orgs = [] } = this.context.store.auth;
		const { currentOrg = null } = this.context.store.app;
		const styles = require('./MainNavWrap.scss');

		if (orgs.length) {
			return orgs.map((org, index) => (
			<Link to={`/${org.id}/integrations`} key={`orgIcon${index}`}>
				<div
					className={
						`${styles.media} ${currentOrg.id === org.id ? styles.isSelected : ''}`
					}>
					<span className={styles.figure}>
						<Avatar
							type="org"
							size="small"
							title={org.attributes.name}
							base64={org.attributes.firmLogo}
							defaultIconColor={'blue'}
						/>
					</span>
					<span className={styles.body}>
						<h5>
							{org.attributes.name}
							{currentOrg.id === org.id ?
								<div className={styles.iconWrap}>
									<Icon icon="chevron-right" color="lightGrey" size={12} color="blue" />
								</div>
								: null
							}
						</h5>
					</span>
				</div>
			</Link>
			));
		} else {
			return null;
		}
	}
}
