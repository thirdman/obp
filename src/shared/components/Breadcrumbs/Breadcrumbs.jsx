import React, {Component} from 'react';
import { Icon } from 'components';
// import { LinkContainer } from 'react-router-bootstrap';
import cx from 'classnames';

const styles = require('./Breadcrumbs.scss');

export default class Breadcrumbs extends Component {

render() {
			const {
			classNameProps = [],
			divider = '/',
			hasHome = true,
			icon,
			breadcrumbData = [
				{ text: 'Home', link: 'home' },
				{ text: 'Agreements', link: 'agreements' },
				{ text: 'View', active: true },
			]
		} = this.props;
		let theSections;
		let classes;

		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		theSections = breadcrumbData.map((section, index) => (
			<div
				key={`section-${index}`}
				className={styles.section + ' ' + (section.active ? styles.isActive : '')}
			>
				<div className={styles.divider}>
					{icon ?
						<div className={styles.iconWrap}>
							<Icon icon={icon} classNameProps={['normal', 'grey']} />
						</div>
						: divider
					}
				</div>
				{section.icon ?
					<div className={styles.iconWrap}>
						<Icon icon={section.icon} classNameProps={['normal', 'blue']} />
					</div>
					: null
				}
				<div className={styles.sectionText} >
					{section.link ?
						// <LinkContainer to={section.link}><a >{section.text}</a></LinkContainer>
						<a >{section.text}</a>
						: section.text
					}
				</div>
			</div>
		));

		return (
			<div className={cx(styles.Breadcrumbs, classes)}>
				{hasHome ?
					<div className={styles.iconWrap}>
						<Icon icon="home" classNameProps={['normal', 'grey']} />
					</div>
					: null
				}
				{theSections}
			</div>
		);
	}
	static propTypes = {
		divider: React.PropTypes.string,
		hasHome: React.PropTypes.bool,
		icon: React.PropTypes.string,
		breadcrumbData: React.PropTypes.array,
		classNameProps: React.PropTypes.array
	}
}
