import React, {Component} from 'react';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
// import { IconButton } from 'components';

const styles = require('./Avatar.scss');
const iconUser = require('../../images/icons/interface/user.svg');
const iconOrg = require('../../images/icons/interface/company.svg');

export default class Avatar extends Component {

	state = {
		tooltip: this.makeId()
	}

	render() {
		const { tooltip } = this.state;
		const {
			classNameProps = [],
			type = 'user',
			size = 'small',
			base64,
			imageUrl,
			defaultIconColor,
			title
		} = this.props;

		let classes;
		let defaultIcon;

		if (type === 'user') {
			defaultIcon = iconUser;
		} else {
			defaultIcon = iconOrg;
		}

		classes = classNameProps.slice();
		classes = classes.concat(type, size, defaultIconColor);

		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div
				className={cx(styles.Avatar, classes)}
				data-tip={title}
				data-for={`AvatarTooltip${tooltip}`}
				data-class={styles.tooltip} >
				{imageUrl || base64 ?
					<img
						src={this.getImgSrc()}
						alt={title}
						className={styles.avatarImage} />
					:
					<span
						className={styles.iconWrap}
						dangerouslySetInnerHTML={{__html: defaultIcon}}
					/>
				}
				<ReactTooltip id={`AvatarTooltip${tooltip}`} type="light" />
			</div>
		);
	}

	getImgSrc() {
		const {
			base64,
			imageUrl
		} = this.props;
		if (base64) {
			return `data:image/png;base64,${base64}`;
		} else {
			return imageUrl;
		}
	}

	makeId() {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}

	static propTypes = {
		type: React.PropTypes.string,
		size: React.PropTypes.string,
		imageUrl: React.PropTypes.string,
		title: React.PropTypes.string,
		defaultIconColor: React.PropTypes.string,
		sourceFolder: React.PropTypes.string,
		classNameProps: React.PropTypes.array
	}
}
