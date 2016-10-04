import React, {Component} from 'react';
import FuzzySet from 'fuzzyset.js';
import {
	ApiClient as client,
	XeroHelper as xeroClient,
	ReactSafePromise as safePromise
} from 'helpers';
import { autobind } from 'core-decorators';
import { Button, ButtonGroup, Column, Icon, Row, Section, Statistic } from 'components';
import { connect } from '../../../../../utils/state';

@connect('store')
class EntitySection extends Component {

	state = {
		loaded: false,
		loading: '',
		error: false,
		nomosEntities: [],
		xeroContacts: [],
		xeroCodes: [],
		lkedEntities: [],
		matchedArray: []
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
			xeroCodes
		} = this.state;
		const buttonGroupData = [{
				name: 'match',
				title: 'Match Entities',
				subtitle: '(between Xero and Nomos One)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'Users who have been using both Xero and Nomos for a while and have existing entities in each.', // eslint-disable-line max-len
				classes: ['hero']
			}, {
				name: 'import',
				title: 'Import Xero Contacts',
				subtitle: '(from Xero to Nomos one)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'Users are new to Nomos One and have been using Xero for a while',
				classes: ['hero']
			}, {
				name: 'export',
				title: 'Export Nomos One Entities',
				subtitle: '(from Nomos One to Xero)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'users are new to Nomos One and have been using Xero for a while',
				classes: ['hero']
			}];
		return (
			<div>
				<h3>{'Entity Section'}</h3>
				{loaded &&
					<div>
					<Row>
						<Column occupy={3}>
							<h4>Status</h4>
							<span>{'Connected'}</span>
						</Column>
						<Column occupy={3}>
							<h4>Nomos Entities</h4>
							<Statistic
								title="Nomos Entities"
								content={nomosEntities.length}
								isAnimated
								classNameProps={['isHorizontal', 'hasDivider']}
							/>
						</Column>
						<Column occupy={3}>
							<h4>Xero Contacts</h4>
							<span>
								{`${xeroContacts.length}`}
							</span>
						</Column>
						<Column occupy={3}>
							<h4>Xero Codes</h4>
							<span>
								{`${xeroCodes.xeroAccountCodes.Account.length}`}
							</span>
						</Column>
					</Row>
						<Section hasDivider title="Existing Entities">
							<Row>
								<Column occupy={5}>{'Name'}</Column>
								<Column occupy={4}>{'Provider'}</Column>
								<Column occupy={1}>{'Link Icon'}</Column>
								<Column occupy={2}>{'Action'}</Column>
							</Row>
							{ this.getLinkedRows() }
						</Section>

						<Section hasDivider title="Suggesting Matches">
							<Row>
								<Column occupy={4}>{'NOMOS ONE'}</Column>
								<Column occupy={4}>{'XERO'}</Column>
								<Column occupy={1}>{'PROXIMITY'}</Column>
								<Column occupy={3}>{''}</Column>
							</Row>
							{ this.getSuggestedMatchingRows() }
						</Section>
					</div>
				}

				<div>{ loading }</div>
				<ButtonGroup type={'hero'} hasData optionData={buttonGroupData} />
			</div>
		);
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
							{pair.degree}
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
							pair.entity,
							pair.contact
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
			this.setState({ nomosEntities: res.data });
			this.loading('Getting Xero contacts ....');
			return this.safePromise(xeroClient.request(
				'post',
				`organisations/${currentOrg.id}/xero/contacts`,
				currentOrg.accessTokens.xero,
				currentOrg
			));
		})
		.then((res) => {
			this.setState({ xeroContacts: res.data[0] });
			this.loading('Getting Xero account codes ....');
			return this.safePromise(xeroClient.request(
				'post',
				`organisations/${currentOrg.id}/xero/accountCodes`,
				currentOrg.accessTokens.xero,
				currentOrg
			));
		})
		.then((res) => {
			this.setState({ xeroCodes: res.data[0] });
			this.loading('Matching entities with contacts ....');
			this.filterLinkedEntities();
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
		const nomosEntitiesState = this.state.nomosEntities;
		const xeroContactsState = this.state.xeroContacts
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
	link() {
		return () => {
			console.log('kennek unlink me now');
		};
	}

	@autobind
	unlink() {
		return () => {
			console.log('kennek unlink me now');
		};
	}

	isConnected() {
		const { currentOrg = {} } = this.context.store.app;
		if (currentOrg.accessTokens ||
			currentOrg.accessTokens.xero ||
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
}

export default safePromise(EntitySection);