import React, { Component } from 'react';
import cx from 'classnames';
import { Animate, Row } from 'components';

const styles = require('./Overview.scss');
const globalStyles = require('../../pages/App/App.scss');

export default class Overview extends Component {
	state = {
		showLayout: false
	}
	componentDidMount() {
		this.toggleVisibility();
	}
	mapChildren(children) {
		let result = {};
		children.map((child) => {
			result[child.key] = child;
		});

		return result;
	}

	toggleVisibility = () => {
			this.setState({showLayout: true});
	}

	render() {
		const mappedChildren = this.mapChildren(this.props.children);

		return (
		<Animate
			isVisible={this.state.showLayout}
			enterX={-80}
			enterY={0}
			// enterScale={0.9}
		>
			<div
				className={cx(
					styles.Layout,
					styles.Overview,
					globalStyles.layoutWrap)} >
				{mappedChildren.layoutHeader &&
					<Row>
						<div className={styles.header} id="layoutHeader">
							{mappedChildren.layoutHeader || null}
						</div>
					</Row>}
				<Row>
					<div className={styles.content}>
						{mappedChildren.layoutHero &&
							<div className={styles.hero} id="layoutHero">
								{mappedChildren.layoutHero || null}
							</div>}
						<div className={styles.navWrap}>
							{mappedChildren.layoutNav &&
								<div className={styles.nav} id="layoutNav">
									{mappedChildren.layoutNav || null}
								</div>}
							{mappedChildren.layoutSupplimentary &&
								<div className={styles.supplimentary} id="layoutSupplimentary">
									{mappedChildren.layoutSupplimentary || null}
								</div>}
						</div>
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
			</Animate>
		);
	}
}