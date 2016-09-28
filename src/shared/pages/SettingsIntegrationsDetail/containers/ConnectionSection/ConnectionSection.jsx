/* eslint max-len: off */
import React, {Component} from 'react';
import { Button } from 'components';
import { autobind } from 'core-decorators';
import { ApiClient as client } from 'helpers';
import { connect } from '../../../../../utils/state';

@connect('store')
export default class ConnectionSection extends Component {

	@autobind
	onClick() {
		const { currentOrg = null } = this.context.store.app;

		client.post(`/organisations/${currentOrg}/xero/generateToken`)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	render() {
		return (
			<div>
				<h3>{'Connection Section'}</h3>
				<div>{'Here goes the connection section'}</div>
				<Button
					content={'Connect to Xero'}
					onClickProps={this.onClick} />
			</div>
		);
	}
}
