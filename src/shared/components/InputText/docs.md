InputText

*****title*****

Input component for standard text input

#### props
|Property				|	Type				|	Default		|	Description
:---------------|:------------|:----------|:--------------------------------
type						|	`string`		|	'text'		|	oneOf ('text', 'password')
label						|	`string`		|	'-'				|	label above the Input
value						|	`string`		|	-					|	text inside the input. 
placeholder			|	`string`		|	-					|	helper text that displays before there is any value 
backgroundColor	|	`string`		|	-					|	forces a background color
hasValidation		|	`bool`			|	-					|	if it has validation
isRequired			|	`bool`			|	false			|	if it is required
hasRequiredIcon	|	`bool`			|	true			|	allows you to turn off the 'required' icon (eg in login page, where it is assumed)
hasError				|	`bool`			|	false			|	if there is an error
onChangeProps		|	`func`			| -					|	function to call when changed
classNameProps	|	`array`			| ['normal']	|	array of classes to apply to the component (see below for available classes)

#### state

#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`					| default styling
`clean`						| makes the the 'Material' style clean version
`space`						| adds a 24px gap above it (usually used when multiple follow each other)
`small`						| width: 100px;
`medium`					| (unused) placeholder if we want to set a medium width
`large`						| (unused) placeholder if we want to set a large width
`hasError`						| applied when the hasError props is true
`required`				| applied when it isRequired (adds text to the title)
`contentItem`			| moves it up 8px, for when it exists inside a contentItem component

#### TODO
- potentially remove all validation(@khanh?) or only show it in a wrapping ContentItem component
- fix up the clashing value and placeholder of the cleanstyle
- fix up the default styling for isrequired
- set up other types of inputs

*****description*****
<InputText classNameProps={['normal', 'space']} isRequired placeholder="Normal style" />
<InputText classNameProps={['normal', 'space']} isRequired hasError placeholder="Normal style with error" />
<InputText classNameProps={['normal', 'space']} value="existing value"  placeholder="Normal style with existing value" />
<InputText classNameProps={['clean', 'space']} placeholder="clean style" label="Test label" />
<InputText classNameProps={['clean', 'space']} placeholder="clean style with placeholder"/>
<InputText classNameProps={['clean', 'space']} isRequired value="" placeholder="Required Item" />
<InputText classNameProps={['clean', 'space']} value="existing value" placeholder="replace the existing value" />
					*****example*****
[
{
	"component": "InputText",
	"props": {
		"isRequired": true,
		"placeholder": "normal style",
		"classNameProps": ["normal", "space"]
	}
},{
	"component": "InputText",
	"props": {
		"isRequired": true,
		"hasError": true,
		"placeholder": "normal style with error",
		"classNameProps": ["normal", "space"]
	}
},{
	"component": "InputText",
	"props": {
		"label": "Test Label",
		"value": "existing text value",
		"placeholder": "clean style",
		"classNameProps": ["normal", "space"]
	}
},{
	"component": "InputText",
	"props": {
		"label": "Test Label",
		"placeholder": "clean style",
		"classNameProps": ["clean", "space"]
	}
},{
	"component": "InputText",
	"props": {
		"label": "Test Label",
		"value": "existing text value",
		"placeholder": "clean style",
		"classNameProps": ["clean", "space"]
	}
},{
	"component": "InputText",
	"props": {
		"placeholder": "clean style with only a placeholder",
		"classNameProps": ["clean", "space"]
	}
},{
	"component": "InputText",
	"props": {
		"isRequired": true,
		"placeholder": "required clean style",
		"classNameProps": ["clean", "space"]
	}
},{
	"component": "InputText",
	"props": {
		"isRequired": true,
		"placeholder": "required clean style",
		"value": "existing text value",
		"classNameProps": ["clean", "space"]
	}
},{
	"component": "InputText",
	"props": {
		"placeholder": "required clean style",
		"placeholderBelow": true,
		"value": "existing text value",
		"classNameProps": ["clean", "space"]
	}
}
]