import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { Icon } from 'components'; // UiHelpBar, UiNotifications, UiSearch, UiUsermenu
import { autobind } from 'core-decorators';

const styles = require('./TopBar.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class TopBar extends Component {

	static propTypes = {
		navData: React.PropTypes.array,
		visibleItems: React.PropTypes.array,
		hiddenItems: React.PropTypes.array,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
		classNameProps: React.PropTypes.array
	}

	state = {
		hasButton: true,
		navData: this.props.navData,
		showHidden: false,
		visibleItems: this.props.navData,
		hiddenItems: this.props.hiddenItems,
		overflowPos: {left: 12}
	}

	@autobind
	toggleHiddenLinks() {
		this.setState({showHidden: !this.state.showHidden});
	}

	render() {
		let theVisibleItems;
		let theHiddenItems;
		const {
			classNameProps = [],
			visibleItems = [],
			hiddenItems = []
		} = this.props;
		const classes = classNameProps
			.map((classV) => styles[classV])
			.join(' ');
		
		visibleItemsComps = visibleItems.map((item, index) => {
			return (
				<span className={styles.navItem} key={`item-${item.title}`} ref={`${index}`}>
					{item.title}
				</span>
			);
		});

		hiddenItemsComps = hiddenItems.map((item, index) => {
			return (
				<span className={styles.navItem} key={`item-${item.title}`} ref={`${index}`}>
					{item.title}
				</span>
			);
		});
		
		return (
			<div
				className={cx(
					styles.Topbar,
					classes,
					globalStyles.row
				)}>
				<div className={styles.secondaryContent}>
				{/* utitlity components will appear here. see tempCode.js */}
				</div>
				<div className={styles.PrimaryContent}>
					<div className={styles.navWrap} ref={'greedyNavWrap'}>
						<div className={cx(styles.topBarNav, styles.visibleLinks)}>
							<span
								ref="greedyNavItem"
								className={cx(
									styles.navItem,
									styles.itemOrg,
									styles.selected
								)}>
								{'DB Company'}
							</span>
							{visibleItemsComps}
							<span ref="overflowButton"
								onClick={this.toggleHiddenLinks}
								className={cx(
									styles.moreItemLink,
									(this.state.hiddenItems.length > 0 ? '' : styles.hidden)
								)}>
								<span className={styles.innerLink}>
									<span className={styles.innerNumber}>
										{hiddenItems.length > 0 ? ('+' + hiddenItems.length) : null}
									</span>
									{'more'}
									<div className={styles.moreIconWrap}>
										<Icon icon="chevron-down" color="grey" size={12}/>
									</div>
								</span>
							</span>
						</div>
					</div>
						<div style={this.state.overflowPos}
							ref={'greedyNavOverflow'}
							className={cx(
								styles.topBarNavOverflow,
								styles.hiddenLinks,
								(this.state.showHidden ? styles.hidden : '')
							)}>
							{hiddenItemsComps}
						</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}