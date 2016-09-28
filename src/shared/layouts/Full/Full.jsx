import React, { Component } from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Full.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class Full extends Component {
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
					styles.Full,
					globalStyles.layoutWrap)} >
				{mappedChildren.layoutHeader &&
					<Row>
						<div className={styles.header} id="layoutHeader">
							{mappedChildren.layoutHeader || null}
						</div>
					</Row>}
				<Row>
					<div className={styles.content}>
					{mappedChildren.layoutMain &&
						<div className={styles.main} id="layoutMain">
							{mappedChildren.layoutMain || null}
						</div>}
					</div>
				</Row>
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