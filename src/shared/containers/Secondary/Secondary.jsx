/* eslint max-len: off */
import React, {Component} from 'react';
import cx from 'classnames';

const styles = require('./Secondary.scss');

export default class Secondary extends Component {
	static propTypes = {
		title: React.PropTypes.string,
		content: React.PropTypes.string
	}

	render() {
		const { title } = this.props;
		return (
			<div className={cx(styles.Placeholder)}>
				{title ?
					<h3>{title}</h3>
					: null
				}
				<div className={styles.secondaryUpper}>
					<div className="App___row___3aaMl" data-reactid=".0.2.0.1.1.1.0.0.0"><div className="View___gridStat___2I2rA" data-reactid=".0.2.0.1.1.1.0.0.0.0"><div className="Statistic___Statistic___2ZzE4  Statistic___hasDivider___2Gd9r" data-reactid=".0.2.0.1.1.1.0.0.0.0.0"><div className="Statistic___divider___Vqn91" data-reactid=".0.2.0.1.1.1.0.0.0.0.0.0" /><h4 className="App___subtitle___1CeGe" data-reactid=".0.2.0.1.1.1.0.0.0.0.0.1">Lifetime Rent</h4><div className="Statistic___theContent___2tZAA" data-reactid=".0.2.0.1.1.1.0.0.0.0.0.2"><span data-reactid=".0.2.0.1.1.1.0.0.0.0.0.2.0">$</span><span data-reactid=".0.2.0.1.1.1.0.0.0.0.0.2.1">23556</span><span data-reactid=".0.2.0.1.1.1.0.0.0.0.0.2.2" /></div><div className="Statistic___theUnits___1VzdO" data-reactid=".0.2.0.1.1.1.0.0.0.0.0.3">Dollars</div></div></div>
					<div className="View___gridStat___2I2rA" data-reactid=".0.2.0.1.1.1.0.0.0.1">
					<div className="Statistic___Statistic___2ZzE4  Statistic___hasDivider___2Gd9r" data-reactid=".0.2.0.1.1.1.0.0.0.1.0">
					<div className="Statistic___divider___Vqn91" data-reactid=".0.2.0.1.1.1.0.0.0.1.0.0" /><h4 className="App___subtitle___1CeGe" data-reactid=".0.2.0.1.1.1.0.0.0.1.0.1">Time to option</h4><div className="Statistic___theContent___2tZAA" data-reactid=".0.2.0.1.1.1.0.0.0.1.0.2"><span data-reactid=".0.2.0.1.1.1.0.0.0.1.0.2.1">1.34</span><span data-reactid=".0.2.0.1.1.1.0.0.0.1.0.2.2" /></div><div className="Statistic___theUnits___1VzdO" data-reactid=".0.2.0.1.1.1.0.0.0.1.0.3">Years</div></div></div></div>
				</div>
			</div>
		);
	}
}
