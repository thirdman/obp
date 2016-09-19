/* eslint max-len: off */
import React, {Component} from 'react';
import cx from 'classnames';

const styles = require('./Placeholder.scss');

export default class Placeholder extends Component {
	static propTypes = {
		title: React.PropTypes.string,
		content: React.PropTypes.string
	}

	render() {
		const { title, content } = this.props;
		return (
			<div className={cx(styles.Placeholder)}>
				{title ?
					<h3>{title}</h3>
					: null
				}
				{content ?
					<div>{content}</div>
					: <span>
					<p>Porta gravida odio nulla lacus mi eget ante pharetra vestibulum mattis parturient ullamcorper adipiscing ut sodales ad mi vestibulum consectetur nullam. Hac et massa nascetur hendrerit eu penatibus a a scelerisque a nam eu integer a eleifend aliquet at vestibulum ullamcorper. Gravida malesuada mi sagittis a suspendisse scelerisque ad a tortor vestibulum lacus vestibulum viverra euismod vestibulum erat posuere a vulputate leo montes. A est interdum arcu per venenatis condimentum suspendisse iaculis suspendisse habitasse consectetur adipiscing diam scelerisque scelerisque ad parturient vestibulum facilisis pretium. Nisl congue vivamus mus tempor a molestie eros adipiscing vestibulum venenatis placerat eget eu hac posuere ullamcorper condimentum fringilla tellus condimentum a odio ullamcorper. Ad mi tempus dui faucibus nibh non magnis maecenas scelerisque himenaeos urna taciti nisi cum rutrum et inceptos donec eros id vel.</p><p>Sed phasellus posuere ligula blandit eu erat ullamcorper conubia nullam parturient consectetur consectetur laoreet aliquam urna suspendisse eros lacus et maecenas mi habitasse dignissim aliquam aliquam. A parturient a suscipit faucibus facilisi eu vestibulum consectetur rhoncus sed vulputate porttitor a ut in parturient consectetur vestibulum condimentum conubia adipiscing parturient habitasse in dictumst lectus suscipit facilisis. Interdum et neque conubia velit vel tempor eleifend etiam condimentum cum aliquet ac vestibulum nisl condimentum.</p><p>Interdum praesent mus aliquam parturient dictumst sit ullamcorper a vestibulum a lacinia nunc sit eros magnis parturient varius non ultrices ad suspendisse a. Ut commodo convallis primis netus nec id molestie vivamus vestibulum cum nisi pulvinar dui vivamus congue ullamcorper eros nisl iaculis nisl scelerisque.</p>
					</span>
				}
			</div>
		);
	}
}
