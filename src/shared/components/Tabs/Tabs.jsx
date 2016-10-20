import React from 'react';
// import cx from 'classnames';
// import { Breadcrumbs } from 'components';
import Tab from './components/tab';

// import Tab from './tab';
// import * as util from '../js/lib/util';

const PropTypes = React.PropTypes;
const tabsBarClass = 'tabsBar';
const tabsBarJustifiedClass = 'tabsBarJustified';
const tabsPaneClass = 'tabsPane';
const isActiveClass = 'isActive';


class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentSelectedIndex: props.initialSelectedIndex};
  }

  static propTypes = {
    initialSelectedIndex: PropTypes.number,
    justified: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    initialSelectedIndex: 0,
    justified: false,
    onChange: null
  };

  onClick(i, tab, ev) {
    if (i !== this.state.currentSelectedIndex) {
      this.setState({currentSelectedIndex: i});

      // onActive callback
      if (tab.props.onActive) tab.props.onActive(tab);

      // onChange callback
      if (this.props.onChange) {
        this.props.onChange(i, tab.props.value, tab, ev);
      }
    }
  }

  render() {
				const {
				children,
				// initialSelectedIndex,
				justified,
				...reactProps
				} = this.props;

		let tabEls = [];
    let paneEls = [];
		let m = children.length;
    let selectedIndex = this.state.currentSelectedIndex % m;
		let isActive;
		let item;
		let cls;
		let i;

    for (i = 0; i < m; i++) {
      item = children[i];

      // only accept MUITab elements
      if (item.type !== Tab) console.log('Expecting MUITab React Element');

      isActive = (i === selectedIndex) || false;

      // tab element
      tabEls.push(
        <li key={i} className={(isActive) ? isActiveClass : ''}>
          <a onClick={this.onClick(this, i, item)}> {/* // .bind(... */}
            {item.props.label}
          </a>
        </li>
      );

      // pane element
      cls = tabsPaneClass + ' ';
      if (isActive) cls += isActiveClass;

      paneEls.push(
        <div key={i} className={cls}>
          {item.props.children}
        </div>
      );
    }

    cls = tabsBarClass;
    if (justified) cls += ' ' + tabsBarJustifiedClass;

    return (
      <div {...reactProps}>
        <ul className={cls}>
          {tabEls}
        </ul>
        {paneEls}
      </div>
    );
  }
}


/** Define module API */
export default Tabs;