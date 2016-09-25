import React, { Component, PropTypes } from 'react';
import classSet from 'react-classset';
import cx from 'classnames';

const styles = require('./ProgressBar.scss');

export default class ProgressBar extends Component {

static propTypes = {
  completed: PropTypes.number,
  units: PropTypes.string,
	color: PropTypes.string,
  type: PropTypes.string,
  hasPadding: PropTypes.bool,
  classNameProps: PropTypes.array
}

render() {
  const {
		classNameProps = [],
		units = '%',
		color = 'blue',
		type = 'standard',
		hasPadding = false,
		} = this.props;
  let {
		completed
		} = this.props;
	let classes = classNameProps;
	let toggleClasses;

	toggleClasses = classSet({
		[styles.hasPadding]: hasPadding,
	});

	classes = classes.concat(color);
	classes = classes.concat(type);
	classes = classes
		.filter((cName) => { return !!cName; })
		.map((classV) => styles[classV]).join(' ');

  if (completed < 0) {
		completed = 0;
	}
  if (completed > 100) {
		completed = 100;
	}
  const tempStyle = {
		width: completed + units
  };

	return (
		<div className={cx(styles.ProgressBar, classes, toggleClasses)}>
      <div className={styles.bar} style={tempStyle} />
		</div>
		);
	}
}
