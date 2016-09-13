IconButton

*****title*****
Extends a button and icon components

#### props
|Property				|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
text						|	`string`	|	-	|	the text to appear in the button, 
hoverIconColor 	|	`string`	|	- |	(optional) define the colour of the icon to be used when hovering
helpText		 		|	`string`	|	- |	(optional) text to show when you hover
icon						|	`string`	|	|	generates an icon for the button. Icon name matches the file name of a file in the images/icons/interface folder
iconColor				|	`string`	|	'white' |	(optional) define the colour of the icon, if used
iconSize 				|	`number`	|	- |	in px,  leave blank for usual size
isActive				|	`bool`	|	false	|	when true, the button shows the nomos loading icon
isDisabled			|	`bool`	|	false	|	when true, the button is disabeld
isHovered				|	`bool`	|	false	|	set the hover s tate of the button
onClickProps		|	`func`	|	 	|	a function to call when the button is clicked
classNameProps	|	`array`	| ['normal']	|	array of classes to apply to the component (see below for available classes)

#### state
isHovered		|	`bool`	|	false	|	manages the hoverstate

#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`	| placeholder class

#### styles

#### TODO
- handle the case when there is no text for the button.

*****description*****

<IconButton />

*****example*****
[
	{
		"component":"IconButton",
		"props": {
			"classNameProps": ["normal"]
		}
	},
	{
		"component":"IconButton",
		"props": {
			"icon": "edit",
			"text": "edit",
			"helpText": "Edit this agreement",
			"classNameProps": ["normal"]
		}
	}
]
