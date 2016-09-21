/* eslint max-len: off */
import React, {Component} from 'react';
import cx from 'classnames';
import { ContentItem, Info, Statistic } from 'components';

const styles = require('./Secondary.scss');

export default class Secondary extends Component {
	static propTypes = {
		title: React.PropTypes.string,
		content: React.PropTypes.string
	}

	render() {
		const { title } = this.props;
		return (
			<div className={cx(styles.Secondary)}>
				{title ?
					<h3>{title}</h3>
					: null
				}
				<div className={styles.secondaryUpper}>
					<Statistic title="time to Option" content="2.41" units="years" hasDivider classNameProps={['isHorizontal']} />
					<Statistic title="Time to Expiry" content="3.41" units="years" hasDivider classNameProps={['isHorizontal']} />
				</div>
				<ContentItem title="Is Gareth Cool?">
					<Info content="Yes, oh yes he is" />
				</ContentItem>
			</div>
		);
	}
}
