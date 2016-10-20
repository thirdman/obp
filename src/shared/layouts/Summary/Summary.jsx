import React, { Component } from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Summary.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class Summary extends Component {
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
					styles.Summary,
					// styles.editMode,
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

				<Row>
					<div
						className={cx(
							styles.content,
							(mappedChildren.layoutSecondary ? styles.hasSecondary : styles.noSecondary)
							)}
					>
						{mappedChildren.layoutNav &&
							<div className={styles.navWrap}>
								<div className={styles.nav} id="layoutNav">
									{mappedChildren.layoutNav || null}
								</div>
							</div>}
						{mappedChildren.layoutMain &&
							<div className={styles.main} id="layoutMain">
								{mappedChildren.layoutMain || null}
							</div>}
					</div>
					{mappedChildren.layoutSecondary &&
						<div className={styles.secondary} id="layoutSecondary">
							{mappedChildren.layoutSecondary || null}
						</div>}
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