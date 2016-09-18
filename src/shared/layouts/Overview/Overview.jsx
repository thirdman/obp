import React from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Overview.scss');
const globalStyles = require('../../pages/App/App.scss');

const Overview = () => (
	<div className={cx(styles.Overview,	styles.editMode, globalStyles.layoutWrap)} >
		<Row>
			<div className={styles.header} id="layoutHeader" />
		</Row>
		<Row>
			<div className={styles.hero} id="layoutHero" />
			<div className={styles.content}>
				<div className={styles.nav}>
					<div className={styles.subNav} id="layoutSubNav" />
					<div className={styles.supplimentary} id="layoutSupplimentary" />
				</div>
				<div className={styles.main} id="layoutMain" />
			</div>
			<div className={styles.secondary} id="layoutSecondary" />
		</Row>
		<Row>
			<div className={styles.footer} id="layoutFooter" />
		</Row>
	</div>
);

export default Overview;