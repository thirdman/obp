import React, {Component} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classSet from 'react-classset';
import cx from 'classnames';
import { Icon } from 'components';

const styles = require('./InputTextarea.scss');

export default class InputTextarea extends Component {

	state = {
		hasError: null,
		rows: 3,
		hasContent: (this.props.value && this.props.value.length > 0),
		theId: this.makeId()
	}

	render() {
		const {
			classNameProps = [],
			label,
			value,
			type,
			rows = 3,
			maxRows,
			placeholder,
			isRequired = false,
			hasValidation = false,
			hasRequiredIcon = true,
			hasError = false,
			onKeyDownProps,
			// onChangeProps,
			} = this.props;

		let classes = classNameProps;
		let toggleClasses;
		let iconClasses = [];
		let iconName;

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
			[styles.type]: type
		});
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div
				className={cx(styles.InputTextarea,
					classes,
					toggleClasses,
					(this.state.hasContent ? styles.hasContent : null))
				}
			>
				{/* for additional props, see https://github.com/andreypopp/react-textarea-autosize */}
				<TextareaAutosize
					id={this.state.theId}
					type={type}
					ref={(c) => { this.textInput = c; }}
					required={isRequired}
					defaultValue={value}
					minRows={rows}
					maxRows={maxRows}
					className={styles.textarea}
					onChange={this.doContentChange}
					onKeyDown={onKeyDownProps}
				/>
				<label htmlFor={this.state.theId}>{placeholder}</label>
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
		rows: React.PropTypes.number,
		maxRows: React.PropTypes.number,
		label: React.PropTypes.string,
		type: React.PropTypes.string,
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		hasValidation: React.PropTypes.bool,
		isRequired: React.PropTypes.bool,
		hasError: React.PropTypes.bool,
		onResize: React.PropTypes.func,
		classNameProps: React.PropTypes.array,
		onKeyDownProps: React.PropTypes.func,
		onChangeProps: React.PropTypes.func
	};

	doContentChange = () => {
		if (this.textInput.value.length > 0) {
			this.setState({hasContent: true});
		} else {
			this.setState({hasContent: false});
		}
	}

	makeId() {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}
}