import React, {Component} from 'react';
import cx from 'classnames';
import { ContentItem, Info, ObjectInfo, Column, Row} from 'components';

const styles = require('./ObjectSummary.scss');

export default class ObjectSummary extends Component {
	static propTypes = {
		title: React.PropTypes.string,
		content: React.PropTypes.string
	}

	render() {
		const { title, content } = this.props;
		return (
			<div className={cx(styles.ObjectSummary)}>
				{title ?
					<h3>{title}</h3>
					: null
				}
				{content ?
					<div>{content}</div>
					:
					(
					<span>
						<ObjectInfo key={'layoutHero'} title="This is a test title" />
						<Row isFlex classNameProps={['hasPadding']}>
							<Column occupy={4} of={12}>
								<ContentItem
									title="Total rent"
									classNameProps={['noMargin', 'paddingLeft']}
									>
									<Info content="$1245" />
								</ContentItem>
								<ContentItem
									title="Monthly Rent"
									classNameProps={['noMargin', 'paddingLeft']}
									>
									<Info content="$103" />
								</ContentItem>
								<ContentItem
									title="Payment Date"
									classNameProps={['noMargin', 'paddingLeft']}
									>
									<Info content="1st monday of each month" />
								</ContentItem>
							</Column>
							<Column occupy={4} of={12}>
								<ContentItem title="next event date" classNameProps={['noMargin']}>
									<Info content="12 Jan 2014" />
								</ContentItem>
								<ContentItem title="Next event" classNameProps={['noMargin']}>
									<Info content="Rent Review" />
								</ContentItem>
								<ContentItem title="Event status" classNameProps={['noMargin']}>
									<Info content="Upcoming" />
								</ContentItem>
							</Column>
							<Column occupy={4} of={12} isLast>
								<ContentItem title="Matter references" classNameProps={['noMargin']}>
									<Info content="Khanh, Is, Cool" />
								</ContentItem>
								<ContentItem title="Agreement Id" classNameProps={['noMargin']}>
									<Info content="12345" />
								</ContentItem>
								<ContentItem title="Organisation" classNameProps={['noMargin']}>
									<Info content="Dee bee company" />
								</ContentItem>
							</Column>
						</Row>
					</span>
					)
				}
			</div>
		);
	}
}
