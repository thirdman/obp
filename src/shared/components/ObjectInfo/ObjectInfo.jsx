import React, {Component} from 'react';
import { Icon, IconButton } from 'components';
import cx from 'classnames';

const styles = require('./ObjectInfo.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class ObjectInfo extends Component {

	static propTypes = {
		title: React.PropTypes.string,
		buttons: React.PropTypes.array,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
		classNameProps: React.PropTypes.array
	}

	getButtonComps() {
		const { buttons = null } = this.props;
		let buttonComps;
		// Defines the buttons if there is a buttons array:
		if (buttons) {
			buttonComps = buttons.map((button, index) => {
				return (
					<div className={styles.iconWrapper}>
						<IconButton
							key={`thebutton-${index}`}
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

	render() {
		const {
			classNameProps = [],
			title
		} = this.props;
		let classes;

		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div
				className={cx(
					styles.ObjectInfo,
					classes,
					globalStyles.row)} >
				<div className={styles.iconWrap}>
					<Icon icon="property" color="grey" />
				</div>
				<div className={styles.titleWrap}>
					<div className={styles.buttonWrap}>
						{this.getButtonComps()}
					</div>
					<h3>{title}</h3>
					<h4 className={styles.subtitle}>
						<span className={styles.objectId}>
							<span className={styles.bold}>ID:</span>122345
						</span>
						<span className={styles.objectType}>
							<span className={styles.bold}>Type:</span>Property
						</span>
					</h4>
				</div>
			</div>
		);
	}
}