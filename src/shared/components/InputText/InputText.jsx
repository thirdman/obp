import React, {Component} from 'react';
import { Icon } from 'components';
import classSet from 'react-classset';
import cx from 'classnames';

const styles = require('./InputText.scss');

export default class InputText extends Component {

	state = {
		error: null,
		hasContent: (this.props.value && this.props.value.length > 0),
		theId: this.makeId()
	}

	makeId() {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}

	doContentChange = () => {
		const { onChangeProps } = this.props;
		if (typeof onChangeProps === 'function') {
			onChangeProps(this.textInput.value || '');
		}
		// along the lines of this.props.onChangeProps();
		if (this.textInput.value.length > 0) {
			this.setState({hasContent: true});
		} else {
			this.setState({hasContent: false});
		}
	}
	validateInput = (textInput) => {
		if (!textInput) {
			this.setState({ error: 'Missing credential(s)' });
			return false;
		}
		return true;
	}

	render() {
		const {
			classNameProps = ['clean'],
			type = 'text',
			label,
			value,
			placeholder,
			hasValidation = false,
			isRequired = false,
			hasRequiredIcon = true,
			hasError = false,
			placeholderBelow = false,
			onKeyDownProps
			// onChangeProps = function() {
			//	console.error('Input text component has no default
			// function set for onCHangeProps');
			// }
		} = this.props;

		let classes = classNameProps;
		let toggleClasses;
		let iconClasses = [];
		let iconName;
		let tempStyle;

		if (hasError) {
			iconClasses = ['alert', 'red'];
			iconName = 'alert';
		} else {
			iconClasses = ['lightGrey'];
			iconName = 'cross';
		}

		toggleClasses = classSet({
			[styles.hasValidation]: hasValidation,
			[styles.isRequired]: isRequired,
			[styles.hasError]: hasError,
			[styles.placeholderBelow]: placeholderBelow
		});

		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		tempStyle = {
			backgroundColor: (this.props.backgroundColor || '')
		};

		return (
			<div
				className={cx(
					styles.InputText,
					classes,
					toggleClasses,
					(this.state.hasContent ? styles.hasContent : null))}>
				<input
					id={this.state.theId}
					type={type}
					ref={(c) => { this.textInput = c; }}
					required={isRequired}
					defaultValue={value}
					onChange={this.doContentChange}
					onKeyDown={onKeyDownProps}
					style={tempStyle}
					/>
				<label htmlFor={this.state.theId}>
					{placeholder}
				</label>
				{isRequired && hasRequiredIcon ?
					<div className={styles.requiredMarker}>
						<Icon
							classNameProps={iconClasses}
							icon={iconName}
							color="grey"
						/>
					</div>
					: null
				}
			</div>
		);
	}

	static propTypes = {
		type: React.PropTypes.string,
		label: React.PropTypes.string,
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		placeholderBelow: React.PropTypes.bool,
		hasValidation: React.PropTypes.bool,
		backgroundColor: React.PropTypes.string,
		isRequired: React.PropTypes.bool,
		hasRequiredIcon: React.PropTypes.bool,
		hasError: React.PropTypes.bool,
		onChangeProps: React.PropTypes.func,
		onKeyDownProps: React.PropTypes.func,
		classNameProps: React.PropTypes.array
	}
}