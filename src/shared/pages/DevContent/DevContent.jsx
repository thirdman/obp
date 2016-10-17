import { Component } from 'react';
// import { browserHistory } from 'react-router';
import { View } from 'layouts';
import { Button, ButtonGroup, Section, SubNavWrap } from 'components';
import { Header } from 'containers';

const styles = require('./DevContent.scss');

const buttonGroupData = [{
	name: 'object',
	title: 'Object',
	subtitle: 'High level Objects',
	showButton: 'true',
	descriptionTitle: 'Usage',
	description: 'Primary high level objects, such as Agreements and property. Contains Pages.', // eslint-disable-line max-len
	classes: ['hero'],
	onClickReturn: 'object'
}, {
	name: 'page',
	title: 'Page',
	subtitle: 'tabs in an object',
	showButton: 'true',
	descriptionTitle: 'Usage',
	description: 'Sub navigation tabs within an object. Contains sections and Items.',
	classes: ['hero'],
	onClickReturn: 'page'
}, {
	name: 'section',
	title: 'Sections',
	subtitle: 'divisions within a page',
	showButton: 'true',
	descriptionTitle: 'Usage',
	description: 'Logical sections of a page of data. Contains Items',
	classes: ['hero'],
	onClickReturn: 'section'
}, {
	name: 'item',
	title: 'Items',
	subtitle: 'single piece of data',
	showButton: 'true',
	descriptionTitle: 'Usage',
	description: 'InputText, InputSelect, InputDate etc',
	classes: ['hero'],
	onClickReturn: 'item'
}];


export default class DevContent extends Component {

	state = {
		activeSection: null
	}

	render() {
		// const { location } = this.props;
		return (
			<View>
				<Header key={'layoutHeader'} title="Dev: Content" />
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={3}
					listData={[
						{label: 'Dev Home', link: '/dev'},
						{label: 'Documentation', link: '/dev/docs'},
						{label: 'Icons', link: '/dev/icons'},
						{label: 'Content Creation', link: '/dev/content'}
					]}
				/>
				<div key={'layoutMain'} className={styles.DevContent}>
					<h2>Content Creation
						{this.state.activeSection ? (': ' + this.state.activeSection) : null }
					</h2>
					{ this.getActiveContentSection() }
					</div>
			</View>
		);
	}

	getActiveContentSection() {
		const { activeSection } = this.state;
		console.log(activeSection);
		switch (activeSection) {
			case 'object':
				return (
					<Section title={'Objects'} hasPadding >
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']}
							icon="chevron-left"
							iconSize={12}
						/>
					</Section>
				);
			case 'page':
				return (
					<Section title={'Pages'} hasPadding >
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']}
							icon="chevron-left"
							iconSize={12}
						/>
					</Section>
				);
			case 'section':
				return (
					<Section title={'Sections'} hasPadding >
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']}
							icon="chevron-left"
							iconSize={12}
						/>
					</Section>
				);
			case 'item':
				return (
					<Section title={'Items'} hasPadding >
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']}
							icon="chevron-left"
							iconSize={12}
						/>
					</Section>
				);
			default:
				return (
					<Section hasPadding >
						<ButtonGroup
							type={'hero'}
							hasData
							optionData={buttonGroupData}
							onClickProps={this.switchSection}
							classNameProps={['buttonCount4']}
							/>
					</Section>
				);
		}
	}

	switchSection = (currentSection) => {
		return () => {
			this.setState({ activeSection: currentSection });
		};
	}

/*
	onNavigate = (link) => {
		console.log(this);
		console.log(link);
		return () => {
			browserHistory.push('/dev/content/' + link);
		};
	}
*/
}
