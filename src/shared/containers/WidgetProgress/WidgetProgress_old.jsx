import React, { Component, PropTypes } from 'react';
import classSet from 'react-classset';
import cx from 'classnames';
import { ProgressBar } from 'components';

const styles = require('./WidgetProgress.scss');
// const defaultMarkerData = require('./progressData.js');

export default class WidgetProgress extends Component {

	static propTypes = {
		title: PropTypes.string,
		units: PropTypes.string,
		color: PropTypes.string,
		type: PropTypes.string,
		hasMarkers: PropTypes.bool,
		markerData: PropTypes.array,
		classNameProps: PropTypes.array
	}

	render() {
		const {
			classNameProps = [],
			title,
			units = '%',
			color = 'blue',
			type = 'standard',
			hasMarkers = true,
			hasTitles = true,
			markerData,
			} = this.props;
		let defaultMarkerData;
		let classes = classNameProps;
		let toggleClasses;
		let markerArray;
		let theMarkers;

		console.log(this.props);
		defaultMarkerData = [
			{
				percent: 0,
				title: 'Commencement',
				type: 'complete',
				description: 'Commencement Date'
			},
			{
				percent: 100,
				title: 'Expiry',
				type: 'incomplete',
				description: 'Expected final expiry date'
			},
			{
				percent: 50,
				title: 'Renewal',
				type: 'complete',
				description: 'Term renewed'
			}
		];
		toggleClasses = classSet({
			[styles.hasMarkers]: hasMarkers,
			[styles.hasTitles]: hasTitles
		});

		classes = classes.concat(type);
		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

console.log(defaultMarkerData, markerData, markerArray);
/*
		if (hasMarkers) {
			if (markerData) {
				markerArray = markerData;
				} else {
				markerArray = defaultMarkerData;
				}
			console.log(markerArray);
			theMarkers = defaultMarkerData.map((item, index) => {
				// let thisTypeClass = `styles.${item.type}`;
				let thisTempStyle = {
					left: item.percent + '%'
				};
				return (
					<div
						key={`marker${index}`}
						className={styles.markerItem}
						style={thisTempStyle}
						>
						<div className={styles.markerTitle}>{item.title}</div>
						<span className={styles.marker} />
					</div>
				);
			});
		}
*/
		return (
			<div className={cx(styles.WidgetProgress, classes, toggleClasses)}>
				{ title ? <h4 className={styles.test}>{title}</h4> : null }
				<div className={styles.progressWrap}>
					{ hasMarkers ? <div className={styles.markerItem}>showing markers</div> : null }
					{ theMarkers || null }
					<ProgressBar completed={68} type={type} color={color} units={units} />
				</div>
			</div>
		);
	}
}
