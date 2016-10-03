import React, {Component, PropTypes} from 'react';
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
			route,
			params,
			breadcrumbData = [
				{ text: 'Home', link: 'home' },
				{ text: 'Agreements', link: 'agreements' },
				{ text: 'Overview', active: true },
			]
		} = this.props;
		let theSections;
		let classes;
		let theParamSections;
		let routeArray;
		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		if (params) {
			routeArray = route.path.split('/');
			let isParameter;
			let theParameter;
			let thisRoute = '';
			theParamSections = routeArray.map((item, index) => {
				isParameter = item.charAt(0) === ':';
				if (isParameter) {
					item = item.substring(1);
					theParameter = params[item];
					item = params[item];
				}
				thisRoute = thisRoute + '/' + item;
			return (
				<div
						key={`section-${index}`}
						className={styles.section}
					>
						<div className={styles.divider}>
							{icon ?
								<div className={styles.iconWrap}>
									<Icon icon={icon} classNameProps={['normal', 'grey']} />
								</div>
								: divider
							}
						</div>
						{isParameter ?
							<a href={thisRoute}>{theParameter}</a> :
							<a href={thisRoute}>{item}</a>
						}
					</div>
			);
		});
  }

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
				{theParamSections || theSections}
			</div>
		);
	}
	static propTypes = {
		params: PropTypes.object,
		route: PropTypes.object,
		divider: PropTypes.string,
		hasHome: PropTypes.bool,
		icon: PropTypes.string,
		breadcrumbData: PropTypes.array,
		classNameProps: PropTypes.array
	}
}
