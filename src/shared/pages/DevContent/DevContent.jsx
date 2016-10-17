import { Component } from 'react';
import { View } from 'layouts';
import { ButtonGroup, Section, SubNavWrap } from 'components';
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
	onClickReturn: 'match'
}, {
	name: 'page',
	title: 'Page',
	subtitle: 'tabs in an object',
	showButton: 'true',
	descriptionTitle: 'Usage',
	description: 'Sub navigation tabs within an object. Contains sections and Items.',
	classes: ['hero'],
	onClickReturn: 'import'
}, {
	name: 'Section',
	title: 'divisions within a page',
	subtitle: '(from Nomos One to MYOB)',
	showButton: 'true',
	descriptionTitle: 'Usage',
	description: 'Logical sections of a page of data. Contains Items',
	classes: ['hero'],
	onClickReturn: 'export'
}, {
	name: 'Item',
	title: 'single piece of data',
	subtitle: '(from Nomos One to MYOB)',
	showButton: 'true',
	descriptionTitle: 'Usage',
	description: 'InputText, InputSelect, InputDate etc',
	classes: ['hero'],
	onClickReturn: 'export'
}];


export default class DevContent extends Component {

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
					<h2>Content Creation</h2>
					<Section hasDivider title={'Manage Entities & Contacts'} >
						<ButtonGroup
							type={'hero'}
							hasData
							optionData={buttonGroupData}
							onClickProps={this.switchSection}
							classNameProps={['buttonCount4']}
							/>
					</Section>
				</div>
			</View>
		);
	}
}
