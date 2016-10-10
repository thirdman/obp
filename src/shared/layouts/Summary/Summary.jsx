import React, { Component } from 'react';
import cx from 'classnames';
import { Row } from 'components';
import {Motion, spring} from 'react-motion';

const styles = require('./Summary.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class Summary extends Component {
	state = {
		isVisible: false
	}
	componentDidMount() {
		setTimeout(() => {
		this.doVisible();
		}, 10);
	}

	mapChildren(children) {
		let result = {};
		children.map((child) => {
			result[child.key] = child;
		});

		return result;
	}
	doVisible() {
			this.setState({
				isVisible: true
			});
	}
	render() {
		const mappedChildren = this.mapChildren(this.props.children);
		const springConfig = {stiffness: 100, damping: 23};
		let motionStyle = {
			y: spring((this.state.isVisible ? 0 : -40), springConfig),
			objectOpacity: spring((this.state.isVisible ? 1 : 0), springConfig),
		};
		return (
		<Motion style={motionStyle}>
			{({y, objectOpacity}) => (
			<div
				className={cx(
					styles.Layout,
					styles.Summary,
					// styles.editMode,
					globalStyles.layoutWrap)}
					style={{
						WebkitTransform: `translate3d(0, ${y}px, 0)`,
						transform: `translate3d(0, ${y}px, 0)`,
						opacity: objectOpacity
					}}
				>
				{mappedChildren.layoutHeader &&
					<Row>
						<div className={styles.header} id="layoutHeader">
							{mappedChildren.layoutHeader || null}
						</div>
					</Row>}
				<Row>
					<div className={styles.content}>
						{mappedChildren.layoutNav &&
							<div className={styles.navWrap}>
								<div className={styles.nav} id="layoutNav">
									{mappedChildren.layoutNav || null}
								</div>
							</div>}
						{mappedChildren.layoutMain &&
							<div className={styles.main} id="layoutMain">
								{mappedChildren.layoutMain || null}
							</div>}
					</div>
					{mappedChildren.layoutSecondary &&
						<div className={styles.secondary} id="layoutSecondary">
							{mappedChildren.layoutSecondary || null}
						</div>}
				</Row>
				{mappedChildren.layoutFooter &&
					<Row>
						<div className={styles.footer} id="layoutFooter">
							{mappedChildren.layoutFooter || null}
						</div>
					</Row>}
			</div>
			)}
			</Motion>
		);
	}
}