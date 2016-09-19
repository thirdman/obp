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
								<ContentItem title="Total rent" hasDivider>
									<Info content="$1245" />
								</ContentItem>
								<ContentItem title="Monthly Rent" hasDivider>
									<Info content="$103" />
								</ContentItem>
								<ContentItem title="Payment Date" hasDivider>
									<Info content="1st monday of each month" />
								</ContentItem>
							</Column>
							<Column occupy={4} of={12}>
								<ContentItem title="next event date" hasDivider>
									<Info content="12 Jan 2014" />
								</ContentItem>
								<ContentItem title="Next event" hasDivider>
									<Info content="Rent Review" />
								</ContentItem>
								<ContentItem title="Event status" hasDivider>
									<Info content="Upcoming" />
								</ContentItem>
							</Column>
							<Column occupy={4} of={12} isLast>
								<ContentItem title="Matter references" hasDivider>
									<Info content="Khanh, Is, Cool" />
								</ContentItem>
								<ContentItem title="Agreement Id" hasDivider>
									<Info content="12345" />
								</ContentItem>
								<ContentItem title="Organisation" hasDivider hasBackground>
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
