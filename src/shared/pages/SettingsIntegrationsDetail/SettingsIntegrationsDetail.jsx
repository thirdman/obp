import { Component } from 'react';
import { autobind } from 'core-decorators';
import { browserHistory } from 'react-router';
import { View } from 'layouts';
import { SubNavWrap } from 'components';
import { Header } from 'containers';
// import { connect } from '../../../utils/state';

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
export default class SettingsIntegrationsDetail extends Component {

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
		console.log(routeParams);
		console.log(agreement);
		console.log(location);
		return (
			<View>
				<Header key={'layoutHeader'} title={'PUT TITLE HERE'} />
				<div
					key={'layoutHero'}
				>
					<p>Gareth will put the xero logo here?</p>
				</div>
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={0}
					listData={[
						{label: 'Summary', href: '/integrations/xero'},
						{label: 'Delete?', href: '/integrations/xero'},
						{label: 'Delete?', href: '/integrations/xero'}
					]}
				/>
				<div> key={'layoutMain'} >
					{
					// KENNEK TO PUT API MANAGER DETAIL HERE
					// SO WE CAN SEE IT
					}
				</div>
				<div key={'layoutSecondary'} >
					Temporary text to remind Gareth about this space
				</div>
			</View>
		);
	}
}
