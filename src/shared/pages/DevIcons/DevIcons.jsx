import { Component } from 'react';
import { Overview } from 'layouts';
import { SubNavWrap } from 'components';
import { Header } from 'containers';

// const globalStyles = require('../App/App.scss');
const styles = require('./DevIcons.scss');
const iconFiles = require('../../images/icons/interface');

export default class DevIcons extends Component {
	render() {
		// const { location } = this.props;
		let iconArray = [];
		let theIcons;
		if (iconFiles) {
				console.log(iconFiles);
				console.log(Object.keys(iconFiles));
				iconArray = Object.keys(iconFiles).map((key) => {
					// do something
					// return obj[key];
					return (key);
				}
			);
			console.log(iconArray);
			console.log(iconFiles);
			theIcons = iconArray.map((theIcon, index) => {
				return (
					<div className={styles.iconObject} key={`icon${index}`}>
						<h5>{theIcon}</h5>
						<div className={styles.iconWrapper} id={`item-${index}`}>
							<span dangerouslySetInnerHTML={{__html: iconFiles[theIcon]}} />
						</div>
					</div>
				);
			});
		}
		return (
			<Overview>
				<Header key={'layoutHeader'} title="Dev: Icons" />
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={2}
					listData={[
						{label: 'Dev Home', link: '/dev'},
						{label: 'Documentation', link: '/dev/docs'},
						{label: 'Icons', link: '/dev/icons'}
					]}
				/>
				<div key={'layoutMain'} className={styles.DevIcons}>
					<h2>Icons</h2>
					<div className={styles.gridWrap}>
						{theIcons}
					</div>
				</div>
				<div key={'layoutSecondary'}>
					Gareth, remember to add the icon name to the index.js
					in the icons/interface folder. Otherwise this will not work.
				</div>
			</Overview>
		);
	}
}
