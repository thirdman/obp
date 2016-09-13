import React, { Component } from 'react';
import cx from 'classnames';
import { autobind } from 'core-decorators';

const styles = require('./Icon.scss');

export default class Icon extends Component {

	static propTypes = {
		icon: React.PropTypes.string,
		source: React.PropTypes.string,
		color: React.PropTypes.string,
		borderColor: React.PropTypes.string,
		size: React.PropTypes.number,
		hoverColor: React.PropTypes.string,
		colorHtml: React.PropTypes.string,
		classNameProps: React.PropTypes.array
	}

	static defaultProps = {
		icon: 'view',
		source: 'icons/interface/',
		color: 'grey',
		hasDivider: false,
		classNameProps: ['black']
	}
	state = {
		isHovered: false,
	}

	@autobind
	doMouseOver() {
		this.setState({isHovered: true});
	}

	@autobind
	doMouseOut() {
		this.setState({isHovered: false});
	}

	render() {
		const {
			classNameProps = [],
			borderColor,
			color,
			icon,
			size
		} = this.props;
		let { source } = this.props;
		let newClassNameProps = [];
		let tempStyle;
		let tempSize = size || '100%';
		let tempOpacity = this.state.isHovered ? 0.8 : 1;

		if (icon === 'loading') {
			source = 'icons/';
		}
		if (borderColor || size) {
			tempStyle = {
				boxSizing: 'content-box !important',
				border: '2px solid' + borderColor,
				borderRadius: '50%',
				width: tempSize,
				height: tempSize,
				lineHeight: '10px',
				opacity: tempOpacity
			};
		}

		newClassNameProps = classNameProps.concat(color);
		const classes = newClassNameProps.map((classV) => styles[classV]).join(' ');
		let theIcon = require('../../images/' + source + icon + '.svg');

		return (
			<span
				style={tempStyle}
				dangerouslySetInnerHTML={{__html: theIcon}}
				onMouseOver={this.doMouseOver}
				onMouseOut={this.doMouseOut}
				className={cx(
					styles.Icon,
					classes,
					(this.state.isHovered ? styles.isHovered : '')
				)}
			/>
		);
	}
}
