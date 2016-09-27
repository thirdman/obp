import { Component } from 'react';
import { Overview } from 'layouts';
import { Breadcrumbs, SubNavWrap } from 'components';
import { Header, ObjectSummary, Main, Secondary} from 'containers';
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
					<Breadcrumbs key={'layoutBreadcrumbs'} params={routeParams} />
				<Header key={'layoutHeader'} title="Agreement Overview" />
	 */
	render() {
		console.log(agreement);
		const { location, routeParams, route} = this.props;
		console.log('route: ', route);
		console.log('routeParams: ', routeParams);
		return (
			<Overview>
				<div key={'layoutHeader'} >
					<Breadcrumbs params={routeParams} route={route} />
					<Header title="Agreement Overview" />
				</div>
				<ObjectSummary key={'layoutHero'} objectData={agreement} />
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={0}
					listData={[
						{label: 'Summary', link: `${location.pathname}/summary`},
						{label: 'Property', link: `${location.pathname}/property`},
						{label: 'Parties', link: `${location.pathname}/parties`},
						{label: 'Rent & Payments', link: `${location.pathname}/rent`},
						{label: 'Events', link: `${location.pathname}/events`},
					]}
				/>
				<Main key={'layoutMain'} objectData={agreement} content=" " />
				<Secondary key={'layoutSecondary'} />
			</Overview>
		);
	}
}
