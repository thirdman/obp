import React, { PropTypes } from 'react';
// import className from 'classnames';
import cx from 'classnames';
import * as Utils from './utils';

const styles = require('./Accordion.scss');

export default class Accordion extends React.Component {

  static propTypes = {
		openByDefault: PropTypes.bool,
		singleOpen: PropTypes.bool,
		uniqueId: PropTypes.string,
		className: PropTypes.string,
	}

  constructor(props) {
    super(props);
    this.toggleSection = this.toggleSection.bind(this);
    this.state = {
      singleOpen: this.props.singleOpen,
      openByDefault: this.props.openByDefault,
      activeSections: [],
    };
  }

  componentWillMount() {
    const {
      singleOpen,
      openByDefault,
      uniqueId,
      children } = this.props;

    const settings = {
      singleOpen,
      openByDefault,
      uniqueId,
      kids: children
    };
    const initialStateSections = Utils.setupAccordion(settings).activeSections;
    this.setState({ activeSections: initialStateSections });
  }

  render() {
    const {
      className,
      uniqueId: propId
    } = this.props;

    const childrenWithProps = this.getChildrenWithProps();
    const uniqueId = propId || '';

    return (
      <div
      className={cx(styles.Accordion, 'reactAccordion', className)}
      id={uniqueId}
      >
        {childrenWithProps}
      </div>
    );
  }

  getChildrenWithProps() {
    const {
      children,
    } = this.props;


    const kids = React.Children.map(children, (child, i) => {
      const unqId = `acc-sec-${i}`;
      return React.cloneElement(child, {
        toggle: (acId) => this.toggleSection(acId),
        key: unqId,
        unq: unqId,
        active: (this.state.activeSections && this.state.activeSections.lastIndexOf(unqId) !== -1)
      });
    });

    return kids;
  }

  toggleSection(sectionId) {
    const newActive = Utils.toggleSection(
      sectionId,
      this.state.activeSections,
      this.state.singleOpen);

    this.setState({
      activeSections: newActive
    });
  }
}