import React from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Summary.scss');
const globalStyles = require('../../pages/App/App.scss');

const Summary = () => (
	<div className={cx(styles.Layout, styles.Summary,	styles.editMode, globalStyles.layoutWrap)} >
		<Row>
			<div className={styles.header} id="layoutHeader" />
		</Row>
		<Row>
			<div className={styles.content}>
				<div className={styles.navWrap}>
					<div className={styles.nav} id="layoutNav" />
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

export default Summary;