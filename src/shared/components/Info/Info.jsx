import React from 'react';
import cx from 'classnames';

const styles = require('./Info.scss');

const Info = ({ classNameProps = [], content }) => {
		const classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<span className={cx(styles.Info, classes)}>
				{content}
			</span>
		);
};

Info.propTypes = {
	classNameProps: React.PropTypes.array,
	content: React.PropTypes.string
};

export default Info;