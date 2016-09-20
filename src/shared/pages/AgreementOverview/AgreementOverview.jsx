import { Component } from 'react';
import { Overview } from 'layouts';
import { connect } from '../../../utils/state';

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

@connect('store')
export default class AgreementOverview extends Component {

	/**
	 *
	componentWillMount() {
		const { routeParams } = this.props;
		const { agreementOverview } = this.context.store.pages;

		agreementOverview.fetchAgreement(routeParams.agreementId);
	}

	/**
	 */
	render() {
		console.log(agreement);

		return (
			<Overview>
				<p key={'layoutHeader'}>We are at 1 !</p>
				<p key={'layoutHero'}>We are at 2 !</p>
				<p key={'layoutNav'}>We are at 3 !</p>
				<p key={'layoutSupplimentary'}>We are at 4 !</p>
				<p key={'layoutMain'}>We are at 5 !</p>
				<p key={'layoutSecondary'}>We are at 6 !</p>
				<p key={'layoutFooter'}>We are at 7 !</p>
			</Overview>
		);
	}
}
