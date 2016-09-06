import React, { Component } from 'react';
import { Router } from 'react-router';
import context from './shared/context';

const ContextProvider = context.getProvider();

export default class App extends Component {
	static propTypes = {
		store: React.PropTypes.object,
		routes: React.PropTypes.object,
		history: React.PropTypes.object,
		render: React.PropTypes.func
	};

	static fetchData() {}

	render() {
		const { store, routes, history, render } = this.props;
		return (
			<ContextProvider context={{ store }}>
				<Router
					routes={routes}
					history={history}
					render={render}
				/>
			</ContextProvider>
		);
	}
}
