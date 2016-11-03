import { Component } from 'react';
// import moment from 'moment';
import { Link } from 'react-router';
import { Summary } from 'layouts';
import {
	Breadcrumbs,
	Button,
	Column,
	// ContentItem,
	// HorizontalRule,
	// Icon,
	// Info,
	// InputText,
	// InputSwitch,
	Row,
	Section,
	// Tabs
	} from 'components';
// import Tab from 'components/Tabs/components/Tab';
import { Header } from 'containers';
// import TemplateLine from './containers/TemplateLine';
// import templatesData from './containers/templateData.jsx';
import { CustomDataItem } from './components';

// const allTemplates = templatesData.templateData;

const styles = require('./DevContent.scss');
// const iconObject = require('./images/object.svg');
// const iconPage = require('./images/page.svg');
// const iconSection = require('./images/section.svg');
// const iconItem = require('./images/item.svg');

export default class DevContent extends Component {

	state = {
		activeType: null,
		activeView: null
	}

	render() {
		// const { location } = this.props;
		const {routeParams, route} = this.props;
		console.log(routeParams, route);
		let templateId = routeParams.templateId;
		return (
			<Summary>
				<Header
					key={'layoutHeader'}
					title={
						`Dev: Content Edit
							${this.state.activeType ? (': ' + this.state.activeType) + 's' : ''}
							${templateId ? (': ' + templateId) : ''}
						`}
				/>
				<div key={'layoutHero'} className={styles.DevContentEditHero}>
					<Row>
						<Column occupy={7}>
							<Breadcrumbs
								breadcrumbData={[
									{ text: 'Dev', link: 'dev' },
									{ text: 'Content Creation', link: 'content' },
									{ text: 'Edit', link: 'content'},
									{ text: templateId }
								]}
							/>
						</Column>
						<Column occupy={5}>
							<div className={styles.buttonWrap}>
								<Button
									classNameProps={['highlighted']}
									content="Save & Return"
									onClickProps={() => this.setLocalStorage(templateId, 'thisisdata')}
									/>
								<Link to={`/dev/content/${templateId}`}>
									<Button classNameProps={['grey']} content="Cancel" />
								</Link>
							</div>
						</Column>
					</Row>
				</div>
				<div key={'layoutMain'} className={styles.DevContentEdit}>
					{ this.getActiveContentSection() }
					</div>
			</Summary>
		);
	}

	getActiveContentSection() {
		const { activeType } = this.state;
		const {routeParams} = this.props;
		let templateId = routeParams.templateId;
		console.log('activetype is', activeType);
		// console.log('localStorage.nomosPrototype is:', localStorage.nomosPrototype);
		// console.log('this id is', templateId);
		// console.log('this data is', localStorage.nomosPrototype[templateId]);
		// let templateData = JSON.parse(localStorage.nomosPrototype);
		// templateData = templateData[templateId];
		// console.log('templatedata', templateData);
			return (
				<Section hasPadding >
					<CustomDataItem
						ref={(c) => { this.customDataComponent = c; }}
						// data={templateData}
						dataId={templateId}
						/>
				</Section>
			);
	}
	setLocalStorage = (dataId, dataJson) => {
		// const {routeParams} = this.props;
		// let templateId = routeParams.templateId;

/*
saved template should be in this format
			templateId: 12,
			templateType: 'component',
			templateDepth: 'item',
			templateName: 'Text Input',
			component: 'InputText',
			description: 'Default text input',
			content: {
				component: 'InputText',
				props: {
				label: 'Test Label',
				value: 'existing text value',
				placeholder: 'clean style',
				classNameProps: [
					'normal',
					'space'
					]
				}
			}
*/

		// this is the data from the edit component.
		// we wil retrieve the relevant template info from here
		console.log('compoentn state: ', this.customDataComponent.state);
		console.log('dataId, data:', dataId, dataJson);
		// let dataToSave = this.customDataComponent.state.template;
		// dataToSave.templateId = templateId;
		let idToSave = this.customDataComponent.state.template.templateId;
		// dataToSave.templateType = 'user';
		// dataToSave.templateName = 'An exampel name';
		// dataToSave.templateDepth = 'item';
		// dataToSave.InputText.content = this.customDataComponent.state.InputText;
		// dataToSave.content.templateId = (templateId).toString();
		// console.info(dataToSave);
		// console.log(idToSave);
		console.log('-----');
		let theLocalStorage = JSON.parse(localStorage.nomosPrototype);
		console.log('localstorage.nomosPrototype is: ', theLocalStorage);
		console.log('localstorage. with dataid is is: ', theLocalStorage[idToSave]);
		theLocalStorage[idToSave] = this.customDataComponent.state.template;
		let savedLocalStorageTemplate = theLocalStorage[idToSave];
		console.log('new local storage: ', savedLocalStorageTemplate);
		console.log('so the new local storage is: ', theLocalStorage);
		// tmporary saving format - overrides EVERYTHING...
		localStorage.nomosPrototype = JSON.stringify(theLocalStorage);
		console.log('localstorage is: ', localStorage);
		this.goTo('/dev/content/' + dataId);
	}

	goTo = (url) => {
		// browserHistory.push(url);
		this.props.history.push(url);
	}
}
