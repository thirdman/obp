import React, { Component } from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Create.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class Create extends Component {
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
					styles.Create,
					styles.editMode,
					globalStyles.layoutWrap)} >
				{mappedChildren.layoutHeader &&
					<Row>
						<div className={styles.header} id="layoutHeader">
							{mappedChildren.layoutHeader || null}
						</div>
					</Row>}
				{mappedChildren.layoutHero &&
					<Row>
						<div className={styles.hero} id="layoutHero">
							{mappedChildren.layoutHero || null}
						</div>
					</Row>}
				{mappedChildren.layoutMain &&
					<Row>
						<div className={styles.content}>
							<div className={styles.main} id="layoutMain" />
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