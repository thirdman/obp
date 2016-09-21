import { Component } from 'react';
import { Overview } from 'layouts';
import { autobind } from 'core-decorators';
import { browserHistory } from 'react-router';
import { Column, Row, SubNavWrap, Section } from 'components';
import { Header } from 'containers';


// const globalStyles = require('../App/App.scss');
const styles = require('./DevHome.scss');

export default class DevIcons extends Component {
	@autobind
	onClick(link) {
		return () => {
			browserHistory.push(link);
		};
	}

	render() {
		// const { location } = this.props;
		return (
			<Overview>
				<Header key={'layoutHeader'} title="Developers" />
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={0}
					listData={[
						{label: 'Dev Home', href: '/dev'},
						{label: 'Documentation', href: '/dev/docs'},
						{label: 'Icons', href: '/dev/icons'}
					]}
				/>
				<div key={'layoutMain'} className={styles.DevHome}>
					<Section title="Links" type="section">
						<div>NOTE: most of these links dont work yet!</div>
						<Row>
							<Column occupy="4" of="12">
								<h4>Documentation</h4>
								<span onClick={this.onClick('/dev/docs')} className={styles.link}>
									Component Docs
								</span>
								<span onClick={this.onClick('/dev/whiteboard')} className={styles.link}>
									Api (whiteboard)
								</span>
								<span onClick={this.onClick('/dev/icons')} className={styles.link}>Icons</span>
								<span onClick={this.onClick('https://github.com/NomosAdmin/')} className={styles.link}>Github</span>
							</Column>
							<Column occupy="4" of="12">
								<h4>Servers</h4>
								<span onClick={this.onClick('https://dev-api.nomosone.com')} className={styles.link}>dev-api</span>
								<span onClick={this.onClick('https://test-api.nomosone.com')} className={styles.link}>test-api</span>
								<span onClick={this.onClick('https://api.nomosone.com')} className={styles.link}>prod: api</span>
								<span onClick={this.onClick('https://test-app.nomosone.com')} className={styles.link}>test-app</span>
								<span onClick={this.onClick('https://app.nomosone.com')} className={styles.link}>prod: app</span>
							</Column>
							<Column occupy="4" of="12">
								<h4>Integrations</h4>
								<span onClick={this.onClick('https://xero.com')} className={styles.link}>Xero</span>
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
