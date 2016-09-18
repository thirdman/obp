import { Component } from 'react';
import { Button, Icon, IconImage } from 'components';
import cx from 'classnames';
import { autobind } from 'core-decorators';
import { connect } from '../../../utils/state';

const styles = require('./UiUserMenu.scss');
const globalStyles = require('../../pages/App/App.scss');

@connect('store')
export default class UiUserMenu extends Component {

	state = {
		isOpen: false
	};

	@autobind
	toggleOpen() {
		this.setState({ isOpen: !this.state.isOpen});
	}

	render() {
		const { auth } = this.context.store;
		const { isOpen } = this.state;

		return (
			<div className={styles.UiUserMenu}>
				<div className={styles.user}>
					{auth.check &&
						<div className={styles.loggedIn}>
							<div
								onClick={this.toggleOpen}
								className={cx(
									styles.iconWrap,
									(this.state.isOpen ? styles.isOpen : ''))}>
								<IconImage
									iconType="user"
									imageUrl="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg"
									size="large"
									classNameProps={['medium', 'fill']} />
							</div>
							{isOpen ?
								<div className={styles.actionItems}>
									<div className={styles.triangle} />
									<div className={styles.userActionHeader}>
										<h4 className={globalStyles.subtitle}>USER</h4>
										<span className={styles.userNameText} >{auth.user.username}</span>
									</div>
									<Button
										key={'option-profile'}
										content={'Profile'}
										classNameProps={['btn', 'text', 'actionItem']} />
									<Button
										key={'option-logout'}
										content={'Log out'}
										classNameProps={['btn', 'text', 'actionItem']} />
								</div>
								: null
							}
							<span className={styles.arrowWrap} onClick={this.toggleOpen}>
								{isOpen ?
									<Icon icon="chevron-up" color="grey" />
									: <Icon icon="chevron-down" color="grey" />
								}
							</span>
						</div>
					}
				</div>
			</div>
		);
	}
}