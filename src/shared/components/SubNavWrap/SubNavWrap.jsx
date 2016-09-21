import React, { PropTypes, Component } from 'react';
import { autobind } from 'core-decorators';
import { browserHistory } from 'react-router';
import { Icon } from 'components';

const styles = require('./SubNavWrap.scss');

export default class SubNavWrap extends Component {

	static propTypes = {
		currentlySelected: PropTypes.number,
		listData: PropTypes.array,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(React.PropTypes.node),
			PropTypes.node
		])
	}

	@autobind
	onClick(link) {
		return () => {
			browserHistory.push(link);
		};
	}

	render() {
		const {listData, currentlySelected} = this.props;
		return (
			<ul className={styles.SubNavWrap}>
				{listData && listData.map((item, index) =>
					(
						<li
							key={`navitem${index}`}
							className={index === currentlySelected ? styles.isSelected : ''}
							onClick={this.onClick(item.link)}
							>
							{item.label}
							<span className={styles.iconWrap}>
								<Icon icon="chevron-right" color={index === currentlySelected ? 'blue' : 'grey'} />
							</span>
						</li>
					))
				}
				{this.props.children}
			</ul>
		);
	}
}