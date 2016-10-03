import React, {Component} from 'react';
import cx from 'classnames';

import { Button } from 'components';

const styles = require('./ButtonGroup.scss');

export default class ButtonGroup extends Component {

	render() {
		const {
			options,
			selected,
			hasData = false,
			onClickProps = function () {
				console.log('Hey! NULL ButtonGroup onclickProps. you should probably do something about that.'); // eslint-disable-line max-len
			},
			classNameProps,
			optionData = [{
				name: 'match',
				title: 'Match Entities',
				subtitle: '(between Xero and Nomos One)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'Users who have been using both Xero and Nomos for a while and have existing entities in each.', // eslint-disable-line max-len
				classes: ['hero']
			}, {
				name: 'import',
				title: 'Import Xero Contacts',
				subtitle: '(from Xero to Nomos one)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'Users are new to Nomos One and have been using Xero for a while',
				classes: ['hero']
			}, {
				name: 'export',
				title: 'Export Nomos One Entities',
				subtitle: '(from Nomos One to Xero)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'users are new to Nomos One and have been using Xero for a while',
				classes: ['hero']
			}],
			} = this.props;

		let theData;
		let classes = classNameProps;

		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		if (hasData && optionData) {
			theData = optionData.map((option, index) => (
				<div
				key={`option-${index}`}
				className={styles.optionItem}
				onClick={onClickProps(option.onClickReturn)}
				>
					<Button classNameProps={['large', 'highlighted']} content={option.title}>
						<span className={styles.subcontent}>{option.subcontent}</span>
					</Button>
					{option.descriptionTitle ?
						<h4>{option.descriptionTitle}</h4>
						: null
					}
					{option.description ?
						<p>{option.description}</p>
						: null
					}
				</div>
			));
		}

		return (
			<div className={cx(styles.ButtonGroup, classes, (theData ? styles.hero : ''))}>
				{hasData ? theData : null}
				{!theData && options.length && options.map((option, index) => {
					let lowerCasedOption = option.toLowerCase();
					return (
						<span
							key={`option-${index}`}
							onClick={onClickProps(option)}
							className={
								cx(styles.Button,
								`icon-${lowerCasedOption}`,
								(selected === option ? styles.selected : ''))
								}>
							<span>{option}</span>
						</span>
					);
				}) || null}
			</div>
		);
	}
	static propTypes = {
		options: React.PropTypes.array,
		hasData: React.PropTypes.bool,
		optionData: React.PropTypes.array,
		onClickProps: React.PropTypes.func,
		selected: React.PropTypes.string,
		classNameProps: React.PropTypes.array,
	};
}