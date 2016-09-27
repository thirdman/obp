import React, {Component} from 'react';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
// import { IconButton } from 'components';

const styles = require('./Avatar.scss');
const iconUser = require('../../images/icons/interface/user.svg');
const iconOrg = require('../../images/icons/interface/company.svg');

export default class Avatar extends Component {

	static propTypes = {
		type: React.PropTypes.string,
		size: React.PropTypes.string,
		imageUrl: React.PropTypes.string,
		title: React.PropTypes.string,
		sourceFolder: React.PropTypes.string,
		classNameProps: React.PropTypes.array
	}

	state = {
		tooltip: this.makeId()
	}

	makeId() {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}

	render() {
		const {
			classNameProps = [],
			type = 'user',
			size = 'small',
			imageUrl,
			title
		} = this.props;

		let classes;
		let defaultIcon;
		let randomNumber = parseInt(Math.random() * ((9999999999 - 1111111111) + 1111111111), 10);

		if (type === 'user') {
			defaultIcon = iconUser;
		} else {
			defaultIcon = iconOrg;
		}

		classes = classNameProps.slice();
		classes = classes.concat(type, size);

		classes = classes
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		return (
			<div
				className={cx(styles.Avatar, classes)}
				data-tip={title}
				data-for={`AvatarTooltip${randomNumber}`}
				data-class={styles.tooltip}
			>
				{imageUrl ?
					<img src={imageUrl} alt={title} className={styles.avatarImage} />
					:
					<span
						className={styles.iconWrap}
						dangerouslySetInnerHTML={{__html: defaultIcon}}
					/>
				}
				<ReactTooltip id={`AvatarTooltip${randomNumber}`} type="light" />
			</div>
		);
	}
}
