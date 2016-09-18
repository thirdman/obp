import { Component, PropTypes } from 'react';
import cx from 'classnames';
import { autobind } from 'core-decorators';

const styles = require('./SlideToggle.scss');

export default class SlideToggle extends Component {
	static propTypes = {
		isOpen: PropTypes.bool,
		isDocked: PropTypes.bool,
		width: PropTypes.number,
		height: PropTypes.number,
		strokeWidth: PropTypes.number,
		rotate: PropTypes.number,
		color: PropTypes.string,
		borderRadius: PropTypes.number,
		animationDuration: PropTypes.number,
		onClickProps: PropTypes.func,
		classNameProps: PropTypes.array
	}

	state = {
		isOpen: this.props.isOpen,
		isDocked: this.props.isDocked
	}

	@autobind
	toggleSelected() {
		this.setState({ isOpen: !this.state.isOpen});
	}

	render() {
		const {
			classNameProps = [],
			width = 36,
			height = 30,
			strokeWidth = 2,
			rotate = 0,
			borderRadius = 0,
			animationDuration = 0.5,
			isOpen = false,
			isDocked = false,
			color = 'black',
			onClickProps
			} = this.props;
		const cssWidth = `${width || 36}px`;
		const cssHeight = `${height || 30}px`;
		const halfHeight = `${height / 2}px`;
		const halfStrokeWidth = `-${strokeWidth / 2}px`;

		const classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		const getTransformValue = (isThisOpen, defaultPos, rotateVal) => (
			`translate3d(0,${isThisOpen ? halfHeight : defaultPos},0)
			rotate(${isThisOpen ? `${rotateVal}deg` : '0'})`
		);
		const thisStyles = {
			container: {
				height: cssHeight,
				width: cssWidth,
				position: 'relative',
				transform: `rotate(${rotate || 0}deg) translateX(${isDocked ? '-180px' : '0px'})`,
				transitionTimingFunction: 'ease-in-out',
				transitionDuration: '.3s',
			},
			lineBase: {
				display: 'block',
				height: `${strokeWidth}px`,
				width: '100%',
				background: color || '#000',
				transitionTimingFunction: 'ease',
				transitionDuration: `${animationDuration}s`,
				borderRadius: `${borderRadius || 0}px`,
				transformOrigin: 'center',
				position: 'absolute'
			},
			firstLine: {
				transform: getTransformValue(isOpen, 0, 45),
				marginTop: halfStrokeWidth,
			},
			secondLine: {
				transitionTimingFunction: 'ease-out',
				transitionDuration: `${animationDuration / 4}s`,
				opacity: isOpen ? '0' : '1',
				top: halfHeight,
				marginTop: halfStrokeWidth
			},
			thirdLine: {
				transform: getTransformValue(isOpen, cssHeight, -45),
				marginTop: halfStrokeWidth
			}
		};

		return (
			<div
				style={thisStyles.container}
				onClick={onClickProps}
				className={cx(
					styles.SlideToggle,
					classes
				)}>
				<span style={Object.assign({}, thisStyles.lineBase, thisStyles.firstLine)} />
				<span style={Object.assign({}, thisStyles.lineBase, thisStyles.secondLine)} />
				<span style={Object.assign({}, thisStyles.lineBase, thisStyles.thirdLine)} />
			</div>
		);
	}
}