import React, {Component} from 'react';
import { Icon } from 'components';
import cx from 'classnames';

const styles = require('./Button.scss');

export default class Button extends Component {

	static propTypes = {
		content: React.PropTypes.string,
		type: React.PropTypes.string,
		icon: React.PropTypes.string,
		color: React.PropTypes.string,
		iconColor: React.PropTypes.string,
		iconPosition: React.PropTypes.string,
		iconSize: React.PropTypes.number,
		isOpen: React.PropTypes.bool,
		isActive: React.PropTypes.bool,
		isHighlighted: React.PropTypes.bool,
		isDisabled: React.PropTypes.bool,
		classNameProps: React.PropTypes.array,
		onClickProps: React.PropTypes.func,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
	};

	static defaultProps = {
		iconPosition: 'left',
		isActive: false,
		isOpen: false,
		isWrap: false,
		isDisabled: false,
		classNameProps: ['normal']
	};

	render() {
		const {
			classNameProps = [],
			content,
			type,
			color,
			onClickProps,
			icon,
			iconColor,
			iconPosition,
			iconSize,
			isActive,
			isOpen,
			isDisabled,
			isHighlighted
			} = this.props;
		let newClassNameProps = classNameProps;
		let iconWrapStyles;

		if (isOpen) {
			newClassNameProps = newClassNameProps.concat(isOpen ? 'isOpen' : '');
		}
		if (type) {
			newClassNameProps = newClassNameProps.concat(type);
		}
		if (color) {
			newClassNameProps = newClassNameProps.concat(color);
		}
		if (isDisabled) {
			newClassNameProps = newClassNameProps.concat(isDisabled ? 'disabled' : '');
		}
		if (isHighlighted) {
			newClassNameProps = newClassNameProps.concat('highlighted');
		}
		if (iconPosition === 'right') {
			newClassNameProps = newClassNameProps.concat('iconPostionRight');
		}
		const classes = newClassNameProps.map((classV) => styles[classV]).join(' ');
		const arrowColor = (type === 'select' && classes.includes('white')) ? 'blue' : 'white';
		let tempSize = iconSize ? (iconSize + 'px') : null;
		if (iconSize) {
			iconWrapStyles = {
				width: tempSize,
				height: tempSize
			};
		}
		const theIcon = props => (
			<span className={styles.iconWrap} style={iconWrapStyles}>
					<Icon
					icon={icon || 'view'}
					color={iconColor || 'white'}
					size={props.iconSize}
					classNameProps={[iconColor || 'white']}
					/>
				</span>
		);
		return (
			<span
				className={cx(
						styles.Button,
						classes,
						(type && type === 'select' ? styles.hasSelect : null)
				)}
				onClick={onClickProps}
			>
				{isActive ?
					(<span className={styles.isActive}>
						<Icon icon="loading" color="white" source="icons/" classNameProps={['white']} />
					</span>)
					:
					null
				}
				{
					icon && iconPosition === 'left' ?
					theIcon
					:
					null
					}
				{this.props.children ?
					this.props.children
					:
					null
				}
				<span className={styles.btnContent}>{content || 'text of button'}</span>
				{icon && iconPosition === 'right' ?
					<span className={styles.iconWrap} style={iconWrapStyles}>
						theIcon
					</span>
					:
					null
					}
				{(type === 'select') ?
					<span className={styles.select}>
						<span className={styles.iconWrap}>
						{ isOpen ?
							<Icon icon="chevron-up" color={arrowColor} />
							:
							<Icon icon="chevron-down" color={arrowColor} />
						}
						</span>
					</span>
					: null
				}
			</span>
		);
	}
}
