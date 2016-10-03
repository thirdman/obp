import React, {Component} from 'react';
import classSet from 'react-classset';
import cx from 'classnames';
import { Icon } from 'components';

const styles = require('./InputToggle.scss');

export default class InputToggle extends Component {

	render() {
		const {
			classNameProps = [],
			onClickProps,
			isSelected,
			content,
			color
		} = this.props;
		let toggleClasses;
		let classes;

		toggleClasses = classSet({
			[styles.isSelected]: isSelected
		});

		classes = classNameProps.slice();
		classes = classes.concat(color);
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div className={cx(styles.InputToggle, classes, toggleClasses)} onClick={onClickProps}>
				<span className={styles.selectContent}>{(this.props.children || content)}</span>
				<span className={styles.selectIcon}>
					<span className={styles.iconWrap}>
					{ isSelected ?
						<Icon icon="tick" color={color || 'grey'} />
						: <Icon icon="plus" color={color || 'lightGrey'} />
					}
					</span>
				</span>
			</div>
		);
	}

	static propTypes = {
		content: React.PropTypes.string,
		color: React.PropTypes.string,
		isSelected: React.PropTypes.bool,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
		classNameProps: React.PropTypes.array,
		onClickProps: React.PropTypes.func
	};
}
