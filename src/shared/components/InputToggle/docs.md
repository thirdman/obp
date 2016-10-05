InputToggle

*****title*****

for toggling things on and off. 

#### props
|Property						|	Type				|	Default		|	Description
:-------------------|:------------|:----------|:--------------------------------
content							|	`string`		|	-					|	text inside the button
color								|	`string`		|	-					|	at this point, only 'green' works other than the normal.
isButton						|	`bool`			|	true			|	is it read only
isSelected					|	`bool`			|	-					|	if it is in the 'selected' state
children						|	`oneOfType` | - 				| You may wrap this component around child content - it SHOULD work :-)
onClickProps				|	`func`			|	-					|	a function to call when the button is clicked
classNameProps			|	`array`			| ['normal']|	array of classes to apply to the component (see below for available classes)

#### state
#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`	| default styling
`v4`			| default styling from v4 forms.
`left`		| legacy (use with v4) Puts the tick ont he left hand side
`custom`	| legacy (use with v4) Makes it yellow, like a custom data toggle

#### styles
#### TODO
- Determine whether we need the legacy styles.

*****description*****
<InputToggle content="he content here is selected" classNameProps={['normal']} isSelected />
<InputToggle content="The content not selected" classNameProps={['normal']} />

*****example*****
[{
	"component":"InputToggle",
	"props": {
		"content": "selected",
		"isSelected": true
	}
},{
	"component":"InputToggle",
	"props": {
		"content": "not selected"
	}
},{
	"component":"HorizontalRule",
	"props": {
		"classNameProps": ["normal"]
	}
},{
	"component":"InputToggle",
	"props": {
		"content": "legacy style (selected)",
		"classNameProps": ["v4"],
		"isSelected": true,
		"color": "green"
	}
},{
	"component":"InputToggle",
	"props": {
		"content": "legacy style (unselected)",
		"classNameProps": ["v4"]
	}
},{
	"component":"InputToggle",
	"props": {
		"content": "legacy style (selected) left icon",
		"classNameProps": ["left"],
		"isSelected": true,
		"color": "green"
	}
},{
	"component":"InputToggle",
	"props": {
		"content": "legacy style (unselected) left icon",
		"classNameProps": ["left"],
		"color": "green"
	}
},{
	"component":"InputToggle",
	"props": {
		"content": "the content here is selected",
		"classNameProps": ["custom"],
		"isSelected": true,
		"color": "yellow"
	}
},{
	"component":"InputToggle",
	"props": {
		"content": "the content here is not",
		"classNameProps": ["custom"],
		"color": "yellow"
	}
}]
