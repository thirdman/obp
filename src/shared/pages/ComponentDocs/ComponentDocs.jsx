import React from 'react';
import * as components from 'components';
import cx from 'classnames';
import StyleGuide from './StyleGuide';

const styles = require('./ComponentDocs.scss');
const globalStyles = require('../App/App.scss');

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

const ComponentDocs = () => {
	let compDoc;
	let compDocParts;

	return (
		<div
			className={cx(
				styles.ComponentDocs,
				globalStyles.container,
				globalStyles.wideContainer)}
		>
			<div className={globalStyles.row}>
				<h1>Nomos One Components</h1>
			</div>
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
	);
};

export default ComponentDocs;