import { Component } from 'react';
// import moment from 'moment';
// import { browserHistory } from 'react-router';
import { Summary } from 'layouts';
import {
	Breadcrumbs,
	// Button,
	// Column,
	// ContentItem,
	// HorizontalRule,
	// Icon,
	// Info,
	// InputText,
	// InputSwitch,
	// Row,
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
		// const {routeParams, route} = this.props;
		return (
			<Summary>
				<Header
					key={'layoutHeader'}
					title={
						`Dev: Content Edit
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
					{ this.getActiveContentSection() }
					</div>
			</Summary>
		);
	}

	getActiveContentSection() {
		const { activeType } = this.state;
		console.log(activeType);
			return (
				<Section hasPadding >
						<CustomDataItem />
				</Section>
			);
	}

}
