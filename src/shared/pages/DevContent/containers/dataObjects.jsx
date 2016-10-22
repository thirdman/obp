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
					title: 'Parties',
					templateId: 2221
				}, {
					title: 'Property',
					templateId: 2222
				}, {
					title: 'Rent',
					templateId: 2222
				}, {
					title: 'Payments',
					templateId: 2222
				}, {
					title: 'Events',
					templateId: 2222
				}, {
					title: 'Other Info',
					templateId: 2223
				}, {
					title: 'Access',
					templateId: 2222
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
					templateName: 'Parties Selection',
					id: 2221
				}, {
					title: 'Property',
					templateName: 'Agreement Property Template',
					templateId: 2221
				}, {
					title: 'Rent',
					templateName: 'default Rent template',
					templateId: 2222
				}, {
					title: 'Payments',
					templateId: 2222
				}, {
					title: 'Events',
					templateName: 'Standard Events template',
					templateId: 2222
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
					templateName: 'default Location',
					templateId: 2223
				}, {
					title: 'Address',
					templateName: 'default Address Template',
					templateId: 2221
				}, {
					title: 'Area & Size',
					templateName: 'default Area/Size template',
					templateId: 2221
				}, {
					title: 'Events',
					templateName: 'Property Events template',
					templateId: 2223
				}
			]
		}
	],
	thePageData: [
		{
			id: 2221,
			type: 'Page',
			title: 'Parties',
			description: 'Default parties selection screen', // eslint-disable-line max-len
			version: '1.0',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			tags: ['Agreements', 'Parties', 'Component'],
			sections: [
				{
					templateName: 'Component Loader',
					title: 'Loader',
					type: 'loader',
					description: 'Section that loads the appropriate component',
					component: 'PartiesSelect',
					templateId: 119
				}
			]
		}, {
			id: 2222,
			type: 'Page',
			title: 'Rent',
			description: 'Default Agreement Rent selection screen', // eslint-disable-line max-len
			version: '1.0',
			createdByName: 'David Bromley',
			createdDate: 1476759045104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476459075104,
			tags: ['Agreements', 'Rent', 'Component'],
			sections: [
				{
					templateName: 'Component Loader',
					title: 'Loader',
					type: 'loader',
					description: 'Section that loads the appropriate component',
					component: 'RentSelect',
					templateId: 120
				}
			]
		}, {
			id: 2223,
			type: 'Page',
			title: 'Other Info',
			description: 'Default page for miscellaneous Info', // eslint-disable-line max-len
			version: '1.0',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			tags: ['Agreements', 'Template'],
			sections: [
				{
					templateName: 'Agreement Additional Information',
					title: 'Additional Information',
					type: 'section',
					description: 'this first section of addtional information',
					templateId: 119
				},
				{
					templateName: 'Agreement Financial Information',
					title: 'Financial Information',
					type: 'section',
					description: 'Allows users to enter financial information about their agreement (default)', // eslint-disable-line
					templateId: 120
				},
				{
					templateName: 'Agreement Author Information',
					title: 'Additional Authors',
					type: 'section',
					description: 'Allows users to enter information about who drafted the agreement',
					templateId: 122
				}
			]
		}
	],
	sectionsJson: {
		119: {
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
		},
		120: {
			id: 120,
			type: 'section',
			page: 'events',
			title: 'Events Summary',
			description: 'first section of the Event process',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'Gareth Bedford',
			lastEditedDate: 1476759075104,
			items: [
				{
					templateName: 'Event Summary',
					title: 'Summary',
					type: 'Info',
					description: 'Summary information for the process',
					templateId: 12
				}, {
					templateName: 'Event Summary Buttons',
					title: 'Buttons',
					type: 'Button',
					description: 'buttons to dismiss the event',
					templateId: 13
				}
			],
		},
		122: {
			id: 122,
			type: 'section',
			page: 'events',
			title: 'Event Changes',
			description: 'Shows what has changed in the event',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'Gareth Bedford',
			lastEditedDate: 1476759075104,
			items: [
				{
					templateName: 'Event Change title',
					title: 'Summary',
					type: 'Info',
					templateId: 14
				}, {
					templateName: 'Event Summary List',
					title: 'list',
					type: 'container',
					componentRef: 'eventListChanges',
					description: 'Loads changes to the event',
					templateId: 13
				}
			],
		},
		123: {
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
					type: 'Info',
					templateId: 13
				}, {
					templateName: 'Event Documentation',
					title: 'event docs',
					type: 'container',
					componentRef: 'eventDocSelect',
					description: 'loads the interface for selecting documents',
					templateId: 14
				}
			],
		}
	},
	itemsJson: {
    12: {
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
                    classNameProps: [
                        'normal',
                        'space'
                    ]
                }
            }
        ]
    },
    13: {
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
    },
    14: {
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
	}
};