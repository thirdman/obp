import React, {Component} from 'react';
import {
	XeroHelper as xeroClient,
	ReactSafePromise as safePromise
} from 'helpers';
import {
	ContentItem,
	InputSelect,
	InputSwitch,
	Section
} from 'components';
import { autobind } from 'core-decorators';
import { connect } from 'state';

@connect('store')
class InvoiceSection extends Component {

	state = {
		loaded: false,
		loading: '',
		error: false,
		xeroCodes: []
	}

	componentDidMount() {
		xeroClient.appStore = this.context.store.app;
		if (this.isConnected()) {
			this.fetchData();
		}
	}

	render() {
		const { currentOrg = {} } = this.context.store.app;
		const {
			loaded,
			loading,
			xeroCodes
		} = this.state;

		let token = currentOrg.accessTokens &&
			currentOrg.accessTokens.xero || null;
		return (
			<div>
				{loaded &&
					<Section title={'Settings'}>
						<ContentItem
							type="ButtonSwitch"
							classNameProps={['normal']}
							title="Automatically send invoices to MYOB when created"
							helpContent={`By default, nomos one will send your
								invoices to connected applications.`} >
								<InputSwitch
									content={['Yes', 'No']}
									onChange={this.toggleSync}
									isSelected={
										token &&
										token.syncInvoice} />
						</ContentItem>
						<ContentItem
							type="Select"
							classNameProps={['normal']}
							title="Default Accounting category"
							hasDivider
							helpContent={`The default category invoices will be
								created in. You can change this individually in your
								accounting app.`} >
								<InputSelect
									options={xeroCodes}
									onClickProps={this.changeCode}
									content={
										token &&
										token.accountToInvoice ||
										''} />
						</ContentItem>
					</Section>
				}
				<div>{ loading }</div>
			</div>
		);
	}

	@autobind
	fetchData() {
		const { currentOrg = {} } = this.context.store.app;
		this.loading('Getting MYOB accounting codes ....');
		this.safePromise(xeroClient.request(
			'post',
			`organisations/${currentOrg.id}/myob/accountCodes`,
			currentOrg.accessTokens.xero,
			currentOrg
		))
		.then((res) => {
			this.filterRelevantCode(
				res.data[0] &&
				res.data[0].xeroAccountCodes &&
				res.data[0].xeroAccountCodes.Account);
			this.loading('');
			this.setState({ loaded: true });
		})
		.catch(this.handleError);
	}

	filterRelevantCode(xeroCodes = []) {
		let filteredCode;
		filteredCode = xeroCodes.filter((code) => {
			return code.Type === 'REVENUE';
		}).map((code) => {
			return {
				title: `${code.Code} - ${code.Name}`,
				value: code.Code
			};
		});

		this.setState({ xeroCodes: filteredCode });
	}

	@autobind
	changeCode(code) {
		return () => {
			const { app } = this.context.store;
			const { currentOrg = {} } = app;
			let newToken;
			let token =
				currentOrg.accessTokens &&
				currentOrg.accessTokens.xero || null;

			if (token) {
				newToken = {
					...token,
					accountToInvoice: code
				};
				this.updateToken(newToken);
			}
		};
	}

	@autobind
	toggleSync() {
		const { app } = this.context.store;
		const { currentOrg = {} } = app;
		let newToken;
		let token =
			currentOrg.accessTokens &&
			currentOrg.accessTokens.xero || null;

		if (token) {
			newToken = {
				...token,
				syncInvoice: !token.syncInvoice
			};
			this.updateToken(newToken);
		}
	}

	updateToken(newToken) {
		const { app } = this.context.store;
		const { currentOrg = {} } = app;
		let token =
			currentOrg.accessTokens &&
			currentOrg.accessTokens.xero || null;

		this.safePromise(xeroClient.request(
			'put',
			`organisations/${currentOrg.id}/accessTokens?api=myob`,
			token,
			currentOrg,
			{ newToken }
		))
		.then(() => {
			app.updateCurrentOrg('accessTokens', {
				...currentOrg.accessTokens,
				xero: newToken
			});
		})
		.catch(this.handleError);
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
	handleError(err) {
		this.loading(`Please contact support,
			the error is: ${decodeURI(err)}`,
			true);
		throw err;
	}
}

export default safePromise(InvoiceSection);