import React, { Component } from 'react';
import cx from 'classnames';
// import { Breadcrumbs } from 'components';
// import Tab from './components/Tab';

const PropTypes = React.PropTypes;
const styles = require('./Tabs.scss');

export default class Tabs extends Component {
/*
  constructor(props) {
    super(props);
    // this.state = {currentSelectedIndex: props.initialSelectedIndex};
  }
*/

  static propTypes = {
    initialSelectedIndex: PropTypes.number,
    justified: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    justified: false,
    onChange: null
  };
	state ={
		currentSelectedIndex: this.props.initialSelectedIndex
	}
  onClick(i, tab, ev) {
		// console.log('tab was clicked');
		// console.log('this: ', this);
		// console.log(i, tab, ev);
		// console.log('this.state.currentSelectedIndex: ', this.state.currentSelectedIndex);
    if (i !== this.state.currentSelectedIndex) {
      this.setState({currentSelectedIndex: i});

      // onActive callback
			if (tab.props.onActive) {
				tab.props.onActive(tab);
			}

      // onChange callback
      if (this.props.onChange) {
        this.props.onChange(i, tab.props.value, tab, ev);
      }
    }
  }

  render() {
		const {
			children,
			initialSelectedIndex,
			justified,
			...reactProps
			} = this.props;

		let m = children.length;
    let selectedIndex = this.state.currentSelectedIndex % m;
		let isActive;
		// let item;
		// let cls;
		// let i;
		if (initialSelectedIndex) {
			selectedIndex = initialSelectedIndex;
		}
		let theTabs = children.map((child, index) => {
			isActive = (index === selectedIndex) || false;
			return (
				<li key={index} className={(isActive ? styles.isActive : '')}>
          <a onClick={() => this.onClick(index, child, event)}>
						{child.props.label}
          </a>
        </li>
				);
			});

		let thePanels = children.map((child, index) => {
			isActive = (index === selectedIndex) || false;
			return (
        <div key={index} className={cx(styles.tabsPane, (isActive ? styles.isActive : ''))}>
          <span>{child.props.children}</span>
        </div>
				);
			});

/*
		for (i = 0; i < m; i++) {
			console.log('currently selected index is ', this.state.currentSelectedIndex);
			item = children[i];
			console.log(item);

      // legacy wrning, refactor out? Needs to check if it's a real tab
      if (item.type.displayName !== Tab) console.info('Expecting MUITab React Element');

      isActive = (i === selectedIndex) || false;
    }
*/
    return (
      <div {...reactProps}>
        <ul className={cx(styles.tabsBar, (justified ? styles.tabsBarJustified : ''))}>
          {theTabs}
        </ul>
        {thePanels}
      </div>
    );
  }
}