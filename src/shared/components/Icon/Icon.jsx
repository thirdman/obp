import React, { Component } from 'react';
import cx from 'classnames';

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

	doMouseOver() {
		this.setState({isHovered: true});
	}

	doMouseOut() {
		this.setState({isHovered: false});
	}

 render() {
		const { classNameProps = [], borderColor, color, icon, size} = this.props;
		// colorHtml, hoverColor,
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
			className={cx(
					styles.Icon,
					classes,
					(this.state.isHovered ? styles.isHovered : '')
			)}
			style={tempStyle}
			dangerouslySetInnerHTML={{__html: theIcon}}
			onMouseOver={this.doMouseOver}
			onMouseOut={this.doMouseOut}
		/>
   );
 }
}
