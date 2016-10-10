import React, {Component, PropTypes} from 'react';
// import { HorizontalRule } from 'components';
import classSet from 'react-classset';
import cx from 'classnames';
import {Circle, Media, Paragraph, Square, Text} from './Elements';

const styles = require('./Placeholder.scss');

export default class Placeholder extends Component {

	render() {
		const {
			classNameProps = [],
			type = 'text',
			mask = 'white'
		} = this.props;

		let classes;
		let toggleClasses;

		toggleClasses = classSet({
			[styles.type]: type,
			[styles.mask]: mask
		});
		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div className={cx(styles.Placeholder, classes, toggleClasses)} >
				{this.getPlaceholder()}
			</div>
		);
	}
	getPlaceholder() {
		const { type, mask, margin = 8 } = this.props;
		switch (type) {
			case 'paragraph':
				return (
					<Paragraph mask={mask} margin={margin} />
				);
			case 'media':
				return (
					<Media mask={mask} margin={margin} />
				);
			case 'text':
				return (
					<Text mask={mask} margin={margin} />
				);
			case 'square':
				return (
					<Square mask={mask} margin={margin} />
				);
			case 'circle':
				return (
					<Circle mask={mask} margin={margin} />
				);
			default:
				return null;
		}
	}

	static propTypes = {
		type: PropTypes.string,
		mask: PropTypes.string,
		margin: PropTypes.number
	}
}