import React, {Component} from 'react';
// import { Icon, IconButton } from 'components';
// import cx from 'classnames';
import {TransitionMotion, spring} from 'react-motion';

const cssStyles = require('./Animate.scss');

export default class Animate extends Component {
	// This is the style that exists before the component appears.
	// it will be assigned as the starting point. Ie. 'from this style'
	// it is NOT used once the component is mounted
	willEnter = () => {
		return {
			opacity: (this.props.enterOpacity || 0),
			x: (this.props.enterX || 0),
			y: (this.props.enterY || 0),
			scale: (this.props.enterScale || 1)
		};
	}
	// This is the style that exists before the component is unmounted.
	// the component will trnasition to this, before unmounting.
	// NOTE: this is will be what it animates from if 'appear' is triggered
	// before this finishes running. Because, physics.
	willLeave = () => {
		return {
			opacity: (spring(this.props.leaveOpacity) || spring(0)),
			x: spring((this.props.leaveX || 0)),
			y: spring((this.props.leaveY || 0)),
			scale: spring((this.props.leaveScale || 1))
		};
	}

  render() {
		const {
			// defaultStyleProps,
			// type,
			isVisible
		} = this.props;
		const springConfig = {
			stiffness: 172,
			damping: 23
		};
		return (
      <TransitionMotion
        styles={!isVisible ? [] : [{
          key: 'child',
          data: {},
					// This is the 'active' position styling.
									// the component will transition to this when it mounts:
          style: {
						opacity: spring(1, springConfig),
						x: spring(0, springConfig),
						y: spring(0, springConfig),
						scale: spring(1, springConfig)
						}
        }]}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        className={cssStyles.Animate}
        >
          {(items) => {
            return (
              <div>
                {items.map(item => {
                  return (
                    <div
											key={item.key}
											style={{ opacity: item.style.opacity,
												transform: `translate3d(${item.style.x}px, ${item.style.y}px, 0) scale3d(${item.style.scale}, ${item.style.scale}, ${item.style.scale})` // eslint-disable-line
											}}
											>
											{
												this.props.children ||
												<div className={cssStyles.animateWrapper}>
													<div className="label">Current Opacity: {item.style.opacity}</div>
													<button onClick={this.props.toggle}>toggle inside component</button>
												</div>
											}
                    </div>
                  );
                })}
              </div>
            );
          }}
      </TransitionMotion>
		);
	}
	static propTypes = {
		isVisible: React.PropTypes.bool,
		type: React.PropTypes.string,
		enterX: React.PropTypes.number,
		enterY: React.PropTypes.number,
		enterOpacity: React.PropTypes.number,
		enterScale: React.PropTypes.number,
		leaveX: React.PropTypes.number,
		leaveY: React.PropTypes.number,
		leaveOpacity: React.PropTypes.number,
		leaveScale: React.PropTypes.number,
		toggle: React.PropTypes.func,
		defaultStyleProps: React.PropTypes.object,
		willEnterStyleProps: React.PropTypes.object,
		willLeaveStyleProps: React.PropTypes.object,
		key: React.PropTypes.string,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
		classNameProps: React.PropTypes.array
	}
}
/*
<button onClick={this.props.toggle}>toggle state</button>
<span>isVisible = {isVisible ? 'yep' : 'nope'}</span>
*/