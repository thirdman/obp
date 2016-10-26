import React, {Component} from 'react';
import cx from 'classnames';
import {
	Button,
	Column,
	Icon,
	Row,
	} from 'components';
import theData from './templateData.jsx';

const templatesJson = theData.templateData;

console.log('Template data is:', templatesJson);

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
		// console.log('templatesJson[this.props.templateId]): ', templatesJson[this.props.templateId]);
		if (
			templatesJson[this.props.templateId] &&
			templatesJson[this.props.templateId].templateType &&
			templatesJson[this.props.templateId].templateType === 'user' &&
			templatesJson[this.props.templateId].content) {
			// this.toggleOpen();
			this.setChildren();
		}
	}
	// componentDidMount{}
	render() {
		const {
			// item,
			templateId
			} = this.props;
		const {
			isOpen,
			hasChildren
		} = this.state;

		let childTemplates;
		// console.log(templateId);
		// console.log(item);
		// console.log('templateData[templateId]: ', templatesJson[templateId]);
		let template = templatesJson[templateId];
/*
		if (item && !template) {
			template = item;
		}
*/
		if (template && template.content && template.content.templates) {
			childTemplates = Object.values(template.content.templates);
			// this.doState;
			// console.log('child items length: ', childTemplates.length);
		}
		return (
			<div
				className={
					cx(
						styles.templateRow,
						styles[template.templateDepth],
						(hasChildren ? styles.hasChildren : ''),
						(isOpen ? styles.isOpen : '')
						)
					}
				>
				<Row>
					<Column occupy={6} onClick={() => this.toggleOpen(event)}>
					<div>
						{hasChildren ?
							<div
								className={styles.childIndicator}
								onClick={() => this.toggleOpen(event)}
							>
								<Icon
									icon={isOpen ? 'chevron-down' : 'chevron-right'}
									size={10}
									color={isOpen ? 'blue' : 'black'}
									iconHoverColor="blue" />
							</div>
							: null
						}
								{	template.templateDepth === 'object' ?
									<span className={styles.smallIconWrap}>
										<span dangerouslySetInnerHTML={{__html: iconObject}} />
									</span>
										: null
								}
								{	template.templateDepth === 'page' ?
									<span className={styles.smallIconWrap}>
												<span dangerouslySetInnerHTML={{__html: iconPage}} />
									</span>
										: null
								}
								{	template.templateDepth === 'section' ?
									<span className={styles.smallIconWrap}>
											<span dangerouslySetInnerHTML={{__html: iconSection}} />
									</span>
										: null
								}
								{	template.templateDepth === 'item' ?
									<span className={styles.smallIconWrap}>
											<span dangerouslySetInnerHTML={{__html: iconItem}} />
									</span>
										: null
								}
								<span>
									{template.templateDepth ? template.templateDepth + ': ' : null }
									{template.templateName}
								</span>
							</div>
					</Column>
					<Column occupy={2} onClick={() => this.toggleOpen(event)}>
							{template.templateType}
					</Column>
					<Column occupy={1} onClick={() => this.toggleOpen(event)}>
							{template.templateId}
					</Column>
					<Column occupy={3}>
						<div className={styles.buttonWrap}>
						{hasChildren ?
							<Button
								type="text"
								content={!isOpen ? 'Expand' : 'Collapse'}
								onClickProps={() => this.toggleOpen()}
								classNameProps={['inline']}
								/>
								: null
							}
						{template.templateId ?
								<Button
									type="text"
									content={'View'}
									onClickProps={() => this.onViewDetail('section', template.templateId)}
								classNameProps={['inline']}
								/>
								: null
							}
							</div>
					</Column>
				</Row>
				{hasChildren && isOpen ?
					<span>
					{
						childTemplates.map((childTemplate, childIndex) => {
							return (
								<TemplateLine
									item={childTemplate}
									templateId={childTemplate.templateId}
									key={childIndex}
								/>
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
