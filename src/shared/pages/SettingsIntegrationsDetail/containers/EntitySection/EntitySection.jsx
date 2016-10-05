import React, {Component} from 'react';
import FuzzySet from 'fuzzyset.js';
import {
	ApiClient as client,
	XeroHelper as xeroClient,
	ReactSafePromise as safePromise
} from 'helpers';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import {
	Button,
	ButtonGroup,
	Column,
	Icon,
	Row,
	Section,
	SparkPercentage,
	Statistic
	} from 'components';
import { connect } from '../../../../../utils/state';

const buttonGroupData = [{
	name: 'match',
	title: 'Match Entities',
	subtitle: '(between Xero and Nomos One)',
	showButton: 'true',
	descriptionTitle: 'Best For',
	description: 'Users who have been using both Xero and nomos one for a while and have existing entities in each.', // eslint-disable-line max-len
	classes: ['hero'],
	onClickReturn: 'match'
}, {
	name: 'import',
	title: 'Import Xero Contacts',
	subtitle: '(from Xero to Nomos one)',
	showButton: 'true',
	descriptionTitle: 'Best For',
	description: 'Users are new to nomos one and have been using Xero for a while',
	classes: ['hero'],
	onClickReturn: 'import'
}, {
	name: 'export',
	title: 'Export Nomos One Entities',
	subtitle: '(from Nomos One to Xero)',
	showButton: 'true',
	descriptionTitle: 'Best For',
	description: 'users are new to Xero and have been using nomos one for a while',
	classes: ['hero'],
	onClickReturn: 'export'
}];

@connect('store')
class EntitySection extends Component {

	state = {
		currentEntitySection: null,
		loaded: false,
		loading: '',
		error: false,
		nomosEntitiesCopy: [],
		xeroContactsCopy: [],
		nomosEntities: [],
		xeroContacts: [],
		lkedEntities: [],
		matchedArray: [],
		exporting: null,
		importing: null,
		importType: null
	}

	componentDidMount() {
		xeroClient.appStore = this.context.store.app;
		if (this.isConnected()) {
			this.fetchData();
		}
	}

	render() {
		const {
			loaded,
			loading,
			nomosEntities,
			xeroContacts,
			lkedEntities
		} = this.state;

		return (
			<div>
				{loaded &&
					<div>
						<Row>
							<Column occupy={3}>
								<Statistic
									title="Status"
									content={'Connected'}
									classNameProps={['isHorizontal', 'hasDivider']}
								/>
							</Column>
							<Column occupy={3}>
								<Statistic
									title="Nomos Entities"
									content={nomosEntities.length}
									isAnimated
									classNameProps={['isHorizontal', 'hasDivider']}
								/>
							</Column>
							<Column occupy={3}>
								<Statistic
									title="Xero Contacts"
									content={xeroContacts.length}
									isAnimated
									classNameProps={['isHorizontal', 'hasDivider']}
								/>
							</Column>
							<Column occupy={3}>
								<Statistic
									title="Linked"
									content={lkedEntities.length}
									isAnimated
									classNameProps={['isHorizontal', 'hasDivider']}
								/>
							</Column>
						</Row>
						<Section hasDivider title="Existing Entities">
							<Row>
								<Column occupy={5}><h4>{'Name'}</h4></Column>
								<Column occupy={4}><h4>{'Provider'}</h4></Column>
								<Column occupy={1}>{''}</Column>
								<Column occupy={2}><h4>{'Action'}</h4></Column>
							</Row>
							{ this.getLinkedRows() }
						</Section>
						{ this.getCurrentEntitySection() }
					</div>
				}
				<div>{ loading }</div>
			</div>
		);
	}

	getCurrentEntitySection() {
		const { currentEntitySection } = this.state;
		switch (currentEntitySection) {
			case 'match':
				return (
					<Section
						hasDivider
						title="Suggested Matches"
						description={`These entities exist in both
							systems and appear similar. The proximity
							measure indicates how similar they are.`}>
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']} />
						<Row>
							<Column occupy={4}><h4>{'NOMOS ONE'}</h4></Column>
							<Column occupy={4}><h4>{'XERO'}</h4></Column>
							<Column occupy={1}><h4>{'PROXIMITY'}</h4></Column>
							<Column occupy={3}><h4>{''}</h4></Column>
						</Row>
						{ this.getSuggestedMatchingRows() }
					</Section>
				);
			case 'export':
				return (
					<Section
						hasDivider
						title="Export to Xero"
						description={`These entities exist in nomos one.
							You can create them in Xero by cicking the
							export button`}>
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']} />
						<Row>
							<Column occupy={9}><h4>{'NOMOS ONE ENTITY'}</h4></Column>
							<Column occupy={3}>{''}</Column>
						</Row>
						{ this.getExportRows() }
					</Section>
				);
			case 'import':
				return (
					<Section
						hasDivider
						title="Import to nomos one"
						description={`These contacts exist in Xero
							but don't appear in nomos one. You can
							create them as entities in nomos one by
							clicking the import button`}>
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']} />
						<Row>
							<Column occupy={9}><h4>{'XERO CONTACT'}</h4></Column>
							<Column occupy={3}>{''}</Column>
						</Row>
						{ this.getImportRows() }
					</Section>
				);
			default:
				return (
					<ButtonGroup
						type={'hero'}
						hasData
						optionData={buttonGroupData}
						onClickProps={this.switchSection} />
				);
		}
	}

	getExportRows() {
		const { nomosEntities, exporting } = this.state;
		let match;
		return nomosEntities.map((entity, index) => {
			match = _.isEqual(exporting, entity);
			return (
				<Row key={`export-${index}`}>
					<Column occupy={9}>
						{entity.entityName}
					</Column>
					<Column occupy={3}>
						{!match ?
							<Button
								content="Export"
								onClickProps={this.setExport(entity)}
								classNameProps={['green']} /> :
							<div>
								<Button
									content="Confirm"
									onClickProps={this.doExport}
									classNameProps={['green']} />
								<Button
									content="Cancel"
									onClickProps={this.setExport(null)}
									classNameProps={['green']} />
							</div>
						}
					</Column>
				</Row>
			);
		});
	}

	getImportRows() {
		const entityTypes = ['Individual', 'Company', 'Trust', 'Other'];
		const {
			xeroContacts,
			importing,
			importType
		} = this.state;
		let match;
		let typeMatch;
		return xeroContacts.map((contact, index) => {
			match = _.isEqual(importing, contact);
			return (
				<Row key={`import-${index}`}>
					<Column occupy={match ? 5 : 9}>
						{contact.Name}
					</Column>
					{match &&
						<Column occupy={4}>
							{entityTypes.map((type, tIndex) => {
								typeMatch = type === importType;
								return (
									<div
										key={`type-${tIndex}`}
										onClick={this.setImport(contact, type)}>
										{typeMatch ? ` ((${type})) ` : ` ${type} `}
									</div>
								);
							})}
						</Column>
					}
					<Column occupy={3}>
						{!match ?
							<Button
								content="Import"
								onClickProps={this.setImport(contact)}
								classNameProps={['green']} /> :
							<div>
								<Button
									content="Confirm"
									onClickProps={this.doImport}
									classNameProps={['green']} />
								<Button
									content="Cancel"
									onClickProps={this.setImport(null)}
									classNameProps={['green']} />
							</div>
						}
					</Column>
				</Row>
			);
		});
	}

	getSuggestedMatchingRows() {
		const { matchedArray } = this.state;
		if (!matchedArray.length) {
			return (
				<Row>
					<Column occupy={12}>
						{`No matches found.
						Try importing contacts from Xero,
						or exporting entities form nomos one`}
					</Column>
				</Row>
			);
		}

		return matchedArray
			.sort((pairA, pairB) => {
				return pairB.degree - pairA.degree;
			})
			.map((pair, pairIndex) => {
				return (
					<Row key={`pair-match-${pairIndex}`}>
						<Column occupy={4}>
							{`${pair.entity.entityName}`}
						</Column>
						<Column occupy={4}>
							{`${pair.contact.Name}`}
						</Column>
						<Column occupy={1}>
							<SparkPercentage
								percentage={Math.round(pair.degree)} />
						</Column>
						<Column occupy={3}>
							<Button
								content="Connect"
								onClickProps={this.link(
									pair.entity,
									pair.contact
								)}
								classNameProps={['green']} />
						</Column>
					</Row>
				);
			});
	}

	getLinkedRows() {
		const { lkedEntities } = this.state;
		if (!lkedEntities.length) { return null; }

		return lkedEntities.map((pair, pairIndex) => (
			<Row key={`pairing-${pairIndex}`}>
				<Column occupy={5}>
					{`${pair.entity.entityName}`}
				</Column>
				<Column occupy={4}>
					{`${pair.contact.Name}`}
				</Column>
				<Column occupy={1}>
					{<Icon icon="link" classNameProps={['grey']} size={16} />}
				</Column>
				<Column occupy={2}>
					<Button
						content="Unlink"
						onClickProps={this.unlink(
							pair.entity
						)}
						classNameProps={['text', 'delete']} />
				</Column>
			</Row>
		));
	}

	@autobind
	fetchData() {
		const { currentOrg = {} } = this.context.store.app;

		this.loading('Getting firm entities ....');
		this.safePromise(
			client.get(`organisations/${currentOrg.id}/entities`))
		.then((res) => {
			this.setState({
				nomosEntitiesCopy: res.data
			});
			this.loading('Getting Xero contacts ....');
			return this.safePromise(xeroClient.request(
				'post',
				`organisations/${currentOrg.id}/xero/contacts`,
				currentOrg.accessTokens.xero,
				currentOrg
			));
		})
		.then((res) => {
			this.setState({
				xeroContactsCopy: res.data[0]
			});
			this.loading('Matching entities with contacts ....');
			this.filterLinkedEntities();
			this.loading('');
			this.setState({ loaded: true });
		})
		.catch((err) => {
			console.log(err);
			this.loading(`Please contact support,
				the error is: ${decodeURI(err)}`,
				true);
			throw err;
		});
	}

	filterLinkedEntities() {
		const nomosEntitiesState = this.state.nomosEntitiesCopy;
		const xeroContactsState = this.state.xeroContactsCopy
			.contacts.Contacts.Contact;
		let entities = [];
		let contacts = [];
		let lkedEntities = [];
		let lkedXeroEntities = [];
		let linkedInfo = null;

		entities = nomosEntitiesState.filter((entity) => {
			linkedInfo = this.entityIsLinked(entity.entityJson);
			if (linkedInfo) {
				lkedEntities.push({
					entity,
					contact: linkedInfo
				});
				lkedXeroEntities.push(linkedInfo.ContactID);
				return false;
			}
			return true;
		});

		contacts = xeroContactsState.filter((xeroEntity) => {
			if (lkedXeroEntities.indexOf(xeroEntity.ContactID) > -1) {
				return false;
			} else {
				return true;
			}
		});

		this.calculateMatching(entities, contacts, lkedEntities);
	}

	calculateMatching(entities = [], contacts = [], lkedEntities = []) {
		let matchedArray = [];
		let tryMatch;
		let match;

		entities.map((entity) => {
			tryMatch = [];
			match = null;

			contacts.map((contact, contactIndex) => {
				if (entity.entityEmail === contact.EmailAddress) {
					match = {
						position: contactIndex,
						degree: 1
					};
				} else {
					tryMatch = FuzzySet([entity.entityName]).get(contact.Name);
					if (tryMatch && tryMatch.length) {
						if ((!match
							|| match.degree < tryMatch[0][0])
							&& tryMatch[0][0] > 0.5) {
							match = {
								position: contactIndex,
								degree: tryMatch[0][0]
							};
							// console.log(tryMatch[0]);
						}
					}
				}
			});
			if (match) {
				matchedArray.push({
					entity,
					contact: contacts[match.position],
					degree: match.degree * 100
				});
			}
		});
		// console.log(matchedArray);
		this.setState({
			nomosEntities: entities,
			xeroContacts: contacts,
			matchedArray,
			lkedEntities
		});
	}

	entityIsLinked(entityJson) {
		if (!entityJson
			|| !entityJson.integration
			|| !entityJson.integration.xero) {
			return false;
		}
		return entityJson.integration.xero || false;
	}

	@autobind
	link(entity, contact) {
		return () => {
			const { currentOrg = {} } = this.context.store.app;
			const userObject = {
				...entity,
				entityJson: {
					...(entity.entityJson || {}),
					integration: {
						...(entity.entityJson &&
							entity.entityJson.integration ||
							{}),
						xero: {
							...contact
						}
					}
				}
			};

			this.safePromise(client.put(
				`organisations/${currentOrg.id}/entities`,
				{ data: { userObject } }
			))
			.then(() => {
				this.updateEntityState(entity, userObject);
				this.filterLinkedEntities();
			})
			.catch((err) => {
				throw err;
			});
		};
	}

	@autobind
	unlink(entity) {
		return () => {
			const { currentOrg = {} } = this.context.store.app;
			const userObject = {
				...entity,
				entityJson: {
					...(entity.entityJson || {}),
					integration: {
						xero: ''
					}
				}
			};

			this.safePromise(client.put(
				`organisations/${currentOrg.id}/entities`,
				{ data: { userObject } }
			))
			.then(() => {
				this.updateEntityState(entity, userObject);
				this.filterLinkedEntities();
			})
			.catch((err) => {
				throw err;
			});
		};
	}

	@autobind
	setImport(importing, importType = 'Individual') {
		return () => {
			this.setState({ importing, importType });
		};
	}

	@autobind
	doImport() {
		const { currentOrg = {} } = this.context.store.app;
		const { importing, importType } = this.state;
		let userObject = {
			entityName: importing.Name,
			entityType: importType,
			entityFirmId: currentOrg.id,
			entityJson: {
				integration: {
					xero: {
						...importing
					}
				}
			}
		};

		this.import(userObject)
		.then((res) => {
			this.updateEntityState(null, {
				...userObject,
				entityId: res.entityId
			});
			this.filterLinkedEntities();
		})
		.catch((err) => {
			this.loading('Failed to import contact');
			throw err;
		});
	}

	@autobind
	import(userObject) {
		const { currentOrg = {} } = this.context.store.app;
		return this.safePromise(client.post(
			`organisations/${currentOrg.id}/entities`,
			{ data: { userObject } }
		));
	}

	@autobind
	setExport(exporting) {
		return () => {
			this.setState({ exporting });
		};
	}

	@autobind
	doExport() {
		const { exporting } = this.state;
		let {
			entityEmail,
			entityName,
			entityFirstName,
			entityLastName
		} = exporting;
		let linkedEntity;

		let contactObject = {
			Contacts: {
				Contact: {
					Name: entityName,
					FirstName: entityFirstName,
					LastName: entityLastName,
					EmailAddress: entityEmail
				}
			}
		};

		this.export(contactObject)
		.then((res) => {
			contactObject = res &&
								res.data &&
								res.data[0] &&
								res.data[0].response &&
								res.data[0].response.Contacts.Contact;
			linkedEntity = {
				...exporting,
				entityJson: {
					...(exporting.entityJson || {}),
					integration: {
						...(exporting.entityJson &&
							exporting.entityJson.integration ||
							{}),
						xero: {
							...contactObject
						}
					}
				}
			};
			this.updateEntityState(null, linkedEntity);
			this.updateContactState(null, contactObject);
			this.filterLinkedEntities();
		})
		.catch((err) => {
			this.loading('Failed to export entity to Xero');
			throw err;
		});
	}

	@autobind
	export(contactObject) {
		const { currentOrg = {} } = this.context.store.app;
		return this.safePromise(xeroClient.request(
			'post',
			`organisations/${currentOrg.id}/xero/contactsPost`,
			currentOrg.accessTokens.xero,
			currentOrg,
			{ contactObject }
		));
	}

	updateEntityState(old, updated) {
		let entities = this.state.nomosEntitiesCopy;
		let updatedNomosEntitiesCopy;
		if (old) {
			updatedNomosEntitiesCopy = entities.map((entity) => {
				if (entity.entityId === old.entityId) {
					return updated;
				}
				return entity;
			});
		} else {
			updatedNomosEntitiesCopy = entities.slice();
			updatedNomosEntitiesCopy.push(updated);
		}

		this.setState({ nomosEntitiesCopy: updatedNomosEntitiesCopy });
	}

	updateContactState(old, updated) {
		const xeroContactsCopy = this.state.xeroContactsCopy;
		let contacts = xeroContactsCopy &&
						xeroContactsCopy.contacts &&
						xeroContactsCopy.contacts.Contacts.Contact ||
						[];
		let updatedXeroContactsCopy;
		if (old) {
			updatedXeroContactsCopy = contacts.map((contact) => {
				if (contact.ContactID === old.ContactID) {
					return updated;
				}
				return contact;
			});
		} else {
			updatedXeroContactsCopy = contacts.slice();
			updatedXeroContactsCopy.push(updated);
			updatedXeroContactsCopy = {
				...xeroContactsCopy,
				contacts: {
					...xeroContactsCopy.contacts,
					Contacts: {
						...xeroContactsCopy.contacts.Contacts,
						Contact: updatedXeroContactsCopy
					}
				}
			};
		}

		this.setState({ xeroContactsCopy: updatedXeroContactsCopy });
	}

	isConnected() {
		const { currentOrg = {} } = this.context.store.app;
		if (currentOrg.accessTokens &&
			currentOrg.accessTokens.xero &&
			currentOrg.accessTokens.xero.connectedAt) {
			return true;
		} else {
			return false;
		}
	}

	loading(loading = '', error = false) {
		this.setState({
			loading,
			error
		});
	}

	@autobind
	switchSection(currentEntitySection) {
		return () => {
			this.setState({ currentEntitySection });
		};
	}
}

export default safePromise(EntitySection);