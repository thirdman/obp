import React from 'react';
import cx from 'classnames';
import { Row } from 'components';

const styles = require('./Create.scss');
const globalStyles = require('../../pages/App/App.scss');

const Create = () => (
	<div className={cx(styles.Layout, styles.Create,	styles.editMode, globalStyles.layoutWrap)} >
		<Row>
			<div className={styles.header} id="layoutHeader" />
		</Row>
		<Row>
			<div className={styles.hero} id="layoutHero" />
		</Row>
		<Row>
			<div className={styles.content}>
				<div className={styles.main} id="layoutMain" />
			</div>
		</Row>
		<Row>
			<div className={styles.footer} id="layoutFooter" />
		</Row>
	</div>
);

export default Create;