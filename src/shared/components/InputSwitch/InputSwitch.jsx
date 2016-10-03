import React, {Component, PropTypes} from 'react';
import classSet from 'react-classset';
import cx from 'classnames';
// import { Icon } from 'components';

const styles = require('./InputSwitch.scss');

export default class InputSwitch extends Component {

	state = {
		uniqueId: this.makeId()
	}

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
			onChange,
			content = ['yes', 'no'],
			isSelected = false
		} = this.props;
		let toggleClasses;
		let classes;
		const { uniqueId } = this.state;

		toggleClasses = classSet({
			[styles.isSelected]: isSelected
		});

		classes = classNameProps.slice();
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div className={cx(styles.InputSwitch, classes, toggleClasses)} onChange={onChange}>
				<input
					type="checkbox"
					className={styles.switchCheckbox}
					defaultChecked={!!this.props.isSelected}
					id={uniqueId}
					/>
				<label className={styles.switchLabel} htmlFor={uniqueId}>
					<div className={styles.switchInner}>
						<div className={styles.contentLeft}>{content ? content[0] : 'YES'}</div>
						<div className={styles.contentRight}>{content ? content[1] : 'NO'}</div>
					</div>
					<div className={styles.switchSwitch} />
				</label>
			</div>
		);
	}

	static propTypes = {
		classNameProps: PropTypes.array,
		onChange: PropTypes.func,
		content: PropTypes.array,
		isSelected: PropTypes.bool
	};
}
