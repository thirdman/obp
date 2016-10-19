import React, {Component} from 'react';
import FuzzySet from 'fuzzyset.js';
import {
	ApiClient as client,
	MyobHelper as myobClient,
	ReactSafePromise as safePromise
} from 'helpers';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import {
	Button,
	ButtonGroup,
	Column,
	ContentItem,
	Icon,
	InputToggle,
	InputSelect,
	Message,
	Row,
	Section,
	SparkPercentage,
	Statistic
	} from 'components';
import { connect } from 'state';

const buttonGroupData = [{
	name: 'match',
	title: 'Match Entities',
	subtitle: '(between MYOB and Nomos One)',
	showButton: 'true',
	descriptionTitle: 'Best For',
	description: 'Users who have been using both MYOB and nomos one for a while and have existing entities in each.', // eslint-disable-line max-len
	classes: ['hero'],
	onClickReturn: 'match'
}, {
	name: 'import',
	title: 'Import MYOB Contacts',
	subtitle: '(from MYOB to Nomos one)',
	showButton: 'true',
	descriptionTitle: 'Best For',
	description: 'Users are new to nomos one and have been using MYOB for a while',
	classes: ['hero'],
	onClickReturn: 'import'
}, {
	name: 'export',
	title: 'Export Nomos One Entities',
	subtitle: '(from Nomos One to MYOB)',
	showButton: 'true',
	descriptionTitle: 'Best For',
	description: 'users are new to MYOB and have been using nomos one for a while',
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
		exportError: false,
		nomosEntitiesCopy: [],
		myobContactsCopy: [],
		myobTaxCodes: [],
		nomosEntities: [],
		myobContacts: [],
		lkedEntities: [],
		matchedArray: [],
		exporting: null,
		importing: null,
		importType: null,
		exportingType: 'company',
		taxCode: null,
		freightTaxCode: null
	}

	componentDidMount() {
		myobClient.appStore = this.context.store.app;
		if (this.isConnected()) {
			this.fetchData();
		}
	}

	render() {
		const {
			loaded,
			loading,
			nomosEntities,
			myobContacts,
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
									title="MYOB Contacts"
									content={myobContacts.length}
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
								<Column occupy={5}><h4>{'nomos one'}</h4></Column>
								<Column occupy={4}><h4>{'MYOB'}</h4></Column>
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
		const { currentEntitySection, exportError } = this.state;
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
							classNameProps={['highlighted']}
							icon="chevron-left" />
						<Row>
							<Column occupy={4}><h4>{'NOMOS ONE'}</h4></Column>
							<Column occupy={4}><h4>{'MYOB'}</h4></Column>
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
						title="Export to MYOB"
						description={`These entities exist in nomos one.
							You can create them in MYOB by cicking the
							export button`}>
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']} />
						<Row>
							<Column occupy={9}><h4>{'NOMOS ONE ENTITY'}</h4></Column>
							<Column occupy={3}>{''}</Column>
						</Row>
						{exportError &&
							<Row>
								<Column occupy={9}>
									<Message
										type="error"
										content={exportError}
										timeout={this.clearError} />
								</Column>
							</Row>
						}
						{ this.getExportRows() }
					</Section>
				);
			case 'import':
				return (
					<Section
						hasDivider
						title="Import to nomos one"
						description={`These contacts exist in MYOB
							but don't appear in nomos one. You can
							create them as entities in nomos one by
							clicking the import button`}>
						<Button
							content="Back"
							onClickProps={this.switchSection(null)}
							classNameProps={['highlighted']} />
						<Row>
							<Column occupy={9}><h4>{'MYOB CONTACT'}</h4></Column>
							<Column occupy={3}>{''}</Column>
						</Row>
						{ this.getImportRows() }
					</Section>
				);
			default:
				return (
					<Section hasDivider title={'Manage Entities & Contacts'} >
						<ButtonGroup
							type={'hero'}
							hasData
							optionData={buttonGroupData}
							onClickProps={this.switchSection} />
					</Section>
				);
		}
	}

	getExportRows() {
		const {
			nomosEntities,
			exporting,
			myobTaxCodes,
			taxCode = '',
			freightTaxCode = '',
			exportingType
		} = this.state;
		let match;

		return nomosEntities.map((entity, index) => {
			match = _.isEqual(exporting, entity);
			return (
				<Row key={`export-${index}`}>
					<Column occupy={9}>
						{entity.entityName}
					</Column>
					{match &&
						<Column occupy={4}>
							<ContentItem title="Type*">
								<div style={{display: 'block'}} >
									<InputSelect
										color="white"
										classNameProps={['wide']}
										onClickProps={this.setExportType}
										options={[
											{ title: 'Company', value: 'company' },
											{ title: 'Individual', value: 'individual' }
										]}
										content={exportingType || ''} />
								</div>
							</ContentItem>
							<ContentItem title="Tax Code*">
								<div style={{display: 'block'}} >
									<InputSelect
										color="white"
										classNameProps={['wide']}
										onClickProps={this.setTaxCode}
										options={myobTaxCodes}
										content={taxCode || ''} />
								</div>
							</ContentItem>
							<ContentItem title="Freight Tax Code*">
								<div style={{display: 'block'}} >
									<InputSelect
										color="white"
										classNameProps={['wide']}
										onClickProps={this.setFreightCode}
										options={myobTaxCodes}
										content={freightTaxCode || ''} />
								</div>
							</ContentItem>
						</Column>
					}
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
									classNameProps={['highlighted']} />
								<Button
									content="Cancel"
									onClickProps={this.setExport(null)}
									classNameProps={['grey']} />
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
			myobContacts,
			importing,
			importType
		} = this.state;
		let match;
		let typeMatch;
		return myobContacts.map((contact, index) => {
			match = _.isEqual(importing, contact);
			let { IsIndividual, CompanyName, FirstName, LastName } = contact;
			return (
				<Row key={`import-${index}`}>
					<Column occupy={match ? 5 : 9}>
						{!IsIndividual ? decodeURI(CompanyName) : decodeURI(`${FirstName} ${LastName}`)}
					</Column>
					{match &&
						<Column occupy={4}>
							<div style={{display: 'block'}} >
							{entityTypes.map((type, tIndex) => {
								typeMatch = type === importType;
								return (
									<span
										key={`type-${tIndex}`}
										onClick={this.setImport(contact, type)}>
										<InputToggle
											isSelected={typeMatch}
											content={type}
											isButton={false}
											classNameProps={typeMatch ? ['blue'] : []}
										/>
									</span>
								);
							})}
							</div>
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
									classNameProps={['highlighted']} />
								<Button
									content="Cancel"
									onClickProps={this.setImport(null)}
									classNameProps={['grey']} />
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
						Try importing contacts from MYOB,
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
				let { IsIndividual, CompanyName, FirstName, LastName } = pair.contact;
				return (
					<Row key={`pair-match-${pairIndex}`}>
						<Column occupy={4}>
							{`${pair.entity.entityName}`}
						</Column>
						<Column occupy={4}>
							{!IsIndividual ? decodeURI(CompanyName) : decodeURI(`${FirstName} ${LastName}`)}
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

		return lkedEntities.map((pair, pairIndex) => {
			let { IsIndividual, CompanyName, FirstName, LastName } = pair.contact;
			return (
				<Row key={`pairing-${pairIndex}`}>
					<Column occupy={5}>
						{`${pair.entity.entityName}`}
					</Column>
					<Column occupy={4}>
						{!IsIndividual ? decodeURI(CompanyName) : decodeURI(`${FirstName} ${LastName}`)}
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
			);
		});
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
			this.loading('Getting MYOB tax codes ....');
			return this.safePromise(myobClient.request(
				'post',
				`organisations/${currentOrg.id}/myob/taxCodesMyob`,
				currentOrg.accessTokens.myob,
				currentOrg
			));
		})
		.then((res) => {
			console.log(res.taxCodes);
			this.setState({
				myobTaxCodes: res.taxCodes && res.taxCodes.Items.map((code) => {
					return {
						title: `${code.Code} - ${code.Description}`,
						value: code.UID
					};
				})
			});
			this.loading('Getting MYOB contacts ....');
			return this.safePromise(myobClient.request(
				'post',
				`organisations/${currentOrg.id}/myob/contactsMyob`,
				currentOrg.accessTokens.myob,
				currentOrg
			));
		})
		.then((res) => {
			this.setState({
				myobContactsCopy: res.contacts.Items
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
		const myobContactsState = this.state.myobContactsCopy;
		let entities = [];
		let contacts = [];
		let lkedEntities = [];
		let lkedMyobEntities = [];
		let linkedInfo = null;

		entities = nomosEntitiesState.filter((entity) => {
			linkedInfo = this.entityIsLinked(entity.entityJson);
			if (linkedInfo) {
				lkedEntities.push({
					entity,
					contact: linkedInfo
				});
				lkedMyobEntities.push(linkedInfo.UID);
				return false;
			}
			return true;
		});

		contacts = myobContactsState.filter((myobEntity) => {
			if (lkedMyobEntities.indexOf(myobEntity.UID) > -1) {
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
				let {
					Addresses,
					IsIndividual,
					CompanyName,
					FirstName,
					LastName
				} = contact;
				if (entity.entityEmail ===
						Addresses &&
						Addresses[0] &&
						Addresses[0].Email) {
					match = {
						position: contactIndex,
						degree: 1
					};
				} else {
					tryMatch = FuzzySet([entity.entityName])
						.get(!IsIndividual ? CompanyName : `${FirstName} ${LastName}`);
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
			myobContacts: contacts,
			matchedArray,
			lkedEntities
		});
	}

	entityIsLinked(entityJson) {
		if (!entityJson
			|| !entityJson.integration
			|| !entityJson.integration.myob) {
			return false;
		}
		return entityJson.integration.myob || false;
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
						myob: {
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
						myob: ''
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
		let { IsIndividual, CompanyName, FirstName, LastName } = importing;

		let userObject = {
			entityName: !IsIndividual ? decodeURI(CompanyName) : decodeURI(`${FirstName} ${LastName}`),
			entityType: importType,
			entityFirmId: currentOrg.id,
			entityJson: {
				integration: {
					myob: {
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
	setTaxCode(taxCode = '') {
		return () => {
			this.setState({ taxCode });
		};
	}

	@autobind
	setFreightCode(freightTaxCode = '') {
		return () => {
			this.setState({ freightTaxCode });
		};
	}

	@autobind
	setExportType(exportingType) {
		return () => {
			this.setState({ exportingType });
		};
	}

	@autobind
	doExport() {
		const { exporting, taxCode, freightTaxCode, exportingType } = this.state;
		let {
			entityEmail,
			entityName,
			entityFirstName,
			entityMiddleNames,
			entityLastName
		} = exporting;
		if (!taxCode || !freightTaxCode) {
			return this.setState({exportError: 'Please select the required fields.'});
		}
		entityFirstName = `${entityFirstName}${entityMiddleNames ? ' ' + entityMiddleNames : ''}`;
		let isIndividual = exportingType === 'individual';
		let contactObject = {
			CompanyName: isIndividual ? '' : entityName,
			FirstName: isIndividual ? entityFirstName : '',
			LastName: isIndividual ? entityLastName : '',
			IsIndividual: isIndividual,
			Addresses: [{
				Email: entityEmail
			}],
			SellingDetails: {
				SaleLayout: 'NoDefault',
				TaxCode: {
					UID: taxCode
				},
				FreightTaxCode: {
					UID: freightTaxCode
				}
			}
		};

		this.export(contactObject)
		.then((res) => {
			console.log(res);
			contactObject = {
				...contactObject,
				UID: res && res.contacts
			};
			this.updateContactState(null, contactObject);
			this.link(exporting, contactObject)();
		})
		.catch((err) => {
			this.loading('Failed to export entity to MYOB');
			throw err;
		});
	}

	@autobind
	export(contact) {
		const { currentOrg = {} } = this.context.store.app;
		return this.safePromise(myobClient.request(
			'post',
			`organisations/${currentOrg.id}/myob/contactsPostMyob`,
			currentOrg.accessTokens.myob,
			currentOrg,
			{ contact }
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
		const myobContactsCopy = this.state.myobContactsCopy;
		let contacts = myobContactsCopy || [];
		let updatedMyobContactsCopy;
		if (old) {
			updatedMyobContactsCopy = contacts.map((contact) => {
				if (contact.UID === old.UID) {
					return updated;
				}
				return contact;
			});
		} else {
			updatedMyobContactsCopy = contacts.slice();
			updatedMyobContactsCopy.push(updated);
		}

		this.setState({ myobContactsCopy: updatedMyobContactsCopy });
	}

	isConnected() {
		const { currentOrg = {} } = this.context.store.app;
		if (currentOrg.accessTokens &&
			currentOrg.accessTokens.myob &&
			currentOrg.accessTokens.myob.connectedAt) {
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

	@autobind
	clearError() {
		this.setState({ exportError: '' });
	}
}

export default safePromise(EntitySection);