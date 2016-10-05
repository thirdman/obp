import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { MainNavWrap, UiBrandLogo } from 'components';

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

	state={
		isConnecting: false,
		isLoading: true
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				isConnecting: true,
				isLoading: false
				});
			}, 500);
		setTimeout(() => {
			this.setState({
				isConnecting: false,
				isLoading: false
				});
			}, 1000);
	}
	render() {
		return (
			<div
				className={`${styles.app}
					${this.state.isLoading ? styles.isLoading : ''}
					${this.state.isConnecting ? styles.isConnecting : ''}`}>
				<Helmet {...config.app.head} />
				<div className={styles.appLoading + ' ' + styles.centered} >
					<UiBrandLogo isSmall isLoading />
						<div className={styles.loadingMessage}>
							{this.state.isConnecting ?
								<span>Connecting ...</span>
								: null
							}
							{this.state.isLoading ?
								<span>Loading Interface ...</span>
								: null
							}
						</div>
				</div>
				<MainNavWrap />
				<div className={styles.appContent}>
					{this.props.children}
				</div>
			</div>
		);
	}
}