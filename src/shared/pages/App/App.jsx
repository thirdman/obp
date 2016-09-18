import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { MainNavWrap } from 'components';

import config from '../../../config';

const styles = require('./App.scss');

/*
## APP

This container works as a master wrapper for all the page level containers athat appear inside it.

* helmet: (config.app.head) contains infor for title, etc
*	NnavBar: global ui header element
* appContent: all the page children

*/

export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	};

	render() {
		return (
			<div className={styles.app}>
				<Helmet {...config.app.head} />
				<MainNavWrap />
				<div className={styles.appContent}>
					{this.props.children}
				</div>
			</div>
		);
	}
}