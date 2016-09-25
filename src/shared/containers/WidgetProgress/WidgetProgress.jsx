import React, { Component, PropTypes } from 'react';
import classSet from 'react-classset';
import cx from 'classnames';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { ProgressBar } from 'components';

const styles = require('./WidgetProgress.scss');

export default class WidgetProgress extends Component {

	static propTypes = {
		title: PropTypes.string,
		units: PropTypes.string,
		color: PropTypes.string,
		type: PropTypes.string,
		progress: PropTypes.number,
		hasMarkers: PropTypes.bool,
		hasToday: PropTypes.bool,
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
			hasToday = true,
			hasTitles = true,
			markerData,
			} = this.props;
		let defaultMarkerData;
		let classes = classNameProps;
		let toggleClasses;
		let markerArray;
		let theMarkers;
		let firstDate;
		let lastDate;
		let todayDate = moment();
		let daysToToday;
		let totalTimePeriod;
		let { progress = 68 } = this.props;

		defaultMarkerData = [
			{
				percent: 0,
				title: 'Commencement',
				type: 'complete',
				description: 'Commencement Date',
				date: 1366591566000
			},
			{
				percent: 50,
				title: 'Renewal',
				type: 'complete',
				description: 'Term renewed',
				date: 1429663566000
			},
			{
				title: 'Option',
				type: 'incomplete',
				description: 'Option Date to renew the agreement',
				date: 1492821966000
			}, {
				percent: 100,
				title: 'Expiry',
				type: 'incomplete',
				description: 'Expected final expiry date',
				date: 1537577166000
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

		if (hasMarkers) {
			if (markerData) {
				markerArray = markerData;
				} else {
				markerArray = defaultMarkerData;
				}
			if (markerArray[0].date) {
				firstDate = moment(markerArray[0].date);
			}
			if (markerArray[markerArray.length - 1].date) {
				lastDate = moment(markerArray[markerArray.length - 1].date);
			}
			if (firstDate && lastDate) {
				totalTimePeriod = lastDate.diff(firstDate, 'days');
			}
			theMarkers = markerArray.map((item, index) => {
				let thisTypeClass;
				if (item.type === 'complete') {
					thisTypeClass = styles.complete;
				}
				if (item.type === 'incomplete') {
					thisTypeClass = styles.incomplete;
				}
				let thisTempStyle = {
					left: item.percent + '%'
				};
				let thisDate = moment(item.date);
				let dateDifference = thisDate.diff(firstDate, 'days');
				let progressPercent = ((dateDifference / totalTimePeriod) * 100).toFixed(2);
				if (progressPercent) {
					thisTempStyle = {
						left: progressPercent + '%'
					};
				}

				return (
					<div
						key={`marker${index}`}
						className={
							cx(styles.markerItem, thisTypeClass, (item.percent > 95 ? styles.isLast : ''))
							}
						style={thisTempStyle}
						data-tip
						data-for={`tooltipMarker${index}`}
						data-class={styles.tooltip}
						>
						<span className={styles.marker} />
						<ReactTooltip id={`tooltipMarker${index}`} type="light">
							<h4>{item.title}</h4>
							<div>{moment(Number(item.date)).format('DD MM YYYY')}</div>
						</ReactTooltip>
					</div>
				);
			});
		}
		if (firstDate && todayDate) {
			daysToToday = todayDate.diff(firstDate, 'days');
			progress = parseFloat(((daysToToday / totalTimePeriod) * 100).toFixed(2));
		}
		let tempTodayStyle = {
			left: progress + '%'
		};

		return (
			<div className={cx(styles.WidgetProgress, classes, toggleClasses)}>
				{ title ? <h4>{title}</h4> : null }
				<div className={styles.progressWrap}>
					{ theMarkers || null }
					{ hasToday ?
						<div className={styles.todayLabel} style={tempTodayStyle} >{progress}%</div>
						: null
					}
					<ProgressBar completed={progress} type={'progress'} color={color} units={units} />
				</div>
			</div>
		);
	}
}

