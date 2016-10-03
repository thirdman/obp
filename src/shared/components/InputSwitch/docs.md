InputSwitch

*****title*****
A group of buttons. Use when there are a few distinct options 

#### props
|Property		|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
content		|	`array`	|	['yes', 'no']	|	the pair of text to appear in the switch
isSelected		|	`bool`	|	false	|	selected mean it's on the green side.
onClickProps		|	`func`	|	-	|	a function to call when the button is clicked
classNameProps		|	`array`	| ['normal']	|	array of classes to apply to the component (see below for available classes)

#### state
#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`	| default styling

#### styles
#### TODO
- INCOMPLETE
- need to decide if the switch is controlled in this component, or from props

*****description*****
<InputSwitch content={['yes', 'no']} />
<InputSwitch content={['yes', 'no']} isSelected/>
<InputSwitch content={['on', 'off']} />
<InputSwitch content={['on', 'off']} isSelected/>
*****example*****
[{
	"component":"InputSwitch",
	"props": {
		"classNameProps": ["normal"]
	}
},{
	"component":"InputSwitch",
	"props": {
		"classNameProps": ["normal"],
		"isSelected": true
	}
},{
	"component":"InputSwitch",
	"props": {
		"classNameProps": ["large"],
		"content": ["on", "off"]
	}
},{
	"component":"InputSwitch",
	"props": {
		"classNameProps": ["large"],
		"content": ["on", "off"],
		"isSelected": true
	}
}]

