import React, { Component, PropTypes } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
// import classSet from 'react-classset';
import cx from 'classnames';
import { Button } from 'components';

	const styles = require('./InputDate.scss');

	export default class InputDate extends Component {

		state={
			isOpen: this.props.open,
			tempDate: moment(),
			setDate: moment()
		}

	render() {
		const {
			classNameProps = [],
			dateFormat = 'DD MMM, YYYY',
			// value,
			input,
			// open,
			onChange,
			onFocus,
			onBlur,
			viewMode = 'months'
		} = this.props;

		let { inputProps } = this.props;
		let classes;
		// let theDatePicker = this.DatePicker;

		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div className={cx(styles.InputDate, classes)}>
				<Datetime
					ref={(c) => { this.DatePicker = c; }}
					// value={value || this.state.tempDate}
					dateFormat={dateFormat}
					input={input}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					viewMode={viewMode}
					inputProps={inputProps}
					className={styles.dateTime}
					/>
					<div className={styles.rangeSelect} >
						<span className={styles.rangeTrigger} onClick={this.onToggleAdd()}>add...</span>
					</div>
					{this.state.isOpen ?
						<div className={styles.rangeContent}>
							<Button
								type="text"
								content={'One Day'}
								classNameProps={['actionItem']}
								onClickProps={this.onAddDay()}
							/>
							<Button
								type="text"
								content={'One Month'}
								classNameProps={['actionItem']}
								onClickProps={this.onAddMonth()}
							/>
							<Button
								type="text"
								content={'One Year'}
								classNameProps={['actionItem']}
								onClickProps={this.onAddYear()}
							/>
						</div>
					: null
					}
			</div>
		);
	}

	onToggleAdd() {
		console.log('clicked');
		return () => {
			this.setState({
				isOpen: !this.state.isOpen
			});
		};
	}

	onAddDay() {
		let theDatepicker = this.DatePicker;
		console.log(theDatepicker.state);
		// console.log(theDatepicker.state.selectedDate);
		console.log('the inputdate is ', theDatepicker.state.inputValue);
		let sourceValue = theDatepicker.state.inputValue;
		let computedValue = moment(sourceValue).add(1, 'day');
		return () => {
			theDatepicker.state.inputValue = computedValue.format(theDatepicker.state.inputFormat);
			this.setState({
				tempDate: computedValue.format(theDatepicker.state.inputFormat)
			});
		};
	}

	onAddMonth() {
		let theDatepicker = this.DatePicker;
		let sourceValue = theDatepicker.state.inputValue;
		let computedValue = moment(sourceValue).add(1, 'month');
		return () => {
			theDatepicker.state.inputValue = computedValue.format(theDatepicker.state.inputFormat);
			this.setState({
				tempDate: computedValue.format(theDatepicker.state.inputFormat)
			});
		};
	}

	onAddYear() {
		let theDatepicker = this.DatePicker;
		let sourceValue = theDatepicker.state.inputValue;
		let computedValue = moment(sourceValue).add(1, 'year');
		return () => {
			theDatepicker.state.inputValue = computedValue.format(theDatepicker.state.inputFormat);
			this.setState({
				tempDate: computedValue.format(theDatepicker.state.inputFormat)
			});
		};
	}


// not working...
// the api says there's a openCalendar() function. hmmm
/*
	toggleDatePicker() {
			console.log('this.DatePicker is ', this.DatePicker);
		return () => {
			this.DatePicker.openCalendar();
			this.setState({
				isOpen: !this.state.isOpen
			});
		};
	}
*/

	static propTypes = {
		// value: PropTypes.date,
		input: PropTypes.bool,
		open: PropTypes.bool,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		viewMode: PropTypes.string,
		inputProps: PropTypes.object,
		classNameProps: PropTypes.array
	}
}
