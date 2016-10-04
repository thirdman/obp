/* eslint max-len: off */
import React, {Component} from 'react';
import { ContentItem, InputSelect, InputSwitch, Section } from 'components';

export default class InvoiceSection extends Component {

	render() {
		return (
			<div>
				<Section title={'Settings'}>
					<ContentItem
						type="ButtonSwitch"
						classNameProps={['normal']}
						title="Automatically send invoices to Xero when created"
						helpContent={`By default, nomos one will send your
							invoices to connected applications.`} >
							<InputSwitch
								content={['Yes', 'No']}
								isSelected />
					</ContentItem>
					<ContentItem
						type="ButtonSwitch"
						classNameProps={['normal']}
						title="Allow repeating invoices"
						hasDivider
						helpContent={`Repeating invoices allow you to create an
							invoice once, and have it automatically generate each
							rent period.`} >
							<InputSwitch
								content={['Yes', 'No']}
								isSelected={false} />
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
								content="Select..."
								options={[
									{
										title: '200 - sales',
										value: 200
									}, {
										title: '201 - something else',
										value: 201
									}, {
										title: '203 - another thing',
										value: 203
									},
								]} />
					</ContentItem>
				</Section>

			</div>
		);
	}
}
