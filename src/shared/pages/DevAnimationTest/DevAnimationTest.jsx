import { Component } from 'react';
import { Overview } from 'layouts';
import { Animate, Button, HorizontalRule, SubNavWrap } from 'components';
import { Header } from 'containers';

// const globalStyles = require('../App/App.scss');
const styles = require('./DevAnimationTest.scss');

export default class DevAnimationTest extends Component {
	state = {
		renderChild: true,
		isVisible: false
	};
	toggle = () => {
		this.setState({
			renderChild: !this.state.renderChild,
			isVisible: !this.state.isVisible
		});
	};
	doVisible = () => {
		console.log('this.state.isVisible: ', this.state.isVisible);
		this.setState({
			isVisible: !this.state.isVisible
		});
	};

	render() {
		// const { location } = this.props;
		let defaultStyle = {
			opacity: 0.7
		};
		let willEnterStyle = {
			opacity: 0.1
		};
		let willLeaveStyle = {
			opacity: 0.0
		};
		return (
			<Overview>
				<Header key={'layoutHeader'} title="Dev: Animation" />
				<SubNavWrap
					key={'layoutNav'}
					currentlySelected={3}
					listData={[
						{label: 'Dev Home', link: '/dev'},
						{label: 'Documentation', link: '/dev/docs'},
						{label: 'Icons', link: '/dev/icons'},
						{label: 'Animation', link: '/dev/animation'}
					]}
				/>
				<div key={'layoutMain'} className={styles.DevAnimationTest}>
					<h2>Animation</h2>
					<HorizontalRule />
					<div>Current isVisible state: {this.state.isVisible ? 'true' : 'false'}</div>
					<Button content={'toggle visibility'} onClickProps={this.doVisible} />
					<HorizontalRule />
					<Animate
						toggle={this.toggle}
						doUnmount={this.state.renderChild}
						isVisible={this.state.isVisible}
						willEnterStyleProps={willEnterStyle}
						willLeaveStyleProps={willLeaveStyle}
						deafultStyleProps={defaultStyle}
						/>
				</div>
				<div key={'layoutSecondary'}>
					Gareth, remember to add the icon name to the index.js
					in the icons/interface folder. Otherwise this will not work.
				</div>
			</Overview>
		);
	}
}
