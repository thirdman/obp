import React, {Component, PropTypes} from 'react';
import classSet from 'react-classset';
import cx from 'classnames';
import { Icon } from 'components';

const styles = require('./Message.scss');

export default class Message extends Component {

	componentDidMount() {
		const { timeout } = this.props;
		if (typeof timeout === 'function') {
			setTimeout(() => { timeout(); }, 5000);
		}
	}

	render() {
		const {
			classNameProps = [],
			content,
			type = 'info',
			hasIcon = true,
			hasCloseButton = false
			} = this.props;
		let { icon } = this.props;
		let classes;
		let toggleClasses;

		// NOTE: Set up manually, because the names of icons don't map directly to types of messages
		if (!icon) {
			if (type === 'error' || type === 'warning') {
				icon = 'alert-triangle';
			} else if (type === 'question') {
				icon = 'question';
			} else if (type === 'success') {
				icon = 'tick-circle';
			} else if (type === 'question') {
				icon = 'question';
			} else {
				icon = 'information';
			}
		}

		toggleClasses = classSet({
			[styles.hasIcon]: hasIcon,
			[styles.hasCloseButton]: hasCloseButton
		});

		classes = classNameProps.slice();
		classes = classes.concat(type);
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div className={cx(styles.Message, classes, toggleClasses)}>
				{hasIcon ?
					<span className={styles.iconWrap}>
						<Icon icon={icon} color="white" />
					</span>
					: null
				}
				<span className={styles.theContent}>
					{this.props.children ? this.props.children : content }
				</span>
				{hasCloseButton ?
					<span className={styles.closeButton}>
						<Icon icon={'cross'} color="white" size={12} />
					</span>
					: null
				}
			</div>
		);
	}
	static propTypes = {
		content: PropTypes.string,
		type: PropTypes.string,
		icon: PropTypes.string,
		hasCloseButton: PropTypes.bool,
		hasIcon: PropTypes.bool,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		]),
		classNameProps: PropTypes.array
	}
}