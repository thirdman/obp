import React, {Component} from 'react';
import { Icon, IconButton } from 'components';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';

const styles = require('./ObjectInfo.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class ObjectInfo extends Component {
	state = {
		isHovered: false
	}

	getButtonComps() {
		const { buttons = null } = this.props;
		let buttonComps;
		// Defines the buttons if there is a buttons array:
		if (buttons) {
			buttonComps = buttons.map((button, index) => {
				return (
					<div
						className={styles.iconWrapper}
						key={`theBtnIcon-${index}`}
					>
						<IconButton
							key={`btn-${index}`}
							id={`thebtn-${index}`}
							icon={button.icon.icon}
							text={button.text}
							helpText={button.helpText}
							iconColor={button.icon.color || 'grey'}
							hoverIconColor={button.icon.hoverColor || 'lightGrey'}
							classNameProps={button.icon.classNameProps} />
					</div>
				);
			});
		}
		return buttonComps;
	}
	getAdditionalContent() {
		const { additionalContent } = this.props;
		if (additionalContent) {
			return (
				<div>{additionalContent}</div>
			);
		}
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
			title,
			type = 'property',
			subType,
			imageUrl,
			mode,
			display = 'large',
			id
		} = this.props;
		let classes;
		let motionStyle;
		const springConfig = {stiffness: 300, damping: 23};

		classes = classNameProps.slice();
		classes = classes.concat(display || '');
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		motionStyle = {
			y: spring((this.state.isHovered ? -4 : 0), springConfig),
		};
		return (
		<Motion style={motionStyle}>
			{({y}) => (
			<div
				className={cx(
					styles.ObjectInfo,
					classes,
					globalStyles.row)}
				onMouseOver={this.doMouseOver()}
				onMouseOut={this.doMouseOut()}
				style={{
						WebkitTransform: `translate3d(0, ${y}px, 0)`,
						transform: `translate3d(0, ${y}px, 0)`
					}}
				>
				<div className={styles.iconWrap}>
				{type === 'custom' ?
					<img src={imageUrl} alt={title} />
				:
					<Icon icon={type} color={!mode === 'Inactive' ? 'grey' : 'lightGrey'} />
				}
				</div>
				<div className={styles.titleWrap}>
					<div className={styles.buttonWrap}>
						{this.getButtonComps()}
					</div>
					<div className={styles.additionalContent}>
						{this.getAdditionalContent()}
					</div>
					<h3>{title}{mode === 'Inactive' ? ' (Inactive)' : null}</h3>
					<h4 className={styles.subtitle}>
						{id ?
							<span className={styles.objectId}>
								<span className={styles.bold}>ID:</span> {id}
							</span>
						: null
						}
						{type && type !== 'custom' ?
							<span className={styles.objectType}>
								<span className={styles.bold}> Type:</span> {type}
							</span>
						: null
						}
						{subType ?
							<span className={styles.objectSubType}>
								{subType}
							</span>
						: null
						}
						{mode ?
							<span className={styles.objectType}>
								<span className={styles.bold}> Mode:</span> {mode}
							</span>
						: null
						}
					</h4>
				</div>
			</div>
			)}
			</Motion>
		);
	}
	static propTypes = {
		title: React.PropTypes.string,
		id: React.PropTypes.string,
		type: React.PropTypes.string,
		subType: React.PropTypes.string,
		imageUrl: React.PropTypes.string,
		mode: React.PropTypes.string,
		display: React.PropTypes.string,
		buttons: React.PropTypes.array,
		// additionalContent: React.PropTypes.string,
		additionalContent: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node,
			React.PropTypes.string
		]),
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
		classNameProps: React.PropTypes.array
	}
}