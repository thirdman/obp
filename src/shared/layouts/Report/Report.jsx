import React from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Report.scss');
const globalStyles = require('../../pages/App/App.scss');

const Report = () => (
	<div className={cx(styles.Layout, styles.Report,	styles.editMode, globalStyles.layoutWrap)} >
		<Row>
			<div className={styles.header} id="layoutHeader" />
		</Row>
		<Row>
			<div className={styles.hero} id="layoutHero" />
			<div className={styles.content}>
				<div className={styles.main} id="layoutMain" />
			</div>
		</Row>
		<Row>
			<div className={styles.secondary} id="layoutSecondary" />
		</Row>
		<Row>
			<div className={styles.footer} id="layoutFooter" />
		</Row>
	</div>
);

export default Report;