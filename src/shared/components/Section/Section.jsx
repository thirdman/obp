import React, {Component} from 'react';
import { Icon, HorizontalRule } from 'components';
import classSet from 'react-classset';
import cx from 'classnames';

const styles = require('./Section.scss');
// const globalStyles = require('../../pages/App/App.scss');

export default class Section extends Component {

	static propTypes = {
		type: React.PropTypes.string,
		title: React.PropTypes.string,
		subtitle: React.PropTypes.string,
		description: React.PropTypes.string,
		hasDivider: React.PropTypes.bool,
		hasBackground: React.PropTypes.bool,
		hasBorder: React.PropTypes.bool,
		isLoading: React.PropTypes.bool,
		isError: React.PropTypes.bool,
		loadingMessage: React.PropTypes.string,
		styleProps: React.PropTypes.object,
		classNameProps: React.PropTypes.array,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		])
	};

	render() {
		const {
			type = 'section',
			title,
			subtitle,
			description,
			hasDivider,
			hasBackground,
			hasBorder,
			isLoading,
			loadingMessage,
			isError,
			classNameProps = [],
			styleProps,
			children
			} = this.props;

		let toggleClasses;
		let classes;

		toggleClasses = classSet({
			[styles.isLoading]: isLoading,
			[styles.isError]: isError,
			[styles.hasDivider]: hasDivider,
			[styles.hasBackground]: hasBackground,
			[styles.hasBorder]: hasBorder
		});

		classes = classNameProps.slice();
		classes = classes.concat(type);
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');
		return (
			<div className={cx(styles.Section, classes, toggleClasses)} style={styleProps}>
					<div className={styles.loadingContent}>
						<div className={styles.loadingIconWrap}>
							<Icon icon="loading" color="grey" size={18} />
						</div>
					</div>
				{isError ?
					<div className={styles.iconWrap + ' ' + styles.errorIcon}>
						<Icon icon="alert" color="red" />
					</div>
					: null
				}
				{loadingMessage ?
					<div className={styles.loadingMessage}>
						{loadingMessage }
					</div>
					: null
				}
				{hasDivider ?
					<HorizontalRule classNameProps={['normal']} />
					: null
				}
				{title ?
					<h3 className={styles.contentTitle}>{title}</h3>
					: null
				}
				{subtitle ?
					<h4 className={styles.contentSubtitle}>{subtitle}</h4>
					: null
				}
				{description ?
					<div className={styles.contentDescription}>{description}</div>
					: null
				}
				{!isError ? children : null}
			</div>
		);
	}
}
