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
	SubNavWrap
	} from 'components';
import { Header } from 'containers';
import theData from './containers/dataObjects.jsx';
import dataButtons from './containers/dataButtons.jsx';

const buttonGroupData = dataButtons.buttonGroupData2;
const objectData = theData.objectData;
const sectionsData = theData.sectionsData;
const itemsData = theData.itemsData;

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
													onClickProps={this.switchObject(index)}
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
							onClickProps={this.switchType(null)}
							classNameProps={['highlighted']}
							icon="chevron-left"
							iconSize={12}
						/>
					</Section>
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
								sectionsData.map((item, index) => {
								return (
									<div
										id={`test${index}`}
										key={index}
										onClick={this.switchSection(`${index}`)}
										className={
											styles.item + ' ' +
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
													onClickProps={this.switchSection(index)}
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
								<div className={styles.detail}>
									{this.getActiveSectionDetail()}
									</div>
							</Column>
						: null
						}
					</Row>

					</Section>
					</span>
				);
			case 'item':
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
								itemsData.map((item, index) => {
								return (
									<div
										id={`test${index}`}
										key={index}
										onClick={this.switchItem(`${index}`)}
										className={
											styles.item + ' ' +
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
													onClickProps={this.switchItem(index)}
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
			let pageListData = item.pages.map((page) => {
						return (
							{label: page.title}
						);
					});
			console.log(pageListData);
			return (
					<Section hasPadding>
						<Row>
							<Column occupy={9}>
								<h2>{item.title}</h2>
							</Column>
							<Column occupy={3}>
								<Button
									content="Close"
									onClickProps={this.switchObject('null')}
									classNameProps={['hollow']}
									icon="cross"
									iconColor={'black'}
									iconSize={12}
								/>
							</Column>
						</Row>
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
						<HorizontalRule />
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
						<div className={styles.preview}>
							<ObjectInfo
								title={'{OBJECT KNOWNAS WILL APPEAR}'}
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
						<div className={styles.code} >
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

	getActiveSectionDetail = () => {
		const { activeSection } = this.state;
		console.log(sectionsData);
		console.log('activeSection is: ', activeSection);
		let sectionRef;
		if (isNaN(activeSection)) {
			console.log('Nan');
			return false;
			}
		if (activeSection) {
			sectionRef = activeSection.replace('object', '');
			console.log('ref is: ', sectionRef);
		}
		let item = sectionsData[sectionRef];
		if (item) {
			let itemListData = item.items.map((thisItem) => {
						return (
							{label: thisItem.title}
						);
					});
			console.log(itemListData);
			return (
					<Section hasPadding>
						<Row>
							<Column occupy={9}>
								<h2>{item.title}</h2>
							</Column>
							<Column occupy={3}>
								<Button
									content="Close"
									onClickProps={this.switchSection('null')}
									classNameProps={['hollow']}
									icon="cross"
									iconColor={'black'}
									iconSize={12}
								/>
							</Column>
						</Row>
						<HorizontalRule />
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
						<HorizontalRule />
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
								item.items.map((section, index) => {
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
							<Section
								hasBorder
								hasPadding
								title={item.title}
								description={item.description}
								templateMode
							>
							{
								item.items.map((thisItem) => {
									return (
										<ContentItem
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

	getActiveItemDetail = () => {
		const { activeItem } = this.state;
		let itemRef;
		if (isNaN(activeItem)) {
			console.log('Nan');
			return false;
			}
		if (activeItem) {
			itemRef = activeItem.replace('object', '');
			console.log('ref is: ', itemRef);
		}
		let item = itemsData[itemRef];
		if (item) {
			console.log(item);
			return (
				<div className={styles.detail}>
					<Section hasPadding>
						<Row>
							<Column occupy={9}>
								<h2>{item.title}</h2>
							</Column>
							<Column occupy={3}>
							<Button
								content="Close"
								onClickProps={this.switchItem('null')}
								classNameProps={['hollow']}
								icon="cross"
								iconColor={'black'}
								iconSize={12}
							/>
							</Column>
						</Row>
						<HorizontalRule />
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
						<HorizontalRule />
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
						<div className={styles.preview} style={{margin: '0 -8px'}}>
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
						<div className={styles.code} style={{margin: '0px -8px -24px'}}>
							<pre>{ JSON.stringify(item, null, 2) }</pre>
						</div>
					</Section>
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

	switchType = (currentSection) => {
		return () => {
			this.setState({ activeType: currentSection });
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

	switchSection = (currentSection) => {
		if (currentSection === 'null') {
			return () => {
				console.log('setting activeSection = ', currentSection);
				this.setState({ activeSection: null });
			};
		}
		if (currentSection) {
			return () => {
				console.log('setting activeSection = ', currentSection);
				this.setState({ activeSection: currentSection });
			};
		}
	}

	switchItem = (currentItem) => {
		if (currentItem === 'null') {
			return () => {
				console.log('setting activeSection = ', currentItem);
				this.setState({ activeItem: null });
			};
		}
		if (currentItem) {
			return () => {
				console.log('setting activeSection = ', currentItem);
				this.setState({ activeItem: currentItem });
			};
		}
	}

	rehydrateJSON = (obj, props) => {
		// const ComponentTypes = {InputText, InputSwitch, Info};
		// let Type = ComponentTypes[obj.component];
		console.log(props);
		console.log(props.value);
		console.log(obj);
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
