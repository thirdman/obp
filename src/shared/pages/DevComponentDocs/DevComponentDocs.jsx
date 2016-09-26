import React from 'react';
import { SubNavWrap } from 'components';
import * as components from 'components'; // eslint-disable-line no-duplicate-imports
import { View } from 'layouts';
import { Header } from 'containers';

import StyleGuide from './StyleGuide';

const styles = require('./DevComponentDocs.scss');
// const globalStyles = require('../App/App.scss');

const extractComponent = (config) => {
	let compArray = [];
	config.map((cf, index) => {
		return compArray.push(
			React.createElement(
				components[cf.component],
				{
					...cf.props,
					key: `extractedComp${index}`
				}
			)
		);
	});
	return compArray;
};

// map through components and attached its doc with it
Object.keys(components).map((key) => {
	components[key].documentation = require('../../components/' + key + '/docs.md');
});

const DevComponentDocs = () => {
	let compDoc;
	let compDocParts;

	return (
		<View>
			<Header key={'layoutHeader'} title="Nomos One Components" />
			<SubNavWrap
				key={'layoutNav'}
				currentlySelected={1}
				listData={[
					{label: 'Dev Home', href: '/dev'},
					{label: 'Documentation', href: '/dev/docs'},
					{label: 'Icons', href: '/dev/icons'}
				]}
			/>
			<div key={'layoutMain'} className={styles.DevComponentDocs}>
				<StyleGuide title="Nomos one Component Style Guide">
					{
						Object.keys(components).map((key, index) => {
							compDoc = components[key].documentation;
							compDocParts = compDoc.split('*****');
							return (
								<div
									key={`subCompDoc${index}`}
									title={compDocParts[0].replace(/(\r\n|\n|\r)/gm, '') || ''}
									description={compDocParts[2] || ''}
									example={compDocParts[4] || ''}
								>
									{extractComponent(JSON.parse(compDocParts[6].replace(/(\r\n|\n|\r)/gm, '')))}
								</div>
							);
						}).filter(com => { if (com) return com; })
					}
				</StyleGuide>
			</div>
		</View>
	);
};

export default DevComponentDocs;