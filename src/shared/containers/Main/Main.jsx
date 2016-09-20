import React, {Component} from 'react';
import cx from 'classnames';
import { ContentItem, Info, Section} from 'components';
import { Placeholder } from 'containers';

const styles = require('./Main.scss');

export default class Main extends Component {
	static propTypes = {
		title: React.PropTypes.string,
		content: React.PropTypes.string,
		objectData: React.PropTypes.object
	}

	render() {
		const { title, content, objectData } = this.props;
		const agreement = objectData;
		return (
			<div className={cx(styles.Main)}>
				{title ?
					<h2>{title}</h2>
					: null
				}
				{objectData ?
					(<span>
						<Section title="Summary of Information" classNameProps={['space']}>
							<ContentItem title="Agreement" classNameProps={['noMargin']}>
								<Info
									content={agreement.attributes.knownAs}
								/>
							</ContentItem>
						</Section>
						<Section title="Parties" hasDivider>
							<ContentItem title="Landlord id" classNameProps={['noMargin']}>
								<Info
									content={agreement.relationships.parties.Landlord.data[0].id}
								/>
							</ContentItem>
							<ContentItem title="Tenant id" classNameProps={['noMargin']}>
								<Info
									content={agreement.relationships.parties.Tenant.data[0].id}
								/>
							</ContentItem>
						</Section>
					</span>)
					: null
				}
				{content ?
					<div>{content}</div>
					:
					(
					<span>
						<Section
							title="A title here."
							description="A section to show how this page might work"
							>
							<ContentItem title="Head Doofus">
								<Info content="David Bromley" />
							</ContentItem>
							<ContentItem title="Second Doofus">
								<Info content="Kennek Hahahaha" />
							</ContentItem>
							<ContentItem title="Assistant Doofus in charge">
								<Info content="Rosey McRosio" />
							</ContentItem>
						</Section>
						<Section hasDivider title="A section with placeholder" >
							<Placeholder />
						</Section>
						<Section
							hasDivider
							title="Another section"
							description="this is a simple description"
							/>
					</span>
					)
				}
			</div>
		);
	}
}
