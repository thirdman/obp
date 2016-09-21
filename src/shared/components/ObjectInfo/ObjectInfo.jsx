import React, {Component} from 'react';
import { Icon, IconButton } from 'components';
import cx from 'classnames';

const styles = require('./ObjectInfo.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class ObjectInfo extends Component {

	static propTypes = {
		title: React.PropTypes.string,
		id: React.PropTypes.string,
		type: React.PropTypes.string,
		mode: React.PropTypes.string,
		display: React.PropTypes.string,
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
			title,
			type = 'property',
			mode,
			display = 'large',
			id
		} = this.props;
		let classes;

		classes = classNameProps.slice();
		classes = classes.concat(display || '');
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div
				className={cx(
					styles.ObjectInfo,
					classes,
					globalStyles.row)} >
				<div className={styles.iconWrap}>
					<Icon icon={type} color={!mode === 'Inactive' ? 'grey' : 'lightGrey'} />
				</div>
				<div className={styles.titleWrap}>
					<div className={styles.buttonWrap}>
						{this.getButtonComps()}
					</div>
					<h3>{title}{mode === 'Inactive' ? ' (Inactive)' : null}</h3>
					<h4 className={styles.subtitle}>
						<span className={styles.objectId}>
							<span className={styles.bold}>ID:</span> {id}
						</span>
						<span className={styles.objectType}>
							<span className={styles.bold}> Type:</span> {type}
						</span>
						<span className={styles.objectType}>
							<span className={styles.bold}> Mode:</span> {mode}
						</span>
					</h4>
				</div>
			</div>
		);
	}
}