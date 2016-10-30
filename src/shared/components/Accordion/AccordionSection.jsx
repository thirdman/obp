import React, { PropTypes } from 'react';
// import className from 'classnames';
import cx from 'classnames';
import {
	Icon,
	} from 'components';


const styles = require('./AccordionSection.scss');

export default class AccordionSection extends React.Component {

  static propTypes = {
		active: PropTypes.bool,
		unq: PropTypes.string,
		toggle: PropTypes.func,
		title: PropTypes.string,
		className: PropTypes.string
	}

  constructor(props) {
    super(props);
    this.toggleSection = this.toggleSection.bind(this);
    this.state = {
      sectionHeight: 0,
    };
  }

  componentDidMount() {
		const { active } = this.props;
		if (active) {
			this.setHeight();
		}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      this.toggleOpen(nextProps.active);
    }
  }

  getHeight() {
    const { active } = this.props;
    return (active) ? this.accordionContent.scrollHeight : 0;
  }
  setHeight() {
		this.setState({sectionHeight: this.accordionContent.scrollHeight});
  }

  toggleSection() {
    const {
      unq,
      toggle
    } = this.props;
    toggle(unq);
  }

  toggleOpen(active) {
    const height = (active) ? `${this.accordionContent.scrollHeight}px` : 0;
    this.setState({
      sectionHeight: height,
    });
  }


  render() {
    const {
      title,
      children,
      active,
      // className,
    } = this.props;

    const contentStyles = {
      height: this.state.sectionHeight
    };

    const contentClasses = cx(styles.contentPanel, 'accordionInner', {
      active
    });

    return (
      <div className={styles.AccordionSection}>
				<div
					className={cx(styles.titleBar, (active ? styles.active : ''))}
					onClick={() => this.toggleSection()}
				>
          {title}
					<div className={styles.iconWrap}>
						<Icon icon="chevron-down" size={12} color={active ? 'blue' : 'lightGrey'} />
					</div>
        </div>
				<div
					className={contentClasses}
					style={contentStyles}
					ref={(ref) => this.accordionContent = ref}
					>
          <div className={styles.innerContent} >
            {children}
          </div>
        </div>
      </div>
    );
  }
}