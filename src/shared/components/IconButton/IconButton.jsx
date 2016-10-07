import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import {Motion, spring} from 'react-motion';

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
	doMouseOver() {
		return () => {
			this.setState({isHovered: true});
		};
	}
	doMouseOut() {
		return () => {
			this.setState({isHovered: false});
		};
	}

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
		let motionIconStyle;
		let motionLabelStyle;
		const springConfig = {stiffness: 290, damping: 23};
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

		motionIconStyle = {
			x: spring((this.state.isHovered ? 0.75 : 1), springConfig),
			y: spring((this.state.isHovered ? 0.75 : 1), springConfig),
		};
		motionLabelStyle = {
			y: spring(this.state.isHovered ? -8 : 8),
			op: spring(this.state.isHovered ? 1 : 0)
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
				onMouseOver={this.doMouseOver('fsg')}
				onMouseOut={this.doMouseOut()}
				data-tip={helpText}
				data-class={styles.tooltip}
				>
				<Motion style={motionIconStyle}>
					{({y, x}) => (
					<span
						className={styles.iconWrap}
						style={iconWrapStyles}
						ref={(c) => { this.btnIcon = c; }}
						key={1}
						style={{
								WebkitTransform: `scale3d(${x}, ${y}, 1)`,
								transform: `scale3d(${x}, ${y}, 1)`,
								display: 'block'
							}}
						>
						<Icon
							icon={icon || 'view'}
							color={!isHovered ? tempIconColor : hoveredIconColor}
							size={iconSize}
							classNameProps={['normal']}
						/>
					</span>
					)}
				</Motion>
					<Motion
						style={motionLabelStyle}
						>
						{({y, op}) => (
						<span
							className={styles.btnLabel}
							style={{
								opacity: `${op}`,
								WebkitTransform: `translate3d(0, ${y}px, 0)`,
								transform: `translate3d(0, ${y}px, 0)`,
							}}>
								<span>{text}</span>
              </span>
						)}
					</Motion>
					<ReactTooltip type="light" />
			</span>
		);
	}
}
