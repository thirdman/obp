module.exports = {
	objectData: [
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
			pages: [
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
				}, {
					title: 'Other Info'
				}, {
					title: 'Access'
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
			pages: [
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
			pages: [
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
	],
	sectionsData: [
		{
			id: 119,
			type: 'section',
			page: 'all',
			title: 'Default Section',
			// eslint-disable-next-line
			description: 'A section is a convenient grouping for items that are conceptually similar. Nomos one uses sections to control editing permissions.',
			createdByName: 'David Bromley',
			createdDate: 1476739075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476749075104,
			items: [
			],
		}, {
			id: 120,
			type: 'section',
			page: 'events',
			title: 'Events Summary',
			description: 'first section of the Event process',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			items: [
				{
					templateName: 'Event Summary',
					title: 'Summary',
					type: 'Info',
					description: 'Summary information for the process'
				}, {
					templateName: 'Event Summary Buttons',
					title: 'Buttons',
					type: 'Button',
					description: 'buttons to dismiss the event'
				}
			],
		}, {
			id: 122,
			type: 'section',
			page: 'events',
			title: 'Event Changes',
			description: 'Shows what has changed in the event',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			items: [
				{
					templateName: 'Event Change title',
					title: 'Summary',
					type: 'Info',
				}, {
					templateName: 'Event Summary List',
					title: 'list',
					type: 'container',
					componentRef: 'eventListChanges',
					description: 'Loads changes to the event'
				}
			],
		}, {
			id: 123,
			type: 'section',
			page: 'events',
			title: 'Event Documentation',
			description: 'Shows the Event documentation interface',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			items: [
				{
					templateName: 'Event Documentation title',
					title: 'Documentation',
					type: 'Info'
				}, {
					templateName: 'Event Documentation',
					title: 'event docs',
					type: 'container',
					componentRef: 'eventDocSelect',
					description: 'loads the interface for selecting documents'
				}
			],
		}
	],
	itemsData: [
		{
			id: 12,
			type: 'text',
			title: 'Text Input',
			description: 'Default text input',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			components: [
				{
					component: 'InputText',
					props: {
						label: 'Test Label',
						value: 'existing text value',
						placeholder: 'clean style',
						classNameProps: ['normal', 'space']
					}
				}
			]
		}, {
			id: 13,
			type: 'info',
			title: 'Heading',
			description: 'Default heading Item',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			components: [
				{
					component: 'Info',
					props: {
						value: 'Member since Jan 2014'
					}
				}
			]
		}, {
			id: 14,
			type: 'switch',
			title: 'toggle',
			description: 'Default Switch Item',
			helpContent: 'Use this to save your settings',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			components: [
				{
					component: 'InputSwitch',
					props: {
						value: 'Save my settings'
					}
				}
			]
		}
	]
};