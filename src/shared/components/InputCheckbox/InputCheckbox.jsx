import React, { Component } from 'react';
import cx from 'classnames';
import { Icon } from 'components';

const styles = require('./InputCheckbox.scss');

export default class InputText extends Component {

// const InputCheckbox = ({ isSelected, value, onChangeProps }) => (
	state = {
		theId: this.makeId()
	}

	render() {
		const {
			isSelected,
			value,
			// onChangeProps
		} = this.props;
		return (
			<span
				className={cx(
					styles.InputCheckbox,
					(isSelected ? styles.selected : ''))}
					// onClick={this.doChange}
			>
				<span className={styles.radioIcon} onClick={this.doChange}>
					<Icon
						icon={isSelected ? 'checkbox-selected' : 'checkbox-unselected'}
						classNameProps={['normal']}
					/>
				</span>
				<input
					value={value}
					id={this.state.theId}
					type={'checkbox'}
					className={styles.radio}
					checked={isSelected}
					onChange={this.doChange}
				/>
				<label htmlFor={this.state.theId}>{value}</label>
			</span>
		);
	}

	static propTypes = {
		isSelected: React.PropTypes.bool,
		value: React.PropTypes.string,
		onChangeProps: React.PropTypes.func
	};

	doChange = () => {
		console.log('clicked');
		// this.setState({isSelected: !this.state.isSelected});
		this.props.onChangeProps();
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