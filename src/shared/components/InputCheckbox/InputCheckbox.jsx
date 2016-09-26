import React from 'react';
import cx from 'classnames';
import { Icon } from 'components';

const styles = require('./InputCheckbox.scss');

const InputCheckbox = ({ isSelected, value }) => (
	<span
		className={cx(
			styles.InputCheckbox,
			(isSelected ? styles.selected : ''))}
	>
		<span className={styles.radioIcon} >
			<Icon
				icon={isSelected ? 'checkbox-selected' : 'checkbox-unselected'}
				classNameProps={['normal']}
			/>
		</span>
		<input
			value={value}
			id={'a123'}
			type={'checkbox'}
			className={styles.radio}
			checked={isSelected}
			onChange={() => { console.log('clicked!'); }}
		/>
		<label htmlFor={'a123'}>{value}</label>
	</span>
);

InputCheckbox.propTypes = {
	isSelected: React.PropTypes.bool,
	value: React.PropTypes.string
};

export default InputCheckbox;