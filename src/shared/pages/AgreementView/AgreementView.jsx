import { Component } from 'react';
import { autobind } from 'core-decorators';
import { browserHistory } from 'react-router';
import { View } from 'layouts';
import { ObjectInfo, SubNavWrap } from 'components';
import { Header, Main, Secondary } from 'containers';
// import { connect } from '../../../utils/state';

// const globalStyles = require('../App/App.scss');
const agreement = {
	type: 'agreements',
	id: 5531,
	attributes: {
		insertedDate: 1402012192000,
		insertedBy: 2,
		updatedDate: 1461105380000,
		knownAs: '14 Tansey Crescent \\/, Stoney Stanton',
		internalReferences: [],
		jurisdiction: 'New Zealand',
		agreementType: 'Lease',
		client: 'Landlord',
		currency: 'NZD',
		commercial: 'Yes',
		agreementMode: 'Inactive',
		commencementDate: '1404129600000',
		expiryDate: '1688040000000',
		totalAnnualRent: '50000.00',
		rent: {
			premises: {
				annual: '50000.00',
				monthly: '4166.67',
				weekly: '961.54'
			},
			carparks: {
				annual: '0.00',
				monthly: '0.00',
				weekly: '0.00'
			}
		},
		paymentPeriod: 'Monthly',
		rentPaymentDay: '1st',
		rentPaymentMonth: 'January',
		rentDay: 'Sunday',
		taxation: 'Incl. Tax',
		fileNotes: 'These are some notes',
		initialState: {
			agreement: {
				agreementId: '5531',
				agreementType: 'Lease',
				client: 'Landlord',
				currency: 'NZD',
				commercial: 'Yes',
				agreementMode: 'Active',
				commencementDate: '1404129600000',
				expiryDate: '1688040000000',
				totalAnnualRent: '50000.00',
				rent: {
					premises: {
						annual: '50000.00',
						monthly: '4166.67',
						weekly: '961.54'
					},
					carparks: {
						annual: '0.00',
						monthly: '0.00',
						weekly: '0.00'
					}
				},
				paymentPeriod: 'Monthly',
				rentPaymentDay: '1st',
				rentPaymentMonth: 'January',
				rentDay: 'Sunday',
				taxation: 'Incl. Tax',
				fileNotes: 'These are some notes',
				parties: {
					Landlord: [{
						entityId: '213',
						entityName: 'Mr DAve Philip Bromley'
					}],
					Tenant: [{
						entityId: '435',
						entityName: 'Test ltd This &amp; That &lt;script&gt;alert;&lt;/script&gt;'
					}]
				}
			}
		}
	},
	relationships: {
		organisations: {
			links: {
				self: '/organisations/1/agreements/5531/relationships/organisations',
				related: '/organisations/'
			},
			data: [{
				type: 'organisations',
				id: '1'
			}]
		},
		parties: {
			Landlord: {
				links: {
					self: '/organisations/1/agreements/5531/relationships/parties/Landlord',
					related: '/organisations/1/entities/'
				},
				data: [{
					type: 'entities',
					id: '213'
				}]
			},
			Tenant: {
				links: {
					self: '/organisations/1/agreements/5531/relationships/parties/Tenant',
					related: '/organisations/1/entities/'
				},
				data: [{
					type: 'entities',
					id: '435'
				}]
			}
		}
	}
};

// @connect('store')
export default class AgreementView extends Component {

	componentWillMount() {
		const { routeParams } = this.props;
		console.log(routeParams);
		// const { agreementOverview } = this.context.store.pages;
		// agreementOverview.fetchAgreement(routeParams.sectionName);
	}

@autobind
	onClick(link) {
		return () => {
			browserHistory.push(link);
		};
	}

	render() {
		const { location, routeParams } = this.props;
		// console.log(routeParams);
		console.log(agreement);
		// console.log(location);
		return (
			<View>
				<Header key={'layoutHeader'} title={`Agreement: ${routeParams.sectionName}`} />
				<ObjectInfo
					key={'layoutHero'}
					title={agreement.attributes.knownAs}
					id={`${agreement.id}`}
					type={'agreement'}
					mode={agreement.attributes.agreementMode}
				/>
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={2}
					listData={[
						{label: 'Summary', link: `${location.pathname}/summary`},
						{label: 'Property', link: `${location.pathname}/property`},
						{label: 'Parties', link: `${location.pathname}/parties`},
						{label: 'Rent & Payments', link: `${location.pathname}/rent`},
						{label: 'Events', link: `${location.pathname}/events`}
					]}
				>
					<span onClick={this.onClick('/agreements/1234/parties/edit/')}>
						edit this page
					</span>
				</SubNavWrap>
				<Main key={'layoutMain'} objectData={agreement} content=" " />
				<Secondary key={'layoutSecondary'} />
			</View>
		);
	}
}
