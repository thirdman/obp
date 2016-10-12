import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { Icon } from 'components';

const styles = require('./SubNavWrap.scss');

export default class SubNavWrap extends Component {

	static propTypes = {
		currentlySelected: PropTypes.number,
		listData: PropTypes.array,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(React.PropTypes.node),
			PropTypes.node
		]),
		disabled: PropTypes.bool
	}

	render() {
		const {
			listData = [],
			selected
		} = this.props;
		return (
			<ul className={styles.SubNavWrap}>
				{listData && listData.map(({link, name, label, disabled}, index) =>
					(<Link
						to={link}
						key={`navitem${index}`}
						onClick={(event) => {
							if (disabled) {
								event.preventDefault();
							}
						}}>
						<li
							className={name === selected ? styles.isSelected : ''}>
							{label}
							<span className={styles.iconWrap}>
								<Icon icon="chevron-right" color={name === selected ? 'blue' : 'grey'} />
							</span>
						</li>
					</Link>))
				}
				{this.props.children}
			</ul>
		);
	}
}