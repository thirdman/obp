import React, {Component, PropTypes} from 'react';
import classSet from 'react-classset';
import cx from 'classnames';
import { Button, Icon } from 'components';

const styles = require('./InputSelect.scss');

export default class InputSelect extends Component {

	state = {
		isOpen: false
	}

	render() {
		const {
			options = [],
			color,
			onClickProps,
			classNameProps = [],
			content,
			position
		} = this.props;
		const { isOpen } = this.state;
		let toggleClasses;
		let classes;

		toggleClasses = classSet({
			[styles.isOpen]: isOpen
		});

		classes = classNameProps.slice();
		classes = classes.concat(position);
		classes = classes.concat(color);
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		const toggleOpen = () => {
			this.setState({ isOpen: !this.state.isOpen});
		};

		const onClick = (option) => {
			return () => {
				onClickProps(option)();
				toggleOpen();
			};
		};

		return (
			<div
				onClick={onClickProps}
				className={cx(
					styles.InputSelect,
					classes,
					toggleClasses)} >
				<div className={styles.selectTrigger} onClick={toggleOpen} >
					<span className={styles.triggerContent}>
						{this.getTitleFromContent(content)}
					</span>
					<span className={styles.arrowWrap}>
						<span className={styles.iconWrap}>
							<Icon
								icon={isOpen ? 'chevron-up' : 'chevron-down'}
								color={color === 'white' ? 'blue' : 'white'}
							/>
						</span>
					</span>
					{isOpen && options.length &&
						<div className={styles.actionItems}>
							{options.map((option, index) => (
								<Button
									key={`option-${index}`}
									content={option.title ? option.title : option}
									classNameProps={['btn', 'text', 'actionItem']}
									onClickProps={onClick(option.value)}
									helpContent={option.helpContent || null} />
							))}
						</div>
					}
				</div>
			</div>
		);
	}

	getTitleFromContent() {
		const { content, options } = this.props;
		if (!content) { return 'Select...'; }
		for (let i = 0; i < options.length; i++) {
			if (options[i].value === content) {
				return options[i].title;
			}
		}
	}

	static propTypes = {
		options: PropTypes.array,
		color: PropTypes.string,
		isOpen: PropTypes.bool,
		classNameProps: PropTypes.array,
		position: PropTypes.string,
		btnClassNameProps: PropTypes.array,
		onClickProps: PropTypes.func
	}
}