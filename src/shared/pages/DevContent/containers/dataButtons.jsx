module.exports = {
	buttonGroupData2: [
	{
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
	}
	]
};