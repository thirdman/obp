module.exports = {
	templateData: {
		//
		//
		// OBJECTS
		//
		//
		1001: {
			templateId: 1001,
			templateType: 'user',
			templateDepth: 'object',
			templateName: 'Nomos Lease',
			objectType: 'agreement',
			objectSubType: 'lease',
			version: '1.0',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			tags: ['Lease', 'New Zealand'],
			description: 'Standard nomos one lease agreement', // eslint-disable-line max-len
			content: {
				templates: {
					2231: {
						title: 'Parties',
						templateId: 2231,
						templateDepth: 'page',
					},
					2232: {
						title: 'Property',
						templateId: 2232,
						templateDepth: 'page',
					},
					2233: {
						title: 'Rent',
						templateId: 2233,
						templateDepth: 'page',
					},
					2234: {
						title: 'Payments',
						templateId: 2234,
						templateDepth: 'page',
					},
					2239: {
						title: 'Events',
						templateId: 2239,
						templateDepth: 'page',
					},
					2236: {
						title: 'Other Info',
						templateId: 2236,
						templateDepth: 'page',
					},
					2237: {
						title: 'Access',
						templateId: 2237,
						templateDepth: 'page',
					}
				}
			}
		},
		1002: {
			templateId: 1002,
			templateType: 'User',
			templateDepth: 'object',
			templateName: 'PCNZ Property Lease Agereement',
			objectType: 'agreement',
			objectSubType: 'lease',
			version: '1.4',
			versionDate: 'October 2015',
			createdByName: 'PCNZ',
			provider: 'PCNZ',
			createdDate: 1476759075104,
			tags: ['PCNX', 'Lease', 'New Zealand'],
			description: 'Standard office lease as created by Propsrty Council New Zealand', // eslint-disable-line max-len
			content: {
				templates: {
					2211: {
						title: 'Parties',
						templateName: 'Parties Selection',
						id: 2211
					},
					2212: {
						title: 'Property',
						templateName: 'Agreement Property Template',
						templateId: 2212
					},
					2213: {
						title: 'Rent',
						templateName: 'default Rent template',
						templateId: 2213
					},
					2214: {
						title: 'Payments',
						templateId: 2214
					},
					2215: {
						title: 'Events',
						templateName: 'Standard Events template',
						templateId: 2215
					}
				}
			}
		},
		1003: {
			templateId: 1003,
			templateType: 'user',
			templateDepth: 'object',
			templateName: 'Standard Retail Space',
			objectType: 'property',
			objectSubType: 'space',
			version: '1',
			versionDate: 'Jan 2016',
			createdByName: 'nomos',
			provider: 'Nomos',
			createdDate: 1476753073104,
			tags: ['Retail'],
			content: {
				templates: {
					2223: {
						title: 'Location',
						templateName: 'default Location',
						templateId: 2223
					},
					2221: {
						title: 'Address',
						templateName: 'default Address Template',
						templateId: 2221
					},
					2224: {
						title: 'Area & Size',
						templateName: 'default Area/Size template',
						templateId: 2224
					},
					2225: {
						title: 'Events',
						templateName: 'Property Events template',
						templateId: 2225
					}
				}
			}
		},

		//
		//
		// PAGES
		//
		//
		2211: {
			templateId: 2211,
			templateType: 'component',
			templateName: 'Parties Selection',
			templateDepth: 'page',
			component: 'SelectParties',
			content: {
				props: {}
			}
		},
		2212: {
			templateId: 2212,
			templateType: 'component',
						templateName: 'Agreement Property Template',
			templateDepth: 'page',
			component: 'SelectProperty'
		},
		2213: {
			templateId: 2213,
			templateType: 'component',
						templateName: 'default Rent template',
			templateDepth: 'page',
			component: 'RentPageComponent'
		},
		2214: {
			templateId: 2214,
			templateType: 'component',
			templateName: 'Payments',
			templateDepth: 'page',
			component: 'InputPayments'
		},
		2215: {
			templateId: 2215,
			templateType: 'component',
			templateName: 'Standard Events template',
			templateDepth: 'page',
			component: 'EventsSelect'
		},
		2219: {
			templateId: 2219,
			templateType: 'user',
			templateName: 'Test Page2',
			templateDepth: 'page',
			description: 'A section to test out loading ...',
			createdByName: 'David Bromley',
			createdDate: 1476739075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476749075104,
			tags: ['section', 'user', 'agreement'],
			content: {
				templates: {
					1234: {
						templateId: 1234,
						templateType: 'user',
						templateName: 'Dos',
						templateDepth: 'section'
					},
					1245: {
						templateId: 1245,
						templateType: 'user',
						templateName: 'Tres',
						templateDepth: 'section'
					},
					1246: {
						templateId: 1246,
						templateType: 'user',
						templateName: 'Quatro',
						templateDepth: 'section'
					},
					1247: {
						templateId: 1247,
						templateType: 'user',
						templateName: 'Cinco',
						templateDepth: 'section'
					}
				}
			},
			validation: {
				isRequired: true
			},
			permissions: {
				view: true,
				edit: true,
				create: true,
				delete: false
			},
			data: {
			}
		},

		2220: {
			templateId: 2220,
			templateType: 'template',
			templateName: 'Test Page',
			templateDepth: 'page',
			content: {
				templates: {
						119: {
							templateId: 119,
							templateType: 'template',
							templateDepth: 'section',
							templateName: 'Test Section',
							// eslint-disable-next-line
							description: 'A section to test out loading ...',
							createdByName: 'David Bromley',
							createdDate: 1476739075104,
							lastEditedName: 'David Bromley',
							lastEditedDate: 1476749075104,
							},
						},
						125: {
							templateId: 125,
							templateType: 'template',
							templateDepth: 'section',
							templateName: 'ANother example section',
							// eslint-disable-next-line
							description: 'A section to test out loading ...',
							createdByName: 'David Bromley',
							createdDate: 1476739075104,
							lastEditedName: 'David Bromley',
							lastEditedDate: 1476749075104,
							content: {
								templates: {
								12: {
									templateType: 'template',
									templateDepth: 'item',
									templateId: 12,
									templateName: 'Event Summary',
									description: 'Summary information for the process',
									}
								}
							},
						}
			}
		},
		2221: {
			templateId: 2221,
			templateDepth: 'page',
			templateType: 'user',
			templateName: 'Parties',
			description: 'Default parties selection screen', // eslint-disable-line max-len
			version: '1.0',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			tags: ['Agreements', 'Parties', 'Component'],
			content: {
				templates: {
					119: {
						templateName: 'Component Loader',
						templateDepth: 'section',
						templateType: 'component',
						description: 'Section that loads the appropriate component',
						component: 'PartiesSelect',
						templateId: 119
					}
				}
			}
		},
		2222: {
			templateId: 2222,
			templateDepth: 'page',
			templateType: 'user',
			templateName: 'Rent',
			description: 'Default Agreement Rent selection screen', // eslint-disable-line max-len
			version: '1.0',
			createdByName: 'David Bromley',
			createdDate: 1476759045104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476459075104,
			tags: ['Agreements', 'Rent', 'Component'],
			content: {
				templates: {
					120: {
						templateName: 'Component Loader',
						templateDepth: 'section',
						templateType: 'component',
						description: 'Section that loads the appropriate component',
						component: 'RentSelect',
						templateId: 120
					}
				}
			}
		},
		2223: {
			templateId: 2223,
			templateType: 'user',
			templateDepth: 'page',
			templateName: 'Other Info',
			description: 'Default page for miscellaneous Info', // eslint-disable-line max-len
			version: '1.0',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			tags: ['Agreements', 'Template'],
			content: {
				templates: {
				119: {
					templateName: 'Agreement Additional Information',
					templateDepth: 'section',
					templateType: 'user',
					description: 'this first section of addtional information',
					templateId: 119
				},
				120: {
					templateName: 'Agreement Financial Information',
					templateDepth: 'section',
					templateType: 'user',
					description: 'Allows users to enter financial information about their agreement (default)', // eslint-disable-line
					templateId: 120
				},
				122: {
					templateName: 'Agreement Author Information',
					templateDepth: 'section',
					templateType: 'user',
					description: 'Allows users to enter information about who drafted the agreement',
					templateId: 122
				}
			}
			}
		},
		//
		//
		// SECTIONS
		//
		//
		118: {
			templateId: 118,
			templateType: 'user',
			templateDepth: 'section',
			templateName: 'Default Section',
			// eslint-disable-next-line
			description: 'A section is a convenient grouping for items that are conceptually similar. Nomos one uses sections to control editing permissions.',
			createdByName: 'David Bromley',
			createdDate: 1476739075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476749075104,
			content: {
				templates: {
				}
			}
		},
		119: {
			templateId: 119,
			templateType: 'user',
			templateDepth: 'section',
			templateName: 'Test Section',
			// eslint-disable-next-line
			description: 'A section to test out loading ...',
			createdByName: 'David Bromley',
			createdDate: 1476739075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476749075104,
			content: {
				templates: {
					12: {
						templateId: 12,
						templateName: 'Input Text',
						templateDepth: 'item',
						templateType: 'component',
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
					}
				}
			}
		},
		120: {
			templateId: 120,
			templateType: 'user',
			templateDepth: 'section',
			templateName: 'Events Summary',
			description: 'first section of the Event process',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'Gareth Bedford',
			lastEditedDate: 1476759075104,
			content: {
				templates: {
					22: {
						templateId: 22,
						templateName: 'Title',
						templateDepth: 'item',
						templateType: 'custom',
					},
					23: {
						templateId: 23,
						templateName: 'Buttons',
						templateDepth: 'item',
						templateType: 'custom',
					}
				}
			}
		},
		122: {
			templateId: 122,
			templateType: 'user',
			templateDepth: 'section',
			templateName: 'Event Changes',
			description: 'Shows what has changed in the event',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'Gareth Bedford',
			lastEditedDate: 1476759075104,
			content: {
				templates: {
					22: {
						templateId: 22,
						templateName: 'Title',
						templateDepth: 'item',
						templateType: 'custom',
					},
					23: {
						templateId: 23,
						templateName: 'Buttons',
						templateDepth: 'item',
						templateType: 'custom',
					}
				}
			}
		},
		123: {
			templateId: 123,
			templateType: 'user',
			templateDepth: 'section',
			templateName: 'Event Documentation',
			description: 'Shows the Event documentation interface',
			createdByName: 'David Bromley',
			createdDate: 1476759075104,
			lastEditedName: 'David Bromley',
			lastEditedDate: 1476759075104,
			content: {
				templates: {
					22: {
						templateId: 22,
						templateName: 'Title',
						templateDepth: 'item',
						templateType: 'custom',
					},
					23: {
						templateId: 23,
						templateName: 'Buttons',
						templateDepth: 'item',
						templateType: 'custom',
					}
				}
			}
		},
		//
		//
		// CHILD DATA
		//
		1234: {
			templateId: 1234,
			templateType: 'user',
			templateName: 'Dos',
			templateDepth: 'section',
			content: {
				templates: {
					1245: {
						templateId: 1245,
						templateType: 'user',
						templateName: 'Tres',
						templateDepth: 'section'
					}
				}
			}
		},
		1245: {
			templateId: 1245,
			templateType: 'user',
			templateName: 'Tres',
			templateDepth: 'section',
			content: {
				templates: {
					1: {
						templateId: 1
					}
				}
			}
		},
		1246: {
			templateId: 1246,
			templateType: 'user',
			templateName: 'Quatro',
			templateDepth: 'section',
			content: {
				templates: {
					1: {
						templateId: 1
					}
				}
			}
		},
		1247: {
			templateId: 1247,
			templateType: 'user',
			templateName: 'Cinco',
			templateDepth: 'section',
			content: {
				templates: {
					1: {
						templateId: 1
					}
				}
			}
		},
		//
		//
		// FAKE DATA
		//
		1: {
			templateId: 1,
			templateType: 'custom',
			templateName: 'Custom',
			templateDepth: 'item',
			content: {
			}
		},
		12: {
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
		},
		13: {
			templateId: 13,
			templateType: 'component',
			templateDepth: 'item',
			templateName: 'Info',
			component: 'Info',
			description: 'Default heading Item',
			content: {
				component: 'Info',
				props: {
					value: 'Member since Jan 2014'
				}
			}
		},
		14: {
			templateId: 14,
			templateType: 'component',
			templateDepth: 'item',
			templateName: 'Default Switch Item',
			component: 'InputSwitch',
			description: 'Default text input',
			content: {
				component: 'InputSwitch',
				props: {
					value: 'Save my settings'
				}
			}
		},
		22: {
			templateId: 22,
			templateName: 'Title',
			templateDepth: 'item',
			templateType: 'custom',
			content: {
			}
		},
		23: {
			templateId: 23,
			templateName: 'Buttons',
			templateDepth: 'item',
			templateType: 'custom',
			content: {
			}
		}
	}
};