import React, { Component } from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Overview.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class Overview extends Component {
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
			<div className={cx(styles.Overview, styles.editMode, globalStyles.layoutWrap)} >
				<Row>
					{mappedChildren.layoutHeader &&
						<div className={styles.header} id="layoutHeader">
							{mappedChildren.layoutHeader || null}
						</div>}
				</Row>
				<Row>
					{mappedChildren.layoutHero &&
						<div className={styles.hero} id="layoutHero">
							{mappedChildren.layoutHero || null}
						</div>}
					<div className={styles.content}>
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