import React, { Component } from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Report.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class Report extends Component {
	mapChildren(children) {
		let result = {};
		children.map((child) => {
			result[child.key] = child;
		});

		return result;
	}

	render() {
		const mappedChildren = this.mapChildren(this.props.children);

		return (
			<div
				className={cx(
					styles.Layout,
					styles.Report,
					styles.editMode,
					globalStyles.layoutWrap)} >
				{mappedChildren.layoutHeader &&
					<Row>
						<div className={styles.header} id="layoutHeader">
							{mappedChildren.layoutHeader || null}
						</div>
					</Row>}
				<Row>
					{mappedChildren.layoutHero &&
						<div className={styles.hero} id="layoutHero">
							{mappedChildren.layoutHero || null}
						</div>}
					<div className={styles.content}>
						{mappedChildren.layoutMain &&
							<div className={styles.main} id="layoutMain">
								{mappedChildren.layoutMain || null}
							</div>}
					</div>
				</Row>
				{mappedChildren.layoutSecondary &&
					<Row>
						<div className={styles.secondary} id="layoutSecondary">
							{mappedChildren.layoutSecondary || null}
						</div>
					</Row>}
				{mappedChildren.layoutFooter &&
					<Row>
						<div className={styles.footer} id="layoutFooter">
							{mappedChildren.layoutFooter || null}
						</div>
					</Row>}
			</div>
		);
	}
}