import React, {Component} from 'react';
import cx from 'classnames';
import { ContentItem, Info, Section} from 'components';
import { Placeholder } from 'containers';

const styles = require('./Main.scss');

export default class Main extends Component {
	static propTypes = {
		title: React.PropTypes.string,
		content: React.PropTypes.string
	}

	render() {
		const { title, content } = this.props;
		return (
			<div className={cx(styles.Main)}>
				{title ?
					<h2>{title}</h2>
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
					</span>
					)
				}
			</div>
		);
	}
}
