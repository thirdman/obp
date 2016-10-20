import React from 'react';

const PropTypes = React.PropTypes;

class Tab extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    onActive: PropTypes.func
  };

  static defaultProps = {
    value: null,
    label: '',
    onActive: null
  };

  render() {
    return null;
  }
}


/** Define module API */
export default Tab;