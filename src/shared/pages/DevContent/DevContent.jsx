import { Component } from 'react';
import moment from 'moment';
// import { browserHistory } from 'react-router';
import { Summary } from 'layouts';
import {
	Button,
	ButtonGroup,
	Column,
	HorizontalRule,
	Icon,
	ObjectInfo,
	Row,
	Section,
	SubNavWrap
	} from 'components';
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

const objectData = [
{
	id: 1234,
	type: 'Agreement',
	subType: 'Lease',
	subSubType: '',
	title: 'Nomos Lease',
	subtitle: 'High level Objects',
	version: '1.0',
	createdByName: 'David Bromley',
	createdDate: 1476759075104,
	tags: ['Lease', 'New Zealand'],
	sections: [
		{
			title: 'Parties'
		}, {
			title: 'Property'
		}, {
			title: 'Rent'
		}, {
			title: 'Payments'
		}, {
			title: 'Events'
		}
	],
	description: 'Standard nomos one lease agreement' // eslint-disable-line max-len
}, {
	id: 1235,
	type: 'Agreement',
	subType: 'Lease',
	subSubType: '',
	title: 'PCNZ Property Lease Agereement',
	subtitle: 'Property Version',
	version: '1.4',
	versionDate: 'October 2015',
	createdByName: 'PCNZ',
	provider: 'PCNZ',
	createdDate: 1476759075104,
	tags: ['PCNX', 'Lease', 'New Zealand'],
	sections: [
		{
			title: 'Parties',
			templateName: 'Parties Selection'
		}, {
			title: 'Property',
			templateName: 'Agreement Property Template'
		}, {
			title: 'Rent',
			templateName: 'default Rent template'
		}, {
			title: 'Payments',
		}, {
			title: 'Events',
			templateName: 'Standard Events template'
		}
	],
	description: 'Standard office lease as created by Propsrty Council New Zealand' // eslint-disable-line max-len
}, {
	id: 1236,
	type: 'Property',
	subType: 'Space',
	subSubType: 'Retail',
	title: 'Standard Retail Space',
	version: '1',
	versionDate: 'Jan 2016',
	createdByName: 'nomos',
	provider: 'Nomos',
	createdDate: 1476753073104,
	tags: ['Retail'],
	sections: [
		{
			title: 'Location',
			templateName: 'default Location'
		}, {
			title: 'Address',
			templateName: 'default Address Template'
		}, {
			title: 'Area & Size',
			templateName: 'default Area/Size template'
		}, {
			title: 'Events',
			templateName: 'Property Events template'
		}
	]
}
];


export default class DevContent extends Component {

	state = {
		activeSection: null,
		activeObject: null
	}

	render() {
		// const { location } = this.props;
		return (
			<Summary>
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
						{this.state.activeObject ?
							(': ' + this.state.activeObject) : null
						}
					</h2>
					{ this.getActiveContentSection() }
					</div>
			</Summary>
		);
	}

	getActiveContentSection() {
		const { activeSection, activeObject } = this.state;
		switch (activeSection) {
			case 'object':
				return (
					<span>
						<Button
						content="Back"
						onClickProps={this.switchSection(null)}
						classNameProps={['highlighted']}
						icon="chevron-left"
						iconSize={12}
					/>
					<Section title={'Objects'}>
						<Row>
						{ this.state.activeSection
							&& !(this.state.activeObject)
							&& !(this.state.activeObject < 0) ?
						<Column occupy={12}>
							<div>
							{
								objectData.map((item, index) => {
								return (
									<div
										id={`test${index}`}
										key={index}
										onClick={this.switchObject(`${index}`)}
										className={
											styles.item + ' ' +
											(index === activeObject ? styles.isSelected : '')
											}
										>
											<h5>{item.title}</h5>
											<h4>{item.type} {item.subType ? '/ ' + item.subType : ''}</h4>
											<Button
												type="text"
												content="View detail"
												onClickProps={this.switchObject(index)}
												/>
									</div>
								);
							})
							}
							</div>
						</Column>
						: null
						}
						{
							this.state.activeObject && (this.state.activeObject > -1) ?
							<Column occupy={12}>
								<div className={styles.detail}>
									{this.getActiveObjectDetail()}
									</div>
							</Column>
						: null
						}
					</Row>

					</Section>
					</span>
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

	getActiveObjectDetail = () => {
		const { activeObject } = this.state;
		console.log(objectData);
		console.log('activeObject is: ', activeObject);
		console.log('activeObject is: ', activeObject.replace('object', ''));
		console.log('activeObject.length is: ', activeObject.length);
		let objectRef;
		if (isNaN(activeObject)) {
			console.log('Nan');
			return false;
			}
		if (activeObject) {
			objectRef = activeObject.replace('object', '');
			console.log('ref is: ', objectRef);
		}
		let item = objectData[objectRef];
		if (item) {
			return (
					<Section hasPadding>
						<Button
							content="Close"
							onClickProps={this.switchObject('null')}
							classNameProps={['hollow']}
							icon="cross"
							iconColor={'black'}
							iconSize={12}
						/>
						<HorizontalRule />
						<Row>
							<Column occupy={3}>
								<Icon size={32} icon={item.type.toLowerCase()} />
							</Column>
							<Column occupy={6}>
								<h4>title</h4>
								<span>{item.title}</span>
								<h4>Description</h4>
								<span>{item.description}</span>
							</Column>
							<Column occupy={2}>
								<div>
										<div>
											<Button type="text" content="edit" classNameProps={['text', 'actionItem']} />
										</div>
										<Button
											type="text"
											content="Copy to New..."
											classNameProps={['text', 'actionItem']}
										/>
								</div>
							</Column>
						</Row>
						<HorizontalRule />
						<Row>
							<Column occupy={3} />
							<Column occupy={3}>
								<h4>Type</h4>
								<div>{item.type}</div>
								<h4>Sub-Type</h4>
								<div>{item.subType}</div>
							</Column>
							<Column occupy={3}>
								<h4>Version</h4>
								<div>{item.version}</div>
								<h4>CREATED</h4>
								<div>{moment(Number(item.createdDate)).format('DD MMM, YYYY')}</div>

								<h4>BY</h4>
								<div>{item.createdByName}</div>
							</Column>
							<Column occupy={3}>
								<h4>tags</h4>
								<div>
									{
										item.tags.map((tag, index) => {
											console.log(index);
											return (
											<span className={styles.tag}>
												{tag}
											</span>
											);
										})
									}
								</div>
							</Column>
						</Row>
						<HorizontalRule />
						<Row>
						<h4>Sections</h4>
							<Row>
								<Column occupy={3}>
									{<h4>Name</h4>}
								</Column>
								<Column occupy={6}>
									{<h4>Template</h4>}
								</Column>
								<Column occupy={3}>
									{<h4>View</h4>}
								</Column>
							</Row>
							{
								item.sections.map((section, index) => {
									return (
											<Row key={index}>
												<Column occupy={3}>
														{section.title}
												</Column>
												<Column occupy={6}>
														{section.templateName || ''}
												</Column>
												<Column occupy={3}>
														<Button type="text" content="view" />
												</Column>
											</Row>
									);
								})
							}
						</Row>
						<div className={styles.preview} style={{margin: '0 -8px'}}>
							<ObjectInfo
								title={'TITLE HERE'}
								type={item.type.toLowerCase()}
								subType={'lease'}
							/>
						</div>
						<div className={styles.code} style={{margin: '0px -8px -24px'}}>
							<pre>{ JSON.stringify(item, null, 2) }</pre>
						</div>
					</Section>
			);
		} else {
			return (
				<Section hasPadding>
					<p className={styles.description}>
						No content Loaded. Select a template item.
					</p>
				</Section>
			);
		}
	}

	switchSection = (currentSection) => {
		return () => {
			this.setState({ activeSection: currentSection });
		};
	}
	switchObject = (currentObject) => {
		if (currentObject === 'null') {
			return () => {
				console.log('setting activeObject = ', currentObject);
				this.setState({ activeObject: null });
			};
		}
		if (currentObject) {
			return () => {
				console.log('setting activeObject = ', currentObject);
				this.setState({ activeObject: currentObject });
			};
		}
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
