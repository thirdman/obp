ContentItem

*****title*****

A content item is a display element wrapper for form elements. It provides additional functionality such as label, validation, help content.


#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
type						|	`string`	|	-	|	what type of input element is is: text, textarea, ButtonSwitch
title						|	`string`	|	'example title'	|	the title that appears at the top.
description			|	`string`	|	-	|	the instructions that appear under the title, and before the input
units						|	`string`	|	-	|	units to appear after the input (eg 'm2')
preText					|	`string`	|	-	|	appears before the input (eg '$')
postText				|	`string`	|	-	|	appears after the input (eg ' per each rent period')
hasValidation		|	`bool`		|	false	|	if validation should show
isRequired			|	`bool`		|	false	|	if this input is required to be completed
isValid					|	`bool`		|	false	|	indicated this contentItem is valid and complete
hasDivider			|	`bool`		|	false	|	puts a line above the contentItem
hasBackground		|	`bool`		|	false	|	controls whether a background is to be shown
hasPadding			|	`bool`		|	true	|	adds 8px padding above & below. (set to false when running contentItems without titles)
validationError	|	`bool`		|	false	|	when true the component will show the content error message
validationMissing	|	`bool`		|	false	|	when true the component will show the missing content error
validationMessageError		|	`string`	|	-	|	message to appear if input is invalid
validationMessageMissing		|	`string`	|	-	|	message to appear if input is missing (ie. required)
helpContent			|	`string`	|	-	|	message to appear on help hover
helpId					|	`string`	|	-	|	(anticipated) id of further help content in knowledgebase
helpSize				|	`number`	|	-	|	(unused) size of quickview component
columnSize			|	`number`	|	12	|	number of colums to take up (out of 12). 12 = 100%
children				|	`oneOfType` | - | (required) this component is designed to wrap around a child content
classNameProps	|	`array`	| ['normal']	|	array of classes to apply to the component (see below for available classes)

#### state
#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`	| default styling
`inline`	| will make the content item display inline next to another. eg. for currency input
`space`	| adds 24px above it.
`highlighted`	| makes it stand out with a grey bg.
`hasDivider`	| puts a line above it.



#### styles
#### TODO
- **DOCUMENTATION ERROR**: note, these won't work until chilidren can work.
- I need ensure that all iunput types work (once they are done)

*****description*****
					<ContentItem
						type="inputText"
						classNameProps={['normal', 'space']}
						title="Example Title - basic usage"
						description="This is some optional instructions.  This example has a preText, unit, and postText."
						units="m2"
						preText="$"
						postText="of every building"
						helpContent="This is an example of inline help provided to the component."
						helpId={1234}
						columnSize={9}
						icon="View"
					><InputText classNameProps={['normal', 'small']}/>
					</ContentItem>
					<ContentItem
						type="inputText"
						classNameProps={['normal', 'space', 'hasValidation']}
						title="A title without an icon"
						description="This is an example of an error message."
						helpContent="This is an example of inline help provided to the component."
						hasValidation
						validationMessageMissing="This input must have some content"
					>
					<InputText classNameProps={['normal', 'required', 'error', 'contentItem']}
						isRequired
						error
						placeholder="Some placeholder text" />
					</ContentItem>
					<ContentItem
						type="inputText"
						classNameProps={['normal', 'highlighted', 'space']}
						title="A title without an icon"
						description="This is some optional instructions about what to put in"
						helpContent="This is an example of inline help provided to the component."
						columnSize={9}
					/>
					<ContentItem
						type="inputText"
						classNameProps={['normal', 'hasDivider', 'inline']}
						title="Inline content item"
						description="having a description and divider"
						helpContent="This is an example of inline help provided to the component."
					><InputText classNameProps={['clean']} placeholder="placeholder" isRequired/>
					</ContentItem>
					<ContentItem
						type="inputText"
						classNameProps={['normal', 'hasDivider', 'inline']}
						title="Inline content item"
						description="having a description and divider"
						helpContent="This is an example of inline help provided to the component."
					><InputText classNameProps={['clean']} placeholder="placeholder" />
					</ContentItem>
					*****example*****
[
{
	"component": "ContentItem",
	"props": {
		"type": "inputText",
		"title": "Example Title - basic usage",
		"description": "This is some optional instructions.  This example has a preText, unit, and postText.",
		"units": "m2",
		"preText": "$",
		"postText": "of every building",
		"helpContent": "This is an example of inline help provided to the component.",
		"helpId": 1234,
		"columnSize": 9,
		"icon":"view",
		"validationMessageMissing": "This input must have some content",
		"classNameProps": ["normal", "space"]
	}
},{
	"component": "ContentItem",
	"props": {
		"type": "inputText",
		"title": "A title without an icon",
		"description": "This is an example of an error message.",
		"helpContent": "This is an example of inline help provided to the component.",
		"validationMessageMissing": "This input must have some content",
		"classNameProps": ["normal", "space", "hasValidation"]
	}
},{
	"component": "ContentItem",
	"props": {
		"type": "info",
		"title": "Is Gareth Cool?",
		"classNameProps": ["normal"]
	}
}]
