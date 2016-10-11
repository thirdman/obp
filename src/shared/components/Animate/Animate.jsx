import React, {Component} from 'react';
// import { Icon, IconButton } from 'components';
// import cx from 'classnames';
import {TransitionMotion, spring} from 'react-motion';

const cssStyles = require('./Animate.scss');

export default class Animate extends Component {

/*
	willEnter() {
		let thisStyle;
			console.log('this is: ', this);
		if (this.props.willEnterStyleProps) {
			console.log('here is the will enter: ', this.props.willEnterStyleProps);
			thisStyle = this.props.willEnterStyleProps;
		} else {
			thisStyle = {
				opacity: 0
			};
		}
		return {
			thisStyle
		};
	}
	willLeave() {
		let thisStyle;
		if (this.props.willLeaveStyleProps) {
			console.log('here is the will leave: ', this.props.willLeaveStyleProps);
			thisStyle = this.props.willLeaveStyleProps;
		} else {
			thisStyle = {
			opacity: spring(0)
			};
		}
		return {
			thisStyle
		};
	}
*/
	willEnter() {
		return {
			opacity: 0
		};
	}
	willLeave() {
		return {
			opacity: spring(0)
		};
	}
  render() {
		const {
			// defaultStyleProps,
			willEnterStyleProps,
			willLeaveStyleProps,
			isVisible
		} = this.props;
		const springConfig = {
			stiffness: 222,
			damping: 19
		};
		console.log('isVisible: ', willLeaveStyleProps);
		console.log(willEnterStyleProps, willLeaveStyleProps);
		return (
      <TransitionMotion
        styles={!isVisible ? [] : [{
          key: 'child',
          data: {},
          style: { opacity: spring(1, springConfig) }
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
											className={cssStyles.animateWrapper}
											key={item.key}
											style={{ opacity: item.style.opacity }}
											>
                      <div className="label">Current Opacity: {item.style.opacity}</div>
                      <button onClick={this.props.toggle}>toggle inside component</button>
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