/* eslint-disable */
import React from 'react';
import reactToJsx from 'react-to-jsx';
import Remarkable from 'remarkable';
// import Button from 'components';

let Styleguide = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
  	},

	componentWillMount() {
		let openState = {};
		if (this.props.children.length) {
			this.props.children.map((child) => {
				openState[child.props.title] = false;
			});
		} else {
			openState[this.props.children.props.title] = false;
		}
		this.setState({
			openState,
			transform: 'yes',
			isScrolled: false
		});
	},

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	listComponentTitles() {
		let children = this.props.children;

		// children = (React.Children.count(children) === 1) ? [ children ] : children;

		return children.map(function(child, index) {
			let title = child.props.title.replace(' ', '-');
			return <li key={`component-${index}`}><a href={'#' + title}>{child.props.title}</a></li>;
		});
	},

	handleScroll(event) {
		let top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		let scrollTop = event.srcElement.body.scrollTop;
		let itemTranslate = Math.min(0, scrollTop / 3 - 60);
		let hasScrolled = (top > 120) ? true : false;
			this.setState({
				transform: itemTranslate,
				isScrolled: hasScrolled
			});
	},

	listComponents() {
		let children = this.props.children;
		let self = this;
		const styles = require('./StyleGuide.scss');
		const md = new Remarkable();

		// children = (React.Children.count(children) === 1) ? [ children ] : children;
		return children.map(function(child, index) {
			let title = child.props.title.replace(' ', '-');
			let code = reactToJsx(child.props.children);
			let isExpanded = self.state.openState[title];
			let rawMarkup = md.render(child.props.description);
			rawMarkup = { __html: rawMarkup };
			return (
				<div key={`StyleguideChild-${index}`} className={styles.StyleguideComponent} id={title}>
					<h1 className={styles.StyleguideComponentTitle}>{child.props.title}</h1>
					<span className={styles.StyleguideComponentDescription} dangerouslySetInnerHTML={rawMarkup} />
					<div className={styles.StyleguideComponentExample}>{child.props.children}</div>
					{isExpanded ?
						<div>
							<span className={styles.toggleButton} onClick={self.toggleShowCode(title)}>
								Hide Code
							</span>
							<div className={styles.StyleguideComponentCode}>
								<pre>
									<code className={self.props.codeClassName ? self.props.codeClassName : 'language-javascript'}>
										{self.props.highlight ? self.props.highlight(code) : code}
									</code>
								</pre>
							</div>
						</div> :
						<span className={styles.toggleButton} onClick={self.toggleShowCode(title)}>
							Show Code
						</span>
					}
				</div>
			);
		});
	},

	toggleShowCode(title) {
		return () => {
			let openState = {
				...this.state.openState
			};
			openState[title] = !openState[title];
			this.setState({
				openState
			});
		};
	},

	render() {
		const styles = require('./StyleGuide.scss');
		const globalStyles = require('../App/App.scss');
		return (
			<div className={styles.Styleguide + ' ' + globalStyles.row}>
				<div id="StyleguideSidebar" ref="scrollit" className={styles.StyleguideSidebar + ' ' + globalStyles.secondaryColumn + ' ' + (this.state.isScrolled ? styles.isScrolled : styles.notScrolled)}>
					<div className={styles.listTitle}>
						<h4>Components</h4>
					</div>
					<ul className={styles.StyleguideSidebarList + ' ' + styles.sticky}>
						{this.listComponentTitles()}
					</ul>
				</div>
				<div className={globalStyles.primaryColumn}>
					<div className={styles.StyleguideHeader}></div>
					{this.listComponents()}
				</div>
			</div>
		);
	}
});

export default Styleguide;