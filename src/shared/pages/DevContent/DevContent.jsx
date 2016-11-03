import { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
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
import templatesData from './containers/templateData.jsx';
import dataButtons from './containers/dataButtons.jsx';

const buttonGroupData = dataButtons.buttonGroupData2;
// let allTemplates = templatesData.templateData;
let allTemplates = JSON.parse(localStorage.nomosPrototype);

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
		activeItem: null,
		activeView: null,
		templateData: null,
	}
	componentWillMount() {
		const {routeParams} = this.props;
		let activeTemplateId = routeParams.templateId;
		console.log('mounting...');
		console.log('getting active id...');
		if (activeTemplateId) {
			console.log('has an active id...');
			console.log(activeTemplateId);
			let item = allTemplates[activeTemplateId];
			if (!item) {
				console.log('no relevant template found...., bailing out');
			} else {
				console.log('so the relevant data is...');
				console.info(item);
				console.log('so the relevant depth is...');
				let itemDepth = item.templateDepth;
				console.log(itemDepth);
				this.onViewDetail(itemDepth, activeTemplateId);
			}
		} else {
			console.log('NO ID...');
			console.log('we should do the default.');
		}
	}

	render() {
		// const { location } = this.props;
		// const {routeParams, route} = this.props;
		// let activeTemplateId = routeParams.templateId;
		return (
			<Summary>
				<Header
					key={'layoutHeader'}
					title={
						`Dev: Content Creation
							${this.state.activeType ? (': ' + this.state.activeType) + 's' : ''}
							${this.state.activeView ? (': ' + this.state.activeView) : ''}
						`}
				/>
				<div key={'layoutHero'} className={styles.Devggg}>
					<Breadcrumbs
						breadcrumbData={[
							{ text: 'Dev', link: 'dev' },
							{ text: 'Content Creation', link: 'content' },
							{ text: (this.state.activeType ? (this.state.activeType) + 's' : '') },
							{ text: (this.state.activeView ? (this.state.activeView) : '') }
						]
					}
					/>
				</div>
				<div key={'layoutMain'} className={styles.DevContent}>
					{ this.state.templateData ?
						this.getActiveContentSection()
						: this.getActiveContentSection()
					}
					<HorizontalRule />
					<Button
						content={'Load data'}
						onClickProps={this.loadData}
						classNameProps={['highlighted']}
						/>
						<div>
							{this.state.templateData ?
								Object.keys(this.state.templateData).length + ' templates loaded.'
								: 'no data'}
							</div>
					</div>
			</Summary>
		);
	}

	getActiveContentSection() {
		const { activeType } = this.state;
		switch (activeType) {
			case 'object':
				return (
					this.getType('object')
				);
			case 'page':
				return (
					this.getType('page')
				);
			case 'section':
				return (
					this.getType('section')
				);
			case 'item':
				return (
					this.getType('item')
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
		const { activeView } = this.state;
		let item = allTemplates[activeView];
		let subNavData;
		let childTemplates;
		console.log(item);
		if (item) {
		// creates map for the SubNavWrap:
			if (item.content && item.content.templates) {
				childTemplates = Object.values(item.content.templates);
				subNavData = childTemplates.map((page) => {
					return (
						{label: page.title
						}
					);
				});
			}
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
									onClickProps={() => this.onViewDetail('object', null)}
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
								<Icon size={32} icon={item.objectType.toLowerCase() || 'agreement'} />
							</Column>
							<Column occupy={6}>
								<h4>title</h4>
								<span>{item.templateName}</span>
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
						<HorizontalRule classNameProps={['dashed']} />
						<Row>
							<Column occupy={3} />
							<Column occupy={3}>
								<h4>Object</h4>
								<div>{item.objectType}</div>
								<h4>Sub-Type</h4>
								<div>{item.objectSubType}</div>
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
					<Tab value="pane2" label="Structure">
						<Row>
						<h3>Content Structure</h3>
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
								childTemplates.map((section, index) => {
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
								type={item.objectType.toLowerCase()}
								subType={item.objectSubType}
							/>
							<Section hasBackground backgroundColor="#eee">
								<div className={styles.previewNav}>
									<SubNavWrap
									key={'layoutNav1'}
									listData={subNavData}
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
		let item = allTemplates[activePage];
		if (item) {
			// set up the array of child templates
			console.log('item isL:', item);
			let childTemplates;
			if (item.content && item.content.templates) {
				childTemplates = Object.values(item.content.templates);
			}
			return (
				<div className={styles.detail}>
						<Row>
							<Column occupy={9}>
								<h2>{item.title}</h2>
							</Column>
							<Column occupy={3}>
								<Button
									content="Close"
									onClickProps={() => this.onViewDetail('page', null)}
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
								<h4>Depth</h4>
								<span>Page</span>
							</Column>
							<Column occupy={6}>
								<h4>title</h4>
								<span>{item.templateName}</span>
								<h4>Description</h4>
								<span>{item.description}</span>
							</Column>
							<Column occupy={2}>
								<div>
										<div>
												<Button
													type="text"
													content="edit"
													classNameProps={['text', 'isDisabled']}
													/>
										</div>
										<Button
											type="text"
											content="Copy to New..."
											classNameProps={['text']}
										/>
								</div>
							</Column>
						</Row>
						<HorizontalRule classNameProps={['dashed']} />
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
								<div>{item.templateType}</div>
								<h4>Sub-Type</h4>
								<div>{item.templateSubType}</div>
							</Column>
							<Column occupy={3}>
								<h4>ID</h4>
								<div>{item.templateId}</div>
								<h4>Version</h4>
								<div>{item.version}</div>
							</Column>
							<Column occupy={3}>
								<h4>CREATED</h4>
								<div>
									{moment(Number(item.createdDate)).format('DD MMM, YYYY')}
									{` by ${item.createdByName}`}
								</div>
								<h4>Last Edited</h4>
								<div>
									{moment(Number(item.lastEditedDate)).format('DD MMM, YYYY')}
									{` by ${item.lastEditedName}`}
								</div>
							</Column>
						</Row>
					</Tab>
					<Tab value="pane2" label="Structure">
						<Row>
						<h3>Content Structure</h3>
							<Row>
								<Column occupy={4}>
									{<h4>Name</h4>}
								</Column>
								<Column occupy={4}>
									{<h4>Type</h4>}
								</Column>
								<Column occupy={1}>
									{<h4>Id</h4>}
								</Column>
								<Column occupy={3}>
									{<h4>View</h4>}
								</Column>
							</Row>
							<Row>
							<Column occupy={12} hasPadding={false}>
								{
									childTemplates && childTemplates.map((childTemplate, childIndex) => {
										console.log('you are looking for:', childTemplate.templateId);
										return (
											<TemplateLine
												templateId={childTemplate.templateId}
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
								title={item.templateName}
								description={item.description}
								templateMode
							>
							{
								childTemplates && childTemplates.map((thisItem, index) => {
									console.log(thisItem);
									return (
										<ContentItem
											key={index}
											title={thisItem.templateName}
											description={thisItem.description}
											templateMode
											hasBackground
											/>
									);
								})
							}
							{item.templateType === 'component' ?
								<div className={styles.componentPlaceholder}>
									<div>External Component: {item.component || '' }</div>
								</div>
								: null
							}
							</Section>
						</div>
					</Tab>
					<Tab value="pane4" label="Code">
						<div className={styles.code}>
							<pre>{ JSON.stringify(item, null, 2) }</pre>
						</div>
					</Tab>
					<Tab value="validation" label="Validation">
					{item.validation ?
							<div>
								<p>Is required: No</p>
							</div>
						: null
					}
					</Tab>
					<Tab value="permissions" label="Permissions">
					{item.permissions ?
							<div>
								<p>View: read only | user | admin | manager</p>
								<p>Edit: read only | user | admin | manager</p>
								<p>Create: read only | user | admin | manager</p>
								<p>Delete: read only | user | admin | manager</p>
							</div>
						: null
					}
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
		const { activeView } = this.state;
		let item = allTemplates[activeView];
		let childTemplates;
		if (item) {
			if (item.content && item.content.templates) {
				childTemplates = Object.values(item.content.templates);
			}
			return (
				<div className={styles.detail}>
						<Row>
							<Column occupy={9}>
								<h2>{item.templateName}</h2>
							</Column>
							<Column occupy={3}>
								<Button
									content="Close"
									onClickProps={() => this.onViewDetail('section', null)}
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
								<span>{item.templateType}</span>
							</Column>
							<Column occupy={6}>
								<h4>Description</h4>
								<span>{item.description}</span>
							</Column>
							<Column occupy={2}>
								<div>
										<div>
											Edit. (disabled)
										</div>
										<Button
											type="text"
											content="Copy to New..."
											classNameProps={['text']}
										/>
								</div>
							</Column>
						</Row>
						<HorizontalRule classNameProps={['dashed']} />
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
								<div>{item.templateType}</div>
								<h4>Sub-Type</h4>
								<div>{item.templateSubType}</div>
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
					<Tab value="pane2" label="Structure">
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
								childTemplates.map((section, index) => {
									return (
										<Row key={index}>
											<Column occupy={3}>
													{section.templateName}
											</Column>
											<Column occupy={6}>
													{section.templateType || ''}
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
								title={item.templateName}
								description={item.description}
								templateMode
							>
							{
								childTemplates.map((thisItem, index) => {
									console.log('this item is: ', thisItem);
									return (
										<ContentItem
											key={index}
											title={thisItem.templateName || null}
											description={thisItem.description || null}
											templateMode
											hasBackground
											>
												{thisItem.content && thisItem.content.component && thisItem.content.props ?
													this.rehydrateJSON(
														thisItem.content.component,
														thisItem.content.props
														)
													: null
												}
											</ContentItem>
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
		const { activeView } = this.state;
		let item = allTemplates[activeView];
		// let childTemplates;
		if (item) {
			// if (item.content && item.content.templates) {
				// childTemplates = Object.values(item.content.templates);
			// }
			return (
				<div className={styles.detail}>
						<Row>
							<Column occupy={9}>
								<h2>{item.templateName}</h2>
							</Column>
							<Column occupy={3}>
							<Button
								content="Close"
								onClickProps={() => this.onViewDetail('item', null)}
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
								<span>{item.templateName}</span>
								<h4>Description</h4>
								<span>{item.description}</span>
							</Column>
							<Column occupy={2}>
								<div>
										<div>
											<Link to={`/dev/content/edit/${item.templateId}`}>
												<Button type="text" content="edit" classNameProps={['text']} />
											</Link>
										</div>
										<Button
											type="text"
											content="Copy to New..."
											classNameProps={['text']}
										/>
								</div>
							</Column>
						</Row>
						<HorizontalRule classNameProps={['dashed']} />
						<Row>
							<Column occupy={3} />
							<Column occupy={3}>
								<h4>Type</h4>
								<div>{item.templateType}</div>
								<h4>Sub-Type</h4>
								<div>{item.templateSubType}</div>
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
										<ContentItem
											title={item.templateName || null}
											description={item.description || null}
											helpContent={item.helpContent || null}
											hasBorder
											templateMode
											>
											{item.content.component && item.content.props ?
												this.rehydrateJSON(item.content.component, item.content.props)
												: null
											}
										</ContentItem>
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

	getType = (type) => {
		const { activeType, activeObject, activeView } = this.state;
		console.log('activeType, view: ', activeType, activeView);
		let doDetail;
		let dataArray = Object.values(allTemplates);
		if (type === 'object') {
			dataArray = dataArray.filter(this.isObject);
			doDetail = this.getActiveObjectDetail();
		}
		if (type === 'page') {
			dataArray = dataArray.filter(this.isPage);
			doDetail = this.getActivePageDetail();
		}
		if (type === 'section') {
			dataArray = dataArray.filter(this.isSection);
			doDetail = this.getActiveSectionDetail();
		}
		if (type === 'item') {
			dataArray = dataArray.filter(this.isItem);
			doDetail = this.getActiveItemDetail();
		}
		let hasDetailOpen;
		let typeTitle = activeType + 's';
		if (this.state.activeType
				&& !(this.state.activeView)
				&& !(this.state.activeView < 0)
				) {
					hasDetailOpen = false;
				} else {
					hasDetailOpen = true;
			}
		return (
			<span>
				<Link to={'/dev/content'} onClick={() => this.noType('home')}>
					<Button
						content="Back"
						// onClickProps={this.switchType}
						// onClickProps={() => this.noType('home')}
						classNameProps={['highlighted']}
						icon="chevron-left"
						iconSize={12}
					/>
				</Link>
				<Section title={this.capitalizeFirstLetter(typeTitle)} className={styles.filterTitle}>
					<Row>
						<Column occupy={hasDetailOpen ? 3 : 12}>
								<Row>
									<Column occupy={6}>
										<h4>Name</h4>
									</Column>
									<Column occupy={4}>
										<h4>Type</h4>
									</Column>
									<Column occupy={2} />
								</Row>
							{dataArray.map((template, index) => {
								return (
									<div
										id={`test${index}`}
										key={index}
										onClick={() => this.onViewDetail(type, template.templateId)}
										className={
											styles.rowItem + ' ' +
											(index === activeObject ? styles.isSelected : '')
											}
										>
										<Row>
											<Column occupy={6}>
												<span>{template.templateName}</span>
											</Column>
											<Column occupy={3}>
												<h4>{template.templateType}, {template.templateId}</h4>
											</Column>
											<Column occupy={3}>
												<Button
													type="text"
													content="View"
													onClickProps={() => this.onViewDetail(type, template.templateId)}
													/>
											</Column>
										</Row>
									</div>
								);
							})}
						</Column>
						{this.state.activeView && (this.state.activeView > -1) ?
							<Column occupy={hasDetailOpen ? 9 : 0}>
									{doDetail}
							</Column>
						: null
						}
					</Row>
				</Section>
			</span>
		);
	};

	onViewDetail = (target, templateId) => {
		switch (target) {
			case 'object':
				this.setState({
					activeType: 'object',
					activeObject: templateId,
					activePage: null,
					activeSection: null,
					activeItem: null,
					activeView: templateId || null
				});
				this.goTo('/dev/content/' + templateId);
				break;
			case 'page':
				this.setState({
					activeType: 'page',
					activeObject: null,
					activePage: templateId,
					activeSection: null,
					activeItem: null,
					activeView: templateId || null
					});
				this.goTo('/dev/content/' + templateId);
				break;
			case 'section':
				this.setState({
					activeType: 'section',
					activeObject: null,
					activePage: null,
					activeSection: templateId,
					activeItem: null,
					activeView: templateId || null
				});
				this.goTo('/dev/content/' + templateId);
				break;
			case 'item':
				this.setState({
					activeType: 'item',
					activeObject: null,
					activePage: null,
					activeSection: null,
					activeItem: templateId,
					activeView: templateId || null
				});
				this.goTo('/dev/content/' + templateId);
				break;
			default:
				this.setState({
					activeType: null,
					activeObject: null,
					activePage: null,
					activeSection: null,
					activeItem: null,
					activeView: null
				});
			this.goTo('/dev/content');
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
			this.setState({
				activeType: currentSection,
					activeObject: null,
					activePage: null,
					activeSection: null,
					activeItem: null,
					activeView: null
				});
		};
	}
	noType = () => {
		console.log('notype triggered');
			this.setState({
				activeType: null,
					activeObject: null,
					activePage: null,
					activeSection: null,
					activeItem: null,
					activeView: null
				});
			// this.goTo('/dev/content');\
			console.log(this.state);
			this.getType('section');
		// return () => {
		// };
	}
	isObject(value) {
		return value.templateDepth === 'object';
	}
	isPage(value) {
		return value.templateDepth === 'page';
	}
	isSection(value) {
		return value.templateDepth === 'section';
	}
	isItem(value) {
		return value.templateDepth === 'item';
	}
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
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

	loadData = () => {
		console.log('allTemplates: ', allTemplates);
		console.log('allTemplates: ', templatesData.templateData);
		console.log('load data triggered');
		localStorage.nomosPrototype = JSON.stringify(templatesData.templateData);
		console.log(localStorage.nomosPrototype);
		console.log(JSON.parse(localStorage.nomosPrototype));
		let newtemplatedata = [];
		newtemplatedata.templateData = JSON.parse(localStorage.nomosPrototype);
		console.log(newtemplatedata);

		// this.setState({
			// templateData: JSON.parse(localStorage.nomosPrototype)
		// });
		console.log(this.state);
		allTemplates = JSON.parse(localStorage.nomosPrototype);
		console.log(allTemplates);
	}

	goTo = (url) => {
		// browserHistory.push(url);
		this.props.history.push(url);
	}
}
