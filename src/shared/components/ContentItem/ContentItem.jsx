import React, {Component} from 'react';
import { Icon, QuickView, Message } from 'components';
import classSet from 'react-classset';
import cx from 'classnames';

const styles = require('./ContentItem.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class ContentItem extends Component {

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
			helpSize = 300,
			columnSize = 12,
			hasValidation = false,
			isRequired = false,
			hasDivider = false,
			hasBorder = false,
			hasBackground = false,
			validationError = false,
			validationMissing = false
			} = this.props;

		const theContent = '';
		let toggleClasses;
		let classes;
		let theMessageType;
		let theMessageContent;
		let iconName;
		let iconClasses;

		toggleClasses = classSet({
			hasValidation,
			isRequired,
			hasDivider,
			hasBorder,
			hasBackground,
			validationError,
			validationMissing
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
					<div className={styles.helpIconWrap}>
						<QuickView content={helpContent} size={helpSize} align="right">
							<Icon icon="question" classNameProps={['grey']} size={16} />
						</QuickView>
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
