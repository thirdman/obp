import React from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./View.scss');
const globalStyles = require('../../pages/App/App.scss');

const View = () => (
	<div className={cx(styles.Layout, styles.View,	styles.editMode, globalStyles.layoutWrap)} >
		<Row>
			<div className={styles.header} id="layoutHeader" />
		</Row>
		<Row>
			<div className={styles.content}>
				<div className={styles.navWrap}>
					<div className={styles.nav} id="layoutNav" />
					<div className={styles.supplimentary} id="layoutSupplimentary" />
				</div>
				<div className={styles.main} id="layoutMain" />
			</div>
		</Row>
		<Row>
			<div className={styles.footer} id="layoutFooter" />
		</Row>
	</div>
);

export default View;