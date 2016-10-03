import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';

import { Icon } from 'components';
// , QuickView
import cx from 'classnames';

const styles = require('./IconButton.scss');

export default class IconButton extends Component {

	static propTypes = {
		text: React.PropTypes.string,
		hoverIconColor: React.PropTypes.string,
		helpText: React.PropTypes.string,
		icon: React.PropTypes.string,
		iconColor: React.PropTypes.string,
		iconSize: React.PropTypes.number,
		isActive: React.PropTypes.bool,
		isDisabled: React.PropTypes.bool,
		isHovered: React.PropTypes.bool,
		classNameProps: React.PropTypes.array,
		onClickProps: React.PropTypes.func
	};

	static defaultProps = {
		isActive: false,
		isDisabled: false,
		classNameProps: ['normal'],
		isHovered: false
	};

	state = {
		isHovered: this.props.isHovered
	}

/*
	doMouseOver() {
		this.setState({isHovered: true});
	}
	doMouseOut() {
		this.setState({isHovered: false});
	}
*/

	render() {
		const {
			classNameProps = [],
			text,
			onClickProps,
			icon,
			iconColor,
			iconSize,
			isActive,
			isDisabled,
			helpText} = this.props;
		const { isHovered } = this.state;
		let tempIconColor;
		let hoveredIconColor;
		let iconWrapStyles;
		let iconSizeStyles;
		let tempSize;
		let newClassNameProps = classNameProps;
		if (isDisabled) {
			newClassNameProps = newClassNameProps.concat(isDisabled ? 'disabled' : '');
		}
		const classes = newClassNameProps.map((classV) => styles[classV]).join(' ');

		tempIconColor = iconColor || 'grey';
		hoveredIconColor = this.props.hoverIconColor ? this.props.hoverIconColor : 'lightGrey';
		tempSize = iconSize ? (iconSize + 'px') : null;
		if (iconSize) {
			iconSizeStyles = {
				width: tempSize,
				height: tempSize
			};
		}
		iconWrapStyles = {
			iconSizeStyles
		};

		return (
			<span
				className={cx(
						styles.IconButton,
						classes,
						(isActive ? styles.isActive : null),
						(isHovered ? styles.isHovered : null)
				)}
				onClick={onClickProps}
				// onMouseOver={this.doMouseOver}
				// onMouseOut={this.doMouseOut}
				data-tip={helpText}
				data-class={styles.tooltip}
				>
					<span
						className={styles.iconWrap}
						style={iconWrapStyles}
						ref={(c) => { this.btnIcon = c; }}
						key={1}
						>
						<Icon
							icon={icon || 'view'}
							color={!isHovered ? tempIconColor : hoveredIconColor}
							size={iconSize}
							classNameProps={['normal']}
						/>
					</span>
					<span className={styles.btnLabel}><span>{text}</span></span>
					<ReactTooltip type="light" />
			</span>
		);
	}
}
