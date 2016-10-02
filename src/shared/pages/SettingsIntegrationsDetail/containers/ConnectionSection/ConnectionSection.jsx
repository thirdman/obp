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
				<h3>{'Connection'}</h3>
				<div className="">
					<p>1. This will open up a login screen for you to access to your {'{ TITLE }'} account.</p>
					<p>2. Select the scope this connection will apply to.</p>
					<p>3. Once confirmed, you will be redirected here and see that the connection is enabled.</p>
					<p>4. Close this window and return to the nomos one application.</p>
				</div>
				<Button
					content={'Connect to Xero'}
					onClickProps={this.onClick}
					classNameProps={['large', 'round', 'highlighted']}
				/>
			</div>
		);
	}
}
