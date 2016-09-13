import React, { Component } from 'react';
import { Icon } from 'components';
import cx from 'classnames';

const styles = require('./QuickView.scss');

export default class QuickView extends Component {
	static propTypes = {
		content: React.PropTypes.string,
		title: React.PropTypes.string,
		align: React.PropTypes.string,
/*
// will be used when we have organisation/user/agreement/event/property versions of the quickview
*/
		// viewType: React.PropTypes.string,
		hasCloseButton: React.PropTypes.bool,
		showInfo: React.PropTypes.bool,
		size: React.PropTypes.number,
		childWidth: React.PropTypes.number,
		classNameProps: React.PropTypes.array,
		onClickProps: React.PropTypes.func,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		])
	};

	static defaultProps = {
		// viewType: 'normal',
		size: 100,
		showInfo: false,
		hasCloseIcon: false
	};

	state = {
		showInfo: this.props.showInfo,
		childWidth: this.props.childWidth
	}
	showInfo() {
    this.setState({ showInfo: true });
  }
  hideInfo() {
    this.setState({ showInfo: false });
  }

	render() {
		const {
			classNameProps = [],
			content,
			childWidth,
			title,
			hasCloseButton,
			size,
			align,
			onClickProps
			} = this.props; // , viewType
		const classes = classNameProps.map((classV) => styles[classV]).join(' ');
		const showInfo = this.state.showInfo ? styles.showInfo : '';
		let theAlignClass;
		let marginSize = '-' + (size / 2) + 'px';
		if (childWidth && !size) {
			marginSize = '-' + (childWidth / 2) + 'px';
		}
		const tempStyles = {
			width: size + 'px',
			marginLeft: marginSize
		};
		if (align === 'right' || align === 'Right') {
			theAlignClass = styles.alignRight;
		}
		if (align === 'left' || align === 'Left') {
			theAlignClass = styles.alignLeft;
		}

		return (
			<div
				className={cx(
						styles.QuickView,
						classes,
						showInfo,
						(align ? theAlignClass : '')
				)}
				onClick={onClickProps}
				onMouseOver={this.showInfo}
        onMouseLeave={this.hideInfo}
        style={tempStyles}
        >
				<div className={styles.viewContent} style={tempStyles}>
					{title ? <h4 className={styles.subtitle}>{title}</h4> : null}
					{content}<div className={styles.triangle} /></div>
						{	hasCloseButton ?
							<Icon icon="close" classNameProps={['grey']} />
							: null
						}
						{this.props.children ?
							this.props.children
							:
							<Icon icon="question" classNameProps={['grey']} />
						}
			</div>
		);
	}
}