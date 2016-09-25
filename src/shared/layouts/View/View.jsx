import React, { Component } from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./View.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class View extends Component {
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
					styles.View,
					globalStyles.layoutWrap)} >
				{mappedChildren.layoutHeader &&
					<Row>
						<div className={styles.header} id="layoutHeader">
							{mappedChildren.layoutHeader || null}
						</div>
					</Row>}
				<Row>
					<div className={styles.content}>
						{mappedChildren.layoutHero &&
							<div className={styles.hero} id="layoutHero">
								{mappedChildren.layoutHero || null}
							</div>}
						<div className={styles.navWrap}>
							{mappedChildren.layoutNav &&
								<div className={styles.nav} id="layoutNav">
									{mappedChildren.layoutNav || null}
								</div>}
							{mappedChildren.layoutSupplimentary &&
								<div className={styles.supplimentary} id="layoutSupplimentary">
									{mappedChildren.layoutSupplimentary || null}
								</div>}
						</div>
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