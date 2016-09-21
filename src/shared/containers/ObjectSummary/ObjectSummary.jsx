import React, {Component} from 'react';
import cx from 'classnames';
import moment from 'moment';
import { ContentItem, Info, ObjectInfo, Column, Row} from 'components';

const styles = require('./ObjectSummary.scss');

export default class ObjectSummary extends Component {
	static propTypes = {
		title: React.PropTypes.string,
		content: React.PropTypes.string,
		objectData: React.PropTypes.object
	}

	render() {
		const { title, content, objectData} = this.props;
		const agreement = objectData;
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
						<ObjectInfo
							key={'layoutHero'}
							title={agreement.attributes.knownAs}
							id={`${agreement.id}`}
							type={'agreement'}
							mode={agreement.attributes.agreementMode}
						/>
						<Row isFlex classNameProps={['hasPadding']}>
							<Column occupy={3} of={12}>
								<ContentItem title="Commencement" classNameProps={['noMargin', 'paddingLeft']}>
									<Info
										content={
											moment(Number(agreement.attributes.commencementDate)).format('DD MM YYYY')
											}
									/>
								</ContentItem>
								<ContentItem title="Expected Expiry" classNameProps={['noMargin', 'paddingLeft']}>
									<Info
										content={moment(Number(agreement.attributes.expiryDate)).format('DD MM YYYY')}
									/>
								</ContentItem>
							</Column>
							<Column occupy={3} of={12}>
								<ContentItem
									title="Total Annual Rent"
									classNameProps={['noMargin', 'paddingLeft']}
									>
									<Info content={agreement.attributes.totalAnnualRent} />
								</ContentItem>
								<ContentItem
									title="Payment Period"
									classNameProps={['noMargin', 'paddingLeft']}
									>
									<Info content={agreement.attributes.paymentPeriod} />
								</ContentItem>
							</Column>
							<Column occupy={3} of={12}>
								<ContentItem title="Created" classNameProps={['noMargin']}>
									<Info
										content={moment(Number(agreement.attributes.insertedDate)).format('DD MM YYYY')}
									/>
								</ContentItem>
								<ContentItem title="Last Updated" classNameProps={['noMargin']}>
									<Info
										content={moment(Number(agreement.attributes.updatedDate)).format('DD MM YYYY')}
									/>
								</ContentItem>
							</Column>
							<Column occupy={3} of={12} isLast>
								<ContentItem title="Tax" classNameProps={['noMargin']}>
									<Info content={agreement.attributes.taxation} />
								</ContentItem>
								<ContentItem title="Currency" classNameProps={['noMargin']}>
									<Info content={agreement.attributes.currency} />
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
