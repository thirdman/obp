import React, {Component} from 'react';
import cx from 'classnames';

import {
	Accordion,
	AccordionSection,
	Button,
	HorizontalRule,
	InputSwitch,
	Column,
	ContentItem,
	IconButton,
	InputCheckbox,
	InputText,
	InputTextarea,
	Row,
	Section
	} from 'components';

	const styles = require('./CustomDataItem.scss');
	// const globalStyles = require('../../containers/App/App.scss');

export default class CustomDataItem extends Component {
	state = {
		component: 'InputTextarea',
		// description: 'this is the description',
		// itemTitle: 'set a title',
		// hasDivider: false,
		// hasBorder: false,
		// hasBackground: false,
		template: {
			title: 'set a title',
			description: 'this is the description',
			hasDivider: false,
			hasBorder: false,
			hasBackground: false,
			hasPadding: false,
			preText: null,
			postText: null,
			units: null,
			helpContent: null,
		},
		isRequired: false,
		validationMessageError: 'There is an error in the content',
		validationMessageMissing: 'Missing content',
		placeholder: '',
		showJson: false,
		InputSwitch: {
			isSelected: false
		},
		hasValidJson: true
	}
	componentWillMount() {
		this.setState({
			scroll: {
				transform: 'yes',
				isScrolled: false
				}
		});
	}
	componentDidMount() {
		console.log(this);
		window.addEventListener('scroll', this.handleScroll.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll.bind(this));
	}

	render() {
		const {
			classNameProps = []
			} = this.props;
		let renderComponent;
		let jsonOutput;
		let classes;
		jsonOutput = JSON.stringify(this.state, null, 4);

		classes = classNameProps
			.filter((cName) => { return !!cName; })
			.map((classV) => styles[classV]).join(' ');

		// Sets up the different components...
		// needs to be refactored
		if (this.state.component === 'InputText') {
			renderComponent = (
					<InputText
						value={''}
						classNameProps={['clean']}
						placeholder={this.state.template.placeholder || ''}
						isRequired={this.state.isRequired}
						classNameProps={['inline']}
						placeholderBelow
					/>
			);
		}
		if (this.state.component === 'InputTextarea') {
			renderComponent = (
					<InputTextarea
						value={''}
						classNameProps={['normal']}
						placeholder={this.state.template.placeholder || ''}
						isRequired={this.state.isRequired}
						rows={3}
					/>
			);
		}
		if (this.state.component === 'InputSwitch') {
			renderComponent = (
					<InputSwitch
						content={['yes', 'no']}
						classNameProps={['normal']}
						isSelected={this.state.InputSwitch.isSelected}
					/>
			);
		}
		let tempStyle = {
			position: 'absolute',
			right: 0
			};
		let tempStyleEdit = {
			fontFamily: 'monospace',
			color: '#000'
		};
		let tempScrollStyle;
		if (this.state.scroll.isScrolled) {
			tempScrollStyle = {
				transform: 'translateY(' + this.state.scroll.distance + 'px)'
			};
		} else {
			tempScrollStyle = {
				transform: 'translateY(' + 0 + 'px)'
			};
		}

		return (
			<div className={cx(styles.CustomDataItem, classes)} >
				<div className={styles.CustomDataWrapper}>
					<Row isFlex>
						<Column occupy={6} isFlex>
						<div className={styles.PanelEdit}>
							<h3>Edit: [{this.state.template.title}]</h3>
							<Section title="Component Type" >
								<Button
									content="text"
									onClickProps={() => this.doComponentType('InputText')}
									classNameProps={
										[(this.state.component === 'InputText' ? 'highlighted' : 'normal')]
									}
									/>
								<Button
									content="textarea"
									onClickProps={() => this.doComponentType('InputTextarea')}
									classNameProps={
										[(this.state.component === 'InputTextarea' ? 'highlighted' : 'normal')]
										}
									/>
								<Button
									content="InputSwitch"
									onClickProps={() => this.doComponentType('InputSwitch')}
									classNameProps={
										[(this.state.component === 'InputSwitch' ? 'highlighted' : 'normal')]
										}
									/>
							</Section>
							<HorizontalRule />
							<Accordion uniqueId={'testAccordion'}>
								<AccordionSection title="General Item Settings">
									<Section>
										<ContentItem
											type={'text'}
											title="Item Title"
											content={this.state.template.title}
										>
											<InputText
												value={this.state.template.title}
												onChangeProps={() => this.doTemplateState('title', 'editTitle')}
												// onChangeProps={this.doTitle}
												ref={(c) => { this.editTitle = c; }}
												/>
										</ContentItem>
										<ContentItem
											type={'text'}
											title="Item Description"
										>
											<InputText
												value={this.state.template.description}
												onChangeProps={() => this.doTemplateState('description', 'editDescription')}
												ref={(c) => { this.editDescription = c; }}
												placeholder={'Set the item description'}
												placeholderBelow
												hasValidation
												/>
										</ContentItem>
										<ContentItem
											type={'text'}
											title="Item Placeholder"
										>
											<InputText
												value={this.state.template.placeholder ? this.state.template.placeholder : ''} // eslint-disable-line
												// onChangeProps={this.doPlaceholder}
												onChangeProps={() => this.doTemplateState('placeholder', 'editPlaceholder')}
												ref={(c) => { this.editPlaceholder = c; }}
												placeholder={'Set the item placeholder'}
												placeholderBelow
												hasValidation
												/>
										</ContentItem>
										<ContentItem type={'text'} title="Popup Help Content" >
											<InputText
												value={this.state.template.helpContent ? this.state.template.helpContent : ''} // eslint-disable-line
												// onChangeProps={this.doHelpContent}
												onChangeProps={() => this.doTemplateState('helpContent', 'editHelpContent')}
												ref={(c) => { this.editHelpContent = c; }}
												placeholder="'eg. 'This content helps us decide what the rent should be"
												placeholderBelow
												/>
										</ContentItem>
									</Section>
								</AccordionSection>
								<AccordionSection title="Advanced Settings">
									<Row>
										<ContentItem type={'text'} title="Units" columnSize={4} >
											<InputText
												value={this.state.template.units || ''}
												// onChangeProps={this.doUnits}
												onChangeProps={() => this.doTemplateState('units', 'editUnits')}
												ref={(c) => { this.editUnits = c; }}
												placeholder="eg. 'mm'"
												placeholderBelow
												/>
										</ContentItem>
										<ContentItem type={'text'} title="Pre-Text" columnSize={4} >
												<InputText
													value={this.state.template.preText ? this.state.template.preText : ''}
													// onChangeProps={this.doPreText}
													onChangeProps={() => this.doTemplateState('preText', 'editPreText')}
													ref={(c) => { this.editPreText = c; }}
													placeholder="Shown before the input"
													placeholderBelow
													/>
										</ContentItem>
										<ContentItem type={'text'} title="Post-Text" columnSize={4} >
											<InputText
												value={this.state.template.postText ? this.state.template.postText : ''}
												// onChangeProps={this.doPostText}
												onChangeProps={() => this.doTemplateState('postText', 'editPostText')}
												ref={(c) => { this.editPostText = c; }}
												placeholder="Shown after the input"
												placeholderBelow
												/>
										</ContentItem>
									</Row>
								</AccordionSection>
								<AccordionSection title="Validation Settings">
									<Section>
										<InputCheckbox
											value="this content is Required"
											id="chkisRequired"
											onChangeProps={this.toggleRequired}
											isSelected={this.state.isRequired}
											/>
										<ContentItem type={'text'} title="Error Message">
											<InputText
												value={this.state.validationMessageError ?
													this.state.validationMessageError
													: ''}
												onChangeProps={this.doMessageError}
												ref={(c) => { this.editMessageError = c; }}
												placeholder={'Message when the content has an error'}
												placeholderBelow
												hasValidation
												/>
										</ContentItem>
										<ContentItem
											type={'text'}
											title="Missing Message"
										>
											<InputText
												value={this.state.validationMessageMissing ?
													this.state.validationMessageMissing
													: ''}
												onChangeProps={this.doMessageMissing}
												ref={(c) => { this.editMessageMissing = c; }}
												placeholder={'Message when the content is missing'}
												placeholderBelow
												hasValidation
												/>
										</ContentItem>
									</Section>
								</AccordionSection>
								<AccordionSection title="Item Display settings">
									<Section>
										<InputCheckbox
											value="has Divider"
											id="chkHasDivider"
											// onClick={this.toggleDivider}
											// onChangeProps={this.toggleDivider}
											onChangeProps={() => this.doTemplateToggle('hasDivider', 'chkHasDivider')}
											isSelected={this.state.template.hasDivider}
											/>
										<InputCheckbox
											value="has Border"
											id="chkHasBorder"
											onChangeProps={() => this.doTemplateToggle('hasBorder', 'chkHasBorder')}
											// onChangeProps={this.toggleBorder}
											isSelected={this.state.template.hasBorder}
											/>
										<InputCheckbox
											value="has Background"
											id="chkHasBackground"
											// onChangeProps={this.toggleBackground}
											onChangeProps={() => this.doTemplateToggle('hasBackground', 'chkHasBackground')} //eslint-disable-line
											isSelected={this.state.template.hasBackground}
											/>
										<InputCheckbox
											value="has Padding"
											id="chkHasPadding"
											onChangeProps={() => this.doTemplateToggle('hasPadding', 'chkHasPadding')}
											isSelected={this.state.template.hasPadding}
											/>
									</Section>
								</AccordionSection>
								<AccordionSection title="Component Specific Settings">
								{this.state.component === 'InputSwitch' ?
									<Section title="InputSwitch">
										<InputCheckbox
											value="is selected by default"
											id="chkSwitchSelected"
											onChangeProps={this.toggleSwitchSelected}
											isSelected={this.state.InputSwitch.isSelected}
											/>
									</Section>
									: null
								}
								</AccordionSection>

							</Accordion>
						</div>
						</Column>

						<Column occupy={6} isFlex noMargin>
						<div
							className={
								cx(styles.PanelPreview,
								(this.state.scroll.isScrolled ? styles.isScrolled : styles.notScrolled))
							}
						>
							<div className={styles.settingsButtonWrap} style={tempStyle}>
								<IconButton
									icon="settings"
									iconColor={!this.state.showJson ? 'lightGrey' : 'blue'}
									onClickProps={this.toggleJson}
									hoverIconColor="black"
									iconSize={24}
									helpText="Show json output"
									/>
								{this.state.isRequired ?
									<IconButton
										icon="alert"
										isActive={this.state.showErrorMode}
										iconColor={!this.state.showErrorMode ? 'lightGrey' : 'blue'}
										onClickProps={this.doValidateError}
										hoverIconColor="black"
										iconSize={24}
										helpText="test error message" />
									: null
								}
								{this.state.isRequired ?
									<IconButton
										icon="question"
										isActive={this.state.showMissingMode}
										iconColor={!this.state.showMissingMode ? 'lightGrey' : 'blue'}
										onClickProps={this.doValidateMissing}
										hoverIconColor="black"
										iconSize={24}
										helpText="test missing content message" />
									: null
								}
								{this.state.isRequired ?
									<IconButton
										icon="tick-circle"
										isActive={this.state.isValid}
										iconColor={!this.state.isValid ? 'lightGrey' : 'blue'}
										onClickProps={this.doValid}
										hoverIconColor="black"
										iconSize={24}
										helpText="test valid state" />
									: null
								}
							</div>
							<h3>Preview</h3>
							<div className={styles.previewWrapper} style={tempScrollStyle}>
								<ContentItem
									title={this.state.template.title}
									type={this.state.template.component}
									description={this.state.template.description +
										(this.state.isRequired ? ' (Required)' : '')
										}
									helpContent={this.state.template.helpContent}
									hasDivider={this.state.template.hasDivider}
									hasBorder={this.state.template.hasBorder}
									hasBackground={this.state.template.hasBackground}
									hasPadding={this.state.template.hasPadding}
									preText={this.state.template.preText}
									postText={this.state.template.postText}
									units={this.state.template.units}
									hasValidation={
										this.state.hasValidation ||
										this.state.showErrorMode ||
										this.state.showMissingMode
										}
									validationError={this.state.showErrorMode}
									validationMissing={this.state.showMissingMode}
									validationMessageError={this.state.validationMessageError}
									validationMessageMissing={this.state.validationMessageMissing}
									isRequired={this.state.isRequired}
									isValid={this.state.isValid}
								>
									{renderComponent}
								</ContentItem>
							{this.state.showJson ?
								(
								<div className={styles.jsonOutput}>
									{!this.state.showEditJson ?
										<span>
											<Button
												content="edit"
												classNameProps={['hollow', 'right']}
												onClickProps={this.doEditJson}
												/>
											<pre>{jsonOutput}</pre>
										</span>
										: null
									}
									{ this.state.showEditJson ?
										<span>
											<div>
												<Button
													content="Save changes"
													isDisabled={!this.state.hasValidJson}
													classNameProps={[(this.state.hasValidJson ? 'highlighted' : 'hollow')]}
													onClickProps={this.saveEditJson} />
												<Button
													content="Close"
													classNameProps={['grey']}
													onClickProps={this.cancelEditJson}
													/>
												<div
													className={cx(styles.validJsonCheck,
														(this.state.hasValidJson ? styles.valid : styles.invalid))
														}>
														{this.state.hasValidJson ? 'Valid' : 'Invalid' }
												</div>
											</div>
											<div>
												<InputTextarea
													value={jsonOutput}
													ref={(c) => { this.editJsonTextarea = c; }}
													style={tempStyleEdit}
													onChangeProps={this.checkEditJson}
												/>
											</div>
										</span>
										: null
									}
								</div>
								)
								: null
							}
							</div>
						</div>
						</Column>
					</Row>
				</div>
			</div>
		);
	}

	doComponentType = (type) => {
		// console.log('setting component type to:', type);
		return (
			this.setState({ component: type})
		);
	};
	doTemplateState = (parameter, value) => {
		// console.log('parameter and value are: ', parameter, value);
		let theValue = this[value].textInput.value;
		this.setState({ template: { ...this.state.template, [parameter]: theValue } });
	};
	doTemplateToggle = (parameter, ref) => {
		console.log('ref is: ', ref);
		let theValue = !this.state.template[parameter];
		this.setState({ template: { ...this.state.template, [parameter]: theValue } });
	};


/*
	doTitle = () => {
		let theTitleValue = this.editTitle.textInput.value;
		this.setState({ itemTitle: theTitleValue});
		this.setState({ template: {title: theTitleValue}});
	};
	doDescription = () => {
		let theDescValue = this.editDescription.textInput.value;
		this.setState({ description: theDescValue});
		this.setState({ template: {description: theDescValue}});
	};
*/
/*
	doHelpContent = () => {
	// let theHelpValue = this.refs.editHelpContent.refs.textInput.value;
	let theHelpValue = this.editHelpContent.textInput.value;
	this.setState({ helpContent: theHelpValue});
	};
*/
	doPreText = () => {
	// let thePreTextValue = this.refs.editPreText.refs.textInput.value;
	let thePreTextValue = this.editPreText.textInput.value;
	this.setState({ preText: thePreTextValue});
	this.setState({ template: {preText: thePreTextValue}});
	};
	doPostText = () => {
	// let thePostTextValue = this.refs.editPostText.refs.textInput.value;
	let thePostTextValue = this.editPostText.textInput.value;
	this.setState({ postText: thePostTextValue});
	this.setState({ template: {postText: thePostTextValue}});
	};
	doUnits = () => {
	// let theUnitsValue = this.refs.editUnits.refs.textInput.value;
	let theUnitsValue = this.editUnits.textInput.value;
	this.setState({ units: theUnitsValue});
	this.setState({ template: {units: theUnitsValue}});
	};
	doMessageError = () => {
	// let theErrorValue = this.refs.editMessageError.refs.textInput.value;
	let theErrorValue = this.editMessageError.textInput.value;
	this.setState({ validationMessageError: theErrorValue});
	};
	doMessageMissing = () => {
	// let theMissingValue = this.refs.editMessageMissing.refs.textInput.value;
	let theMissingValue = this.editMessageMissing.textInput.value;
	this.setState({ validationMessageMissing: theMissingValue});
	};
/*
	toggleDivider = () => {
		console.log(this);
		console.log(this.chkHasDivider);
		console.log('toggling divider');
		console.log('divider state is: ', this.state.hasDivider);
		this.setState({ hasDivider: !this.state.hasDivider});
		this.setState({ template: {hasDivider: !this.state.hasDivider}});
	};
*/
/*
	toggleBorder = () => {
		this.setState({ hasBorder: !this.state.hasBorder});
		this.setState({ template: {hasBorder: !this.state.hasBorder}});
	};
	toggleBackground = () => {
		this.setState({ hasBackground: !this.state.hasBackground});
		this.setState({ template: {hasBackground: !this.state.hasBackground}});
	};
*/
	toggleRequired = () => {
		this.setState({ isRequired: !this.state.isRequired});
	};
	toggleJson = () => {
		this.setState({
			showJson: !this.state.showJson
		});
	};
	doEditJson = () => {
		this.setState({
			showEditJson: true
		});
	};
	cancelEditJson = () => {
		this.setState({
			showEditJson: false
		});
	};
	saveEditJson = () => {
		console.log('saving edit');
		if (this.editJsonTextarea) {
			console.log(this.editJsonTextarea);
			let theJsonValue = this.editJsonTextarea.textInput.value;
				if (this.isJson(theJsonValue)) {
					let stateObjOutput = JSON.parse(theJsonValue);
					this.setState(stateObjOutput);
					this.setState({
						showEditJson: false
					});
				}
		}
	};
	checkEditJson = () => {
		console.log('checking');
		if (this.editJsonTextarea) {
			console.log(this.editJsonTextarea);
			let theJsonValue = this.editJsonTextarea.textInput.value;
			if (this.isJson(theJsonValue)) {
				console.log('json is valid');
				this.setState({hasValidJson: true});
			} else {
				this.setState({hasValidJson: false});
				console.log('json is BAD');
			}
		}
	};

	toggleSwitchSelected = () => {
		this.setState({ InputSwitch: {isSelected: !this.state.InputSwitch.isSelected}});
	};

	isJson(str) {
		try {
			JSON.parse(str);
		} catch (error) {
			return false;
		}
		return true;
	}

	// SHOWING THE DIFFERENT VISUAL STATES OF THE PREVIEW
	doValidateError = () => {
		console.log('Simulating Error in content');
		this.setState({
			showErrorMode: !this.state.showErrorMode
		});
	};
	doValidateMissing = () => {
		console.log('Simulating missing content');
		this.setState({
			showMissingMode: !this.state.showMissingMode
		});
	};
	doValid = () => {
		this.setState({
			isValid: !this.state.isValid
		});
	};

	handleScroll(event) {
		const distanceBeforeMoving = 220;
		let top = (document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		// console.log(top);
		let scrollTop = event.srcElement.body.scrollTop;
		// console.log(scrollTop);
		let itemTranslate = Math.min(0, scrollTop / 3 - 60);
		// console.log(itemTranslate);
		let hasScrolled = (top > distanceBeforeMoving) || false;
		// console.log(itemTranslate);
		let amountToScroll = top - distanceBeforeMoving + 100;
		// console.log('amountToScroll is: ', amountToScroll);
		this.setState({
			scroll: {
				transform: itemTranslate,
				isScrolled: hasScrolled,
				distance: amountToScroll
			}
		});
	}

	static propTypes = {
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
		classNameProps: React.PropTypes.array
	}
}