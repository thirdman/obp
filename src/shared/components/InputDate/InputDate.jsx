import React, { Component, PropTypes } from 'react';
import Datetime from 'react-datetime';
// import classSet from 'react-classset';
import cx from 'classnames';
// import { Icon } from 'components';

const styles = require('./InputDate.scss');

export default class InputDate extends Component {

	render() {
		const {
			classNameProps = [],
			value,
			input,
			open,
			onChange,
			onFocus,
			onBlur,
			viewMode
		} = this.props;

		let { inputProps } = this.props;
		let classes;

		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div className={cx(styles.InputDate, classes)}>
				<Datetime
					value={value}
					input={input}
					open={open}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					viewMode={viewMode}
					inputProps={inputProps}
					className={styles.dateTime}
					/>
			</div>
		);
	}

	static propTypes = {
		value: PropTypes.date,
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
