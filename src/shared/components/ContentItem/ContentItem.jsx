import React, {Component} from 'react';
import { Icon, Message } from 'components';
import classSet from 'react-classset';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';

const styles = require('./ContentItem.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class ContentItem extends Component {
	state = {
		tooltip: this.makeId()
	}

	static propTypes = {
		type: React.PropTypes.string,
		title: React.PropTypes.string,
		description: React.PropTypes.string,
		units: React.PropTypes.string,
		hasValidation: React.PropTypes.bool,
		isValid: React.PropTypes.bool,
		isRequired: React.PropTypes.bool,
		hasDivider: React.PropTypes.bool,
		hasBorder: React.PropTypes.bool,
		hasBackground: React.PropTypes.bool,
		hasPadding: React.PropTypes.bool,
		validationError: React.PropTypes.bool,
		validationMissing: React.PropTypes.bool,
		validationMessageError: React.PropTypes.string,
		validationMessageMissing: React.PropTypes.string,
		helpContent: React.PropTypes.string,
		helpId: React.PropTypes.number,
		helpSize: React.PropTypes.number,
		columnSize: React.PropTypes.number,
		icon: React.PropTypes.string,
		preText: React.PropTypes.string,
		postText: React.PropTypes.string,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
		classNameProps: React.PropTypes.array
	};

	makeId() {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}


	render() {
		const {
			classNameProps = [],
			title,
			description,
			preText,
			postText,
			units,
			icon,
			helpContent,
			// helpId,  // for use when we link to a help api
			columnSize = 12,
			hasValidation = false,
			isRequired = false,
			hasDivider = false,
			hasBorder = false,
			hasBackground = false,
			hasPadding = true,
			validationError = false,
			validationMissing = false
			} = this.props;

		const theContent = '';
		const { tooltip } = this.state;
		let toggleClasses;
		let classes;
		let theMessageType;
		let theMessageContent;
		let iconName;
		let iconClasses;

		toggleClasses = classSet({
			[styles.hasValidation]: hasValidation,
			[styles.isRequired]: isRequired,
			[styles.hasDivider]: hasDivider,
			[styles.hasBorder]: hasBorder,
			[styles.hasBackground]: hasBackground,
			[styles.hasPadding]: hasPadding,
			[styles.validationError]: validationError,
			[styles.validationMissing]: validationMissing
		});

		classes = classNameProps.slice();

		if (columnSize) {
			if (columnSize === 6) {
				classes = classes.concat('sixCol');
			}
			if (columnSize === 4) {
				classes = classes.concat('fourCol');
			}
			if (columnSize === 8) {
				classes = classes.concat('eightCol');
			}
		}
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		if (this.props.validationError) {
			theMessageType = 'error';
		}
		if (this.props.validationMissing) {
			theMessageType = 'question';
		}
		if (this.props.validationError) {
			// console.log('validationMessageError: ', this.props.validationMessageError);
			theMessageContent = this.props.validationMessageError;
		}
		if (this.props.validationMissing) {
			// console.log('validationMessageMissing: ', this.props.validationMessageMissing);
			theMessageContent = this.props.validationMessageMissing;
		}
		if (this.props.isRequired) {
			iconClasses = ['lightGrey'];
			iconName = 'tick-circle';
		}
		if (this.props.isValid) {
			iconClasses = ['green'];
			iconName = 'tick-circle';
		}

		return (
			<div className={cx(styles.ContentItem, classes, toggleClasses)}>
				{ hasValidation ?
					<Message
						messageType={theMessageType}
						classNameProps={['contentItem']}
						content={theMessageContent}
						/>
					: null
				}
				{	helpContent ?
					<div
					className={styles.helpIconWrap}
						data-tip={helpContent || null}
						data-class={styles.tooltip}
						data-for={`ButtonTooltip${tooltip}`}
					>
							<Icon icon="question" classNameProps={['grey']} size={16} />
							<ReactTooltip id={`ButtonTooltip${tooltip}`} type="light">
								{helpContent}
							</ReactTooltip>
					</div>
					: null
				}
				{ title ?
					(<div className={globalStyles.subtitle}>
						{	icon ? <span className={styles.icon} /> : null }
						{title}
						{isRequired ?
							<div className={styles.requiredMarker}>
								<Icon classNameProps={iconClasses} icon={iconName} color="grey" />
							</div>
							: null
						}
					</div>)
					: null
				}
				{ description ?
					<p className={styles.description}>{this.props.description}</p>
					: null
				}
				<span className={styles.inputWrapper}>
					{ preText ?
						<span className={styles.preText}>{preText}</span>
						: null
					}
					{ units ?
						<span className={styles.units}>{units}</span>
						: null
					}
					{ postText ?
						<span className={styles.postText}>{postText}</span>
						: null
					}
					{this.props.children ?
						this.props.children
						:
						theContent
					}
				</span>
			</div>
		);
	}
}
