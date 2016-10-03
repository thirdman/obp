Button

*****title*****

Generates a button

#### props
|Property					|	Type					|	Default	|	Description
:-----------------|:--------------|:--------|:--------------------------------
content						|	`string`			|	-				|	the text to appear in the button, 
helpContent				|	`string`			|	-				|	the text to appear in the tooltip, 
type							|	`string`			|	-				|	one of select, wrapper, hollow (proposed) [others to come] 
color							|	`string`			|	-				|	defines the color of the button (from: normal, grey, blue, green, red, orange, white)
icon							|	`string`			|					|	generates an icon for the button. Icon name matches the file name of a file in the images/icons/interface folder
iconColor					|	`string`			|	'white' |	(optional) define the colour of the icon, if used
iconPosition			|	`string`			|	'left' 	|	(optional) use 'right' to put the icon after the content
iconSize 					|	`number`			|	- 			|	in px,  leave blank for usual size
isActive					|	`bool`				|	false		|	when true, the button shows the nomos loading icon
isHighlighted			|	`bool`				|	false		|	when true, the button shows the blue version (same as highlighted class)
isDisabled				|	`bool`				|	false		|	when true, the button is disabeld
onClickProps			|	`func`				|	 				|	a function to call when the button is clicked
classNameProps		|	`array`				| ['normal'] |	array of classes to apply to the component (see below for available classes)
children					|	`oneOfType...`|	 				|	when button wraps text, the children appear as the content of the button


#### state
#### classNameProps
|classNameProps		|	Description
:-----------------|:--------------------------------
`normal`					| standard grey button
`blue`						| uses the nomos blue color (ie. same as .highlighted)
`grey`						| uses the nomos grey colour
`green`						| uses the nomos green colour
`red`							| uses the nomos red colour
`text`						| text only button
`highlighted`			| blue feature button. Use for the primary call to action of the section
`disabled`				| (depricated - use the isDisabled props) dulls the button to appear disabled
`selected`				| same as highlighted
`right`						| floats the button to the right
`large`						| large width button will fill container (max-width: 400px)
`expand`					| will expand to fill  the width of the container
`wide`						| as above
`round`						| Not recommended. Will round the corners of the button
`isHidden`				| utility class to hide the button (display:none,visibility:hidden)
`transparent`			| for use with wrapping children: ie. around an icon


#### styles

#### TODO	

- define all the possible types.  
- make colour a props, not a style
- unify the methods for types and styles

*****description*****

<Button />
<Button content="Click me!" classNameProps={['normal']} />
<Button content="Click me!" classNameProps={['highlighted']} />
<Button content="Click me!" classNameProps={['highlighted']} icon="view" />
<Button content="Click me!" classNameProps={['selected']} />
<Button content="Click me!" classNameProps={['grey']} />
<Button content="Click me!" classNameProps={['green']} />
<Button content="Click me!" classNameProps={['red']} />
<Button content="Click me!" classNameProps={['text']} />
<Button content="Action Item - found in action drop downs (hover me)" classNameProps={['text', 'actionItem']} />
<Button content="Click me!" classNameProps={['text']} />
<Button content="Click me!" classNameProps={['normal', 'large']} />
<Button content="Click me!" classNameProps={['green', 'expand']} />
<Button content="Click me!" classNameProps={['highlighted', 'round']} />
<Button content="Click me!" classNameProps={['normal', 'disabled']} />
<Button content="Click me!" classNameProps={['highlighted']} isActive />
<Button content="Click me!" classNameProps={['highlighted', 'isHidden']} />
<Button content="Click me!" classNameProps={['normal', 'right']} />
<div style={{display: `inline-block`, width: `32px`, height: `32px`}}>
	<Button content="Transparent" type="wrapper" ><Icon icon="view" color="grey" classNameProps={['grey']}/></Button>
</div>
*****example*****
[{
	"component":"Button",
	"props": {
		"classNameProps": ["normal"],
		"helpContent": "A normal button"
	}
},{
	"component":"Button",
	"props": {
		"content": "text",
		"classNameProps": ["highlighted"],
		"helpContent": "A highlighted button"
	}
},{
	"component":"Button",
	"props": {
		"content": "text",
		"icon": "view",
		"classNameProps": ["green"],
		"helpContent": "A coloured button with icon"
	}
},{
	"component":"Button",
	"props": {
		"content": "text",
		"classNameProps": ["red"]
	}
},{
	"component":"Button",
	"props": {
		"content": "text",
		"classNameProps": ["grey"]
	}
},{
	"component":"Button",
	"props": {
		"content": "text",
		"classNameProps": ["text"]
	}
},{
	"component":"Button",
	"props": {
		"content": "text",
		"classNameProps": ["text", "delete"],
		"helpContent": "A text button"
	}
},{
	"component":"Button",
	"props": {
		"content": "'right' class",
		"classNameProps": ["text", "red", "right"],
		"helpContent": "text button on the right"
	}
},{
	"component":"Button",
	"props": {
		"content": "Action Item - found in action drop downs (hover me)",
		"classNameProps": ["text", "actionItem"]
	}	
},{
	"component":"Button",
	"props": {
		"content": "expand",
		"classNameProps": ["expand", "green"],
		"helpContent": "A button that expands to fill its container"
	}	
},{
	"component":"Button",
	"props": {
		"content": "large",
		"classNameProps": ["normal", "large"],
		"helpContent": "A large button"
	}	
},{
	"component":"Button",
	"props": {
		"content": "round",
		"classNameProps": ["highlighted", "round"],
		"helpContent": "A Round button"
	}	
},{
	"component":"Button",
	"props": {
		"content": "disabled",
		"classNameProps": ["highlighted", "disabled"],
		"helpContent": "A disabled button"
	}	
},{
	"component":"Button",
	"props": {
		"content": "active",
		"isActive": true,
		"classNameProps": ["highlighted"],
		"helpContent": "An active button"
	}	
}]
