import { Component } from 'react';
import moment from 'moment';
// import { browserHistory } from 'react-router';
import { Summary } from 'layouts';
import {
	Breadcrumbs,
	Button,
	ButtonGroup,
	Column,
	ContentItem,
	HorizontalRule,
	Icon,
	Info,
	InputText,
	InputSwitch,
	ObjectInfo,
	Row,
	Section,
	SubNavWrap,
	Tabs
	} from 'components';
import Tab from 'components/Tabs/components/Tab';
import { Header } from 'containers';
import TemplateLine from './containers/TemplateLine';
import theData from './containers/dataObjects.jsx';
import dataButtons from './containers/dataButtons.jsx';

const buttonGroupData = dataButtons.buttonGroupData2;
// const objectData = theData.objectData;
// const pagesData = theData.thePageData;
// const sectionsData = theData.sectionsData;
// const itemsData = theData.itemsData;
const objectsJson = theData.objectsJson;
const pagesJson = theData.pagesJson;
const sectionsJson = theData.sectionsJson;
const itemsJson = theData.itemsJson;

const styles = require('./DevContent.scss');
const iconObject = require('./images/object.svg');
const iconPage = require('./images/page.svg');
const iconSection = require('./images/section.svg');
const iconItem = require('./images/item.svg');

export default class DevContent extends Component {

	state = {
		activeType: null,
		activeObject: null,
		activePage: null,
		activeSection: null,
		activeItem: null
	}

	render() {
		// const { location } = this.props;
		// const {routeParams, route} = this.props;
		return (
			<Summary>
				<Header
					key={'layoutHeader'}
					title={
						`Dev: Content Creation
							${this.state.activeType ? (': ' + this.state.activeType) + 's' : ''}
							${this.state.activeObject ? (': ' + this.state.activeObject) : ''}
						`}
				/>
				<div key={'layoutHero'} className={styles.Devggg}>
					<Breadcrumbs
						// params={routeParams}
						// route={route}
						breadcrumbData={[
							{ text: 'Dev', link: 'dev' },
							{ text: 'Content Creation', link: 'content' },
							{ text: (this.state.activeType ? (this.state.activeType) + 's' : '') },
							{ text: (this.state.activeObject ? (this.state.activeObject) : '') }
						]
					}
					/>
				</div>
				<div key={'layoutMain'} className={styles.DevContent}>
					{ this.getActiveContentSection() }
					</div>
			</Summary>
		);
	}

	getActiveContentSection() {
		const { activeType, activeObject } = this.state;
		let objectsDataArray = Object.values(objectsJson);
		let sectionsDataArray = Object.values(sectionsJson);
		let pagesDataArray = Object.values(pagesJson);
		let itemsDataArray = Object.values(itemsJson);
		let hasDetailPageOpen;
		let hasDetailSectionOpen;
		let hasDetailObjectOpen;
		switch (activeType) {
			case 'object':
				if (this.state.activeType
					&& !(this.state.activeObject)
					&& !(this.state.activeObject < 0)
					) {
						hasDetailObjectOpen = false;
					} else {
						hasDetailObjectOpen = true;
					}
				return (
					<span>
						<Button
						content="Back"
						onClickProps={this.switchType(null)}
						classNameProps={['highlighted']}
						icon="chevron-left"
						iconSize={12}
					/>
					<Section title={'Objects'}>
						<Row>
						<Column occupy={hasDetailObjectOpen ? 3 : 12}>
							<div>
								<Row>
									<Column occupy={6}>
										<h4>Name</h4>
									</Column>
									<Column occupy={3}>
										<h4>Type/Subtype</h4>
									</Column>
									<Column occupy={3} />
								</Row>
							{
								objectsDataArray.map((item, index) => {
								return (
									<div
										id={`test${index}`}
										key={index}
										// onClick={this.switchObject(`${index}`)}
										onClick={() => this.onViewDetail('object', item.id)}
										className={
											styles.rowItem + ' ' +
											(index === activeObject ? styles.isSelected : '')
											}
										>
										<Row>
											<Column occupy={6}>
												<span>{item.title}</span>
											</Column>
											<Column occupy={3}>
												<h4>{item.type} {item.subType ? '/ ' + item.subType : ''}</h4>
											</Column>
											<Column occupy={3}>
												<Button
													type="text"
													content="View"
													// onClickProps={this.switchObject(index)}
													onClickProps={() => this.onViewDetail('object', item.id)}
													/>
											</Column>
										</Row>
									</div>
								);
							})
							}
							</div>
						</Column>
						{
							this.state.activeObject && (this.state.activeObject > -1) ?
							<Column occupy={9}>
								{this.getActiveObjectDetail()}
							</Column>
						: null
						}
					</Row>

					</Section>
					</span>
				);
			case 'page':
				if (this.state.activeType
						&& !(this.state.activePage)
						&& !(this.state.activePage < 0)
						) {
							hasDetailPageOpen = false;
						} else {
							hasDetailPageOpen = true;
						}
				return (
					<span>
						<Button
						content="Back"
						onClickProps={this.switchType(null)}
						classNameProps={['highlighted']}
						icon="chevron-left"
						iconSize={12}
					/>
					<Section title={'Pages'}>
						<Row>
						<Column occupy={hasDetailPageOpen ? 3 : 12}>
								<Row>
									<Column occupy={6}>
										<h4>Name</h4>
									</Column>
									<Column occupy={4}>
										<h4>Type/Subtype</h4>
									</Column>
									<Column occupy={2} />
								</Row>
							{
								pagesDataArray.map((item, index) => {
								return (
									<div
										id={`test${index}`}
										key={index}
										// onClick={this.switchPage(`${index}`)}
										onClick={() => this.onViewDetail('page', item.templateId)}

										className={
											styles.rowItem + ' ' +
											(index === activeObject ? styles.isSelected : '')
											}
										>
										<Row>
											<Column occupy={6}>
												<span>{item.title || item.templateName}</span>
											</Column>
											<Column occupy={3}>
												<h4>{item.type} {item.subType ? '/ ' + item.subType : ''}</h4>
											</Column>
											<Column occupy={3}>
												<Button
													type="text"
													content="View"
													// onClickProps={this.switchPage(index)}
													onClickProps={() => this.onViewDetail('page', item.templateId)}
													/>
											</Column>
										</Row>
									</div>
								);
							})
						}
						</Column>
						{
							this.state.activePage && (this.state.activePage > -1) ?
							<Column occupy={hasDetailPageOpen ? 9 : 0}>
									{this.getActivePageDetail()}
							</Column>
						: null
						}
					</Row>

					</Section>
					</span>
				);
			case 'section':
				if (this.state.activeType
						&& !(this.state.activeSection)
						&& !(this.state.activeSection < 0)
						) {
							hasDetailSectionOpen = false;
						} else {
							hasDetailSectionOpen = true;
						}
				return (
					<span>
						<Button
						content="Back"
						onClickProps={this.switchType(null)}
						classNameProps={['highlighted']}
						icon="chevron-left"
						iconSize={12}
					/>
					<Section title={'Sections'}>
						<Row>
						{
							// this.state.activeType
							// && !(this.state.activeSection)
							// && !(this.state.activeSection < 0) ?
						<Column occupy={hasDetailSectionOpen ? 3 : 12}>
							<div>
								<Row>
									<Column occupy={6}>
										<h4>Name</h4>
									</Column>
									<Column occupy={4}>
										<h4>Type/Subtype</h4>
									</Column>
									<Column occupy={2} />
								</Row>
							{
								sectionsDataArray.map((item, index) => {
								return (
									<div
										id={`test${index}`}
										key={index}
										// onClick={this.switchSection(`${index}`)}
										onClick={() => this.onViewDetail('section', item.id)}
										className={
											styles.rowItem + ' ' +
											(index === activeObject ? styles.isSelected : '')
											}
										>
										<Row>
											<Column occupy={6}>
												<span>{item.title}</span>
											</Column>
											<Column occupy={3}>
												<h4>{item.type} {item.subType ? '/ ' + item.subType : ''}</h4>
											</Column>
											<Column occupy={3}>
												<Button
													type="text"
													content="View"
													// onClickProps={this.switchSection(index)}
													onClickProps={() => this.onViewDetail('section', item.id)}
													/>
											</Column>
										</Row>
									</div>
								);
							})
							}
							</div>
						</Column>
						// : null
						}
						{
							this.state.activeSection && (this.state.activeSection > -1) ?
							<Column occupy={hasDetailSectionOpen ? 9 : 0}>
									{this.getActiveSectionDetail()}
							</Column>
						: null
						}
					</Row>

					</Section>
					</span>
				);
			case 'item':
			// console.log(itemsData);
			// console.log(itemsDataArray);
				return (
					<span>
						<Button
						content="Back"
						onClickProps={this.switchType(null)}
						classNameProps={['highlighted']}
						icon="chevron-left"
						iconSize={12}
					/>
					<Section title={'Content Items'}>
						<Row>
						<Column occupy={3}>
							<div>
								<Row>
									<Column occupy={6}>
										<h4>Name</h4>
									</Column>
									<Column occupy={4}>
										<h4>Type/Subtype</h4>
									</Column>
									<Column occupy={2} />
								</Row>
							{
								itemsDataArray.map((item, index) => {
								return (
									<div
										id={`test${index}`}
										key={index}
										onClick={() => this.onViewDetail('item', item.id)}
										className={
											styles.rowItem + ' ' +
											(index === activeObject ? styles.isSelected : '')
											}
										>
										<Row>
											<Column occupy={6}>
												<span>{item.title}</span>
											</Column>
											<Column occupy={3}>
												<h4>{item.type} {item.subType ? '/ ' + item.subType : ''}</h4>
											</Column>
											<Column occupy={3}>
												<Button
													type="text"
													content="View"
													onClickProps={() => this.onViewDetail('item', item.id)}
													/>
											</Column>
										</Row>
									</div>
								);
							})
							}
							</div>
						</Column>
							<Column occupy={9}>
									{this.getActiveItemDetail()}
							</Column>
					</Row>

					</Section>
					</span>
				);
			default:
				return (
					<Section hasPadding >
							<Row>
								<Column occupy={3}>
									<div className={styles.largeIconWrap}>
										<span dangerouslySetInnerHTML={{__html: iconObject}} />
									</div>
								</Column>
								<Column occupy={3}>
									<div className={styles.largeIconWrap}>
										<span dangerouslySetInnerHTML={{__html: iconPage}} />
									</div>
								</Column>
								<Column occupy={3}>
									<div className={styles.largeIconWrap}>
										<span dangerouslySetInnerHTML={{__html: iconSection}} />
									</div>
								</Column>
								<Column occupy={3}>
									<div className={styles.largeIconWrap}>
										<span dangerouslySetInnerHTML={{__html: iconItem}} />
									</div>
								</Column>
							</Row>
						<ButtonGroup
							type={'hero'}
							hasData
							optionData={buttonGroupData}
							onClickProps={this.switchType}
							classNameProps={['buttonCount4']}
							/>
					</Section>
				);
		}
	}

	getActiveObjectDetail = () => {
		const { activeObject } = this.state;
		let item = objectsJson[activeObject];
		if (item) {
		// creates map for the SubNavWrap:
			let pageListData = item.pages.map((page) => {
				return (
					{label: page.title
					}
				);
			});
			return (
					<div className={styles.detail}>
						<Row>
							<Column occupy={9}>
								<h2>{item.title}</h2>
							</Column>
							<Column occupy={3}>
								<Button
									content="Close"
									// onClickProps={this.switchObject('null')}
									onClickProps={() => this.onViewDetail('null', null)}
									classNameProps={['hollow']}
									icon="cross"
									iconColor={'black'}
									iconSize={12}
								/>
							</Column>
						</Row>
				<Tabs initialSelectedIndex={0}>
					<Tab value="pane1" label="Summary">
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
											<Button type="text" content="edit" classNameProps={['text']} />
										</div>
										<Button
											type="text"
											content="Copy to New..."
											classNameProps={['text']}
										/>
								</div>
							</Column>
						</Row>
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
											return (
											<span className={styles.tag} key={index}>
												{tag}
											</span>
											);
										})
									}
								</div>
							</Column>
						</Row>
					</Tab>
					<Tab value="pane2" label="Pages">
						<Row>
						<h4>pages</h4>
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
								item.pages.map((section, index) => {
									return (
										<Row key={index}>
											<Column occupy={3}>
													{section.title}
											</Column>
											<Column occupy={6}>
													{section.templateName || ''} {section.templateId || ''}
											</Column>
											<Column occupy={3}>
												{section.templateId ?
													<Button
														type="text"
														content={`View Page ${section.templateId}`}
														onClickProps={() => this.onViewDetail('page', section.templateId)}
													/>
													: null
												}
											</Column>
										</Row>
									);
								})
							}
						</Row>
					</Tab>
					<Tab value="pane3" label="Preview">
						<div className={styles.preview}>
							<ObjectInfo
								title={'{OBJECT KNOWN AS WILL APPEAR HERE}'}
								type={item.type.toLowerCase()}
								subType={'lease'}
							/>
							<Section hasBackground backgroundColor="#eee">
								<div className={styles.previewNav}>
									<SubNavWrap
									key={'layoutNav1'}
									listData={pageListData}
								/>
								</div>
							</Section>
						</div>
					</Tab>
					<Tab value="pane4" label="Code">
						<div className={styles.code} >
							<pre>{ JSON.stringify(item, null, 2) }</pre>
						</div>
					</Tab>
				</Tabs>
			</div>
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

	getActivePageDetail = () => {
		const { activePage } = this.state;
		let item = pagesJson[activePage];
		if (item) {
			let itemsListArray = Object.values(item.sections);
/*
			let itemsListData = itemsListArray.map((thisItem) => {
						return (
							{label: thisItem.title}
						);
					});
*/
			return (
				<div className={styles.detail}>
						<Row>
							<Column occupy={9}>
								<h2>{item.title}</h2>
							</Column>
							<Column occupy={3}>
								<Button
									content="Close"
									onClickProps={() => this.onViewDetail('null', null)}
									classNameProps={['hollow']}
									icon="cross"
									iconColor={'black'}
									iconSize={12}
								/>
							</Column>
						</Row>
				<Tabs initialSelectedIndex={0}>
					<Tab value="pane1" label="Summary">
						<Row>
							<Column occupy={3}>
								<h4>Type</h4>
								<span>Content Section</span>
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
						<Row>
							<Column occupy={3}>
								<h4>tags</h4>
								<div>
									{
										item.tags && item.tags.map((tag, index) => {
											return (
											<span className={styles.tag} key={index}>
												{tag}
											</span>
											);
										})
									}
								</div>
							</Column>
							<Column occupy={3}>
								<h4>Type</h4>
								<div>{item.type}</div>
								<h4>Sub-Type</h4>
								<div>{item.subType}</div>
							</Column>
							<Column occupy={3}>
								<h4>ID</h4>
								<div>{item.templateId}</div>
								<h4>Version</h4>
								<div>{item.version}</div>
							</Column>
							<Column occupy={3}>
								<h4>CREATED</h4>
								<div>{moment(Number(item.createdDate)).format('DD MMM, YYYY')}</div>
								<h4>Last Edited</h4>
								<div>{moment(Number(item.lastEditedDate)).format('DD MMM, YYYY')}</div>
							</Column>
						</Row>
					</Tab>
					<Tab value="pane2" label="Child Sections">
						<Row>
						<h4>pages</h4>
							<Row>
								<Column occupy={4}>
									{<h4>Name</h4>}
								</Column>
								<Column occupy={5}>
									{<h4>Template Type</h4>}
								</Column>
								<Column occupy={3}>
									{<h4>View</h4>}
								</Column>
							</Row>
							<Row>
							<Column occupy={12} hasPadding={false}>
								{
									itemsListArray.map((childItem, childIndex) => {
										return (
											<TemplateLine
												item={childItem}
												templateId={item.templateId}
												key={childIndex}
											/>
										);
									})
								}
							</Column>
							</Row>
						</Row>
					</Tab>
					<Tab value="pane3" label="Preview">
						<div className={styles.preview}>
							<Section
								hasBorder
								hasPadding
								title={item.title}
								description={item.description}
								templateMode
							>
							{
								itemsListArray.map((thisItem, index) => {
									return (
										<ContentItem
											key={index}
											title={thisItem.title}
											description={thisItem.description}
											templateMode
											hasBackground
											/>
									);
								})
							}
							</Section>
						</div>
					</Tab>
					<Tab value="pane4" label="Code">
						<div className={styles.code}>
							<pre>{ JSON.stringify(item, null, 2) }</pre>
						</div>
					</Tab>
				</Tabs>
				</div>
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

	getActiveSectionDetail = () => {
		const { activeSection } = this.state;
		let item = sectionsJson[activeSection];
		if (item) {
			let itemsListArray = Object.values(item.items);
			let itemListData = itemsListArray.map((thisItem) => {
						return (
							{label: thisItem.title}
						);
					});
			console.log(itemListData);
			return (
				<div className={styles.detail}>
						<Row>
							<Column occupy={9}>
								<h2>{item.title}</h2>
							</Column>
							<Column occupy={3}>
								<Button
									content="Close"
									onClickProps={() => this.onViewDetail('null', null)}
									classNameProps={['hollow']}
									icon="cross"
									iconColor={'black'}
									iconSize={12}
								/>
							</Column>
						</Row>
				<Tabs initialSelectedIndex={0}>
					<Tab value="pane1" label="Summary">
						<Row>
							<Column occupy={3}>
								<h4>Type</h4>
								<span>{item.type}</span>
							</Column>
							<Column occupy={6}>
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
						<Row>
							<Column occupy={3}>
								<h4>tags</h4>
								<div>
									{
										item.tags && item.tags.map((tag, index) => {
											console.log(index);
											return (
											<span className={styles.tag} key={index}>
												{tag}
											</span>
											);
										})
									}
								</div>
							</Column>
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
							<Column occupy={3} />
						</Row>
					</Tab>
					<Tab value="pane2" label="Content Items">
						<Row>
						<h4>pages</h4>
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
								itemsListArray.map((section, index) => {
									return (
										<Row key={index}>
											<Column occupy={3}>
													{section.title}
											</Column>
											<Column occupy={6}>
													{section.templateName || ''}
											</Column>
											<Column occupy={3}>
													{section.templateId ?
														<Button
															type="text"
															content={`View Item ${section.templateId}`}
															onClickProps={() => this.onViewDetail('item', section.templateId)}
														/>
														: null
													}
											</Column>
										</Row>
									);
								})
							}
						</Row>
					</Tab>
					<Tab value="pane3" label="Preview">
						<div className={styles.preview}>
							<Section
								hasBorder
								hasPadding
								title={item.title}
								description={item.description}
								templateMode
							>
							{
								itemsListArray.map((thisItem, index) => {
									return (
										<ContentItem
											key={index}
											title={thisItem.title}
											description={thisItem.description}
											templateMode
											hasBackground
											/>
									);
								})
							}
							</Section>
						</div>
					</Tab>
					<Tab value="pane4" label="Code">
						<div className={styles.code}>
							<pre>{ JSON.stringify(item, null, 2) }</pre>
						</div>
					</Tab>
				</Tabs>
				</div>
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

	getActiveItemDetail = () => {
		const { activeItem } = this.state;
		let item = itemsJson[activeItem];
		if (item) {
			return (
				<div className={styles.detail}>
						<Row>
							<Column occupy={9}>
								<h2>{item.title}</h2>
							</Column>
							<Column occupy={3}>
							<Button
								content="Close"
								onClickProps={() => this.onViewDetail('null', null)}
								classNameProps={['hollow']}
								icon="cross"
								iconColor={'black'}
								iconSize={12}
							/>
							</Column>
						</Row>
				<Tabs initialSelectedIndex={0}>
					<Tab value="pane1" label="Summary">
						<Row>
							<Column occupy={3}>
								<h4>Type</h4>
								<span>Content Section</span>
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
						<HorizontalRule classNameProps={['dashed']} />
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
										item.tags && item.tags.map((tag, index) => {
											console.log(index);
											return (
											<span className={styles.tag} key={index}>
												{tag}
											</span>
											);
										})
									}
								</div>
							</Column>
						</Row>
					</Tab>
					<Tab value="pane2" label="Preview">
						<div className={styles.preview} >
							{
								item.components.map((component, index) => {
									console.log(component);
									return (
										<ContentItem
											title={item.title || null}
											description={item.description || null}
											helpContent={item.helpContent || null}
											key={index}
											hasBorder
											templateMode
											>
											{this.rehydrateJSON(component.component, component.props)}
										</ContentItem>
									);
								})
							}
						</div>
					</Tab>
					<Tab value="pane3" label="Code">
						<div className={styles.code} >
							<pre>{ JSON.stringify(item, null, 2) }</pre>
						</div>
					</Tab>
					<Tab value="pane4" label="Validation">
						<div >
							<p>Validation infomation will be here</p>
							<p>Is required: ?</p>
							<p>Message when missing: ?</p>
							<p>Message when error: ?</p>
						</div>
					</Tab>
					<Tab value="pane5" label="Help Content">
						<div>
							<p>Help Content information will be here</p>
						</div>
					</Tab>
				</Tabs>
				</div>
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

	onViewDetail = (target, templateId) => {
		switch (target) {
			case 'object':
				this.setState({
					activeType: 'object',
					activeObject: templateId,
					activePage: null,
					activeSection: null,
					activeItem: null
				});
				break;
			case 'page':
				this.setState({
					activeType: 'page',
					activeObject: null,
					activePage: templateId,
					activeSection: null,
					activeItem: null
				});
				break;
			case 'section':
				this.setState({
					activeType: 'section',
					activeObject: null,
					activePage: null,
					activeSection: templateId,
					activeItem: null
				});
				break;
			case 'item':
				this.setState({
					activeType: 'item',
					activeObject: null,
					activePage: null,
					activeSection: null,
					activeItem: templateId
				});
				break;
			default:
				this.setState({
					activeType: null,
					activeObject: null,
					activePage: null,
					activeSection: null,
					activeItem: null
				});
			break;
		}
	}

	getTemplateInfo = (templateId, items) => {
		items = Object.values(items);
		console.log('getting template id... ', templateId);
		console.log('getting items... ', items);
		return (
				items.map((item, index) => {
					return (
						<div
							className={styles.templateItem + ' ' + styles[item.templateDepth]}
							key={index}>
							<TemplateLine item={item} templateId={templateId} />
							{item.items ?
								this.getTemplateInfo(item.templateId, item.items)
								: null
							}
						</div>
					);
				})
		);
	}

	switchType = (currentSection) => {
		return () => {
			this.setState({ activeType: currentSection });
		};
	}

	rehydrateJSON = (obj, props) => {
		switch (obj) {
			case 'Info':
				return (
					<Info content={props.value} />
				);
			case 'InputText' :
			return (
				<InputText
					placeholder={props.placeholder}
					classnameProps={props.classNameProps}
				/>
			);
			case 'InputSwitch' :
			return (
				<InputSwitch />
			);
			default:
				return (
				<span>xxx</span>
			);
		}
	}
}
