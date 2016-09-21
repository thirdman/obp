import { Component } from 'react';
import { Overview } from 'layouts';
import { Column, Row, SubNavWrap, Section } from 'components';
import { Header } from 'containers';

// const globalStyles = require('../App/App.scss');
const styles = require('./DevHome.scss');

export default class DevIcons extends Component {
	render() {
		// const { location } = this.props;
		return (
			<Overview>
				<Header key={'layoutHeader'} title="Developers" />
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={0}
					listData={[
						{label: 'Dev Home', link: '/dev'},
						{label: 'Documentation', link: '/dev/docs'},
						{label: 'Icons', link: '/dev/icons'}
					]}
				/>
				<div key={'layoutMain'} className={styles.DevHome}>
					<Section title="Links" type="section">
						<Row>
							<Column occupy="4" of="12">
								<h4>Documentation</h4>
								<a link="sdf">Front end</a>
								<a link="sdf">`Api (whiteboard)`</a>
								<a link="sdf">Icons</a>
								<a link="github">Github</a>
							</Column>
							<Column occupy="4" of="12">
								<h4>Servers</h4>
								<a link="https://dev-api.nomosone.com">dev-api</a>
								<a link="https://test-api.nomosone.com">test-api</a>
								<a link="https://api.nomosone.com">prod: api</a>
								<a link="https://test-app.nomosone.com">test-app</a>
								<a link="https://app.nomosone.com">prod: app</a>
							</Column>
							<Column occupy="4" of="12">
								<h4>Integrations</h4>
								<a link="https://xero.com">Xero</a>
							</Column>
						</Row>
					</Section>
					<Section title="Status" hasDivider>
						<Row>
							<Column occupy="12">
								<h3>Status</h3>
							</Column>
							<div>status will be here</div>
						</Row>
					</Section>
					<Section title="Statistics" hasDivider>
						<Row>
							<div>
								Active users, endpoints accessed,
								pageviews, events progressed, popular pages
							</div>
						</Row>
					</Section>
				</div>
				<div key={'layoutSecondary'}>
					Reports will be here.
				</div>
			</Overview>
		);
	}
}
