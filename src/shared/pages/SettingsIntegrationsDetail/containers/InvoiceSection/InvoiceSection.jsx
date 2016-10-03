/* eslint max-len: off */
import React, {Component} from 'react';
import { ContentItem, Section } from 'components';

export default class InvoiceSection extends Component {

	render() {
		return (
			<div>
				<Section title={'Settings'}>
					<ContentItem
						type="ButtonSwitch"
						classNameProps={['normal']}
						title="Automatically send invoices to Xero when created"
						// description="By default, nomos one will keep your invoices in sync with external applications."
						helpContent="By default, nomos one will send your invoices to connected applications."
						>
							{'BUTTON SWITCH COMPONENT'}
					</ContentItem>
					<ContentItem
						type="ButtonSwitch"
						classNameProps={['normal']}
						title="Allow repeating invoices"
						hasDivider
						// description="By default, nomos one will keep your invoices in sync with external applications."
						helpContent="Repeating invoices allow you to creat an invoice once, and have it automatically generate each rent period."
						>
							{'BUTTON SWITCH COMPONENT'}
					</ContentItem>
					<ContentItem
						type="Select"
						classNameProps={['normal']}
						title="Default Accounting category"
						hasDivider
						// description="By default, nomos one will keep your invoices in sync with external applications."
						helpContent="The default category invoices ill be created in. You can change this individually in your accounting app."
						>
							{'DROPDOWN COMPONENT'}
					</ContentItem>
				</Section>

			</div>
		);
	}
}
