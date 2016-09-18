import React, {Component} from 'react';

const styles = require('./SubNavWrap.scss');

export default class SubNavWrap extends Component {

	static propTypes = {
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		])
	}

	render() {
		return (
			<ul className={styles.SubNavWrap}>
				{this.props.children}
			</ul>
		);
	}
}