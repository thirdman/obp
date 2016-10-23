import React, {Component} from 'react';
import cx from 'classnames';
import {
	Button,
	Column,
	Icon,
	Row,
	} from 'components';
import theData from './dataObjects.jsx';

// const objectsJson = theData.objectsJson;
const templatesJson = theData.templateData;
// const sectionsJson = theData.sectionsJson;
// const itemsJson = theData.itemsJson;
console.log(templatesJson);

const styles = require('../DevContent.scss');
const iconObject = require('../images/object.svg');
const iconPage = require('../images/page.svg');
const iconSection = require('../images/section.svg');
const iconItem = require('../images/item.svg');

export default class TemplateLine extends Component {
	state = {
		isOpen: false,
		hasChildren: false,
		showChildren: false,
	}
	componentWillMount() {
			console.log('this.props.item.items items length: ', this.props.item);
		if (this.props.item.items) {
			// this.toggleOpen();
			this.setChildren();
		}
	}
	// componentDidMount{}
	render() {
		const {
			item,
			templateId
			} = this.props;
		const {
			isOpen,
			hasChildren
		} = this.state;

		let childItems;
		console.log(item);

		if (item.items) {
			childItems = Object.values(item.items);
			// this.doState;
			console.log('child items length: ', childItems.length);
		}
		return (
			<div
				className={
					cx(
						styles.templateRow,
						styles[item.templateDepth],
						(hasChildren ? styles.hasChildren : ''),
						(isOpen ? styles.isOpen : '')
						)
					}
				>
				<Row>
					<Column occupy={1}>
						{hasChildren ?
							<div
								className={styles.childIndicator}
								onClick={() => this.toggleOpen(event)}
							>
								<Icon
									icon={isOpen ? 'chevron-down' : 'chevron-right'}
									size={10}
									color={isOpen ? 'grey' : 'black'}
									iconHoverColor="blue" />
							</div>
							: null
						}
					</Column>
					<Column occupy={5} onClick={() => this.toggleOpen(event)}>
					<div>
								{	item.templateDepth === 'object' ?
									<span className={styles.smallIconWrap}>
										<span dangerouslySetInnerHTML={{__html: iconObject}} />
									</span>
										: null
								}
								{	item.templateDepth === 'page' ?
									<span className={styles.smallIconWrap}>
												<span dangerouslySetInnerHTML={{__html: iconPage}} />
									</span>
										: null
								}
								{	item.templateDepth === 'section' ?
									<span className={styles.smallIconWrap}>
											<span dangerouslySetInnerHTML={{__html: iconSection}} />
									</span>
										: null
								}
								{	item.templateDepth === 'item' ?
									<span className={styles.smallIconWrap}>
											<span dangerouslySetInnerHTML={{__html: iconItem}} />
									</span>
										: null
								}
							<span>{item.templateDepth ? item.templateDepth + ': ' : null }{item.title}</span>
							</div>
					</Column>
					<Column occupy={3} onClick={() => this.toggleOpen(event)}>
							{item.templateName || ''}
					</Column>
					<Column occupy={3}>
						{hasChildren ?
							<Button
								type="text"
								content={!isOpen ? 'Expand' : 'Collapse'}
								onClickProps={() => this.toggleOpen()}
								classNameProps={['inline']}
								/>
								: null
							}
						{item.templateId ?
								<Button
									type="text"
									content={'View'}
									onClickProps={() => this.onViewDetail('section', item.templateId)}
								classNameProps={['inline']}
								/>
								: null
							}
					</Column>
				</Row>
				{hasChildren && isOpen ?
					<span>
					{
						childItems.map((childItem, childIndex) => {
							return (
								<TemplateLine item={childItem} templateId={templateId} key={childIndex} />
							);
						})
					}
					</span>
					: null
				}
			</div>
		);
	}

	toggleOpen = () => {
		console.log('toggle');
		return (
			this.setState({isOpen: !this.state.isOpen})
		);
	}
	setChildren = () => {
		return (
			this.setState({hasChildren: true})
		);
	}

	static propTypes = {
		item: React.PropTypes.object,
		templateId: React.PropTypes.number
	}
}
