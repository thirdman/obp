import React from 'react';
import cx from 'classnames';

const styles = require('./InputRadio.scss');

const InputRadio = ({ isSelected, value }) => (
	<span
		className={cx(
			styles.InputRadio,
			(isSelected ? styles.selected : ''))}
	>
		<span className={styles.radioIcon} />
		<input
			value={value}
			id={'a123'}
			ref={value}
			type={'radio'}
			className={styles.radio}
			checked={isSelected}
		/>
		<label htmlFor={'a123'}>{value}</label>
	</span>
);

InputRadio.propTypes = {
	isSelected: React.PropTypes.bool,
	value: React.PropTypes.string
};

export default InputRadio;