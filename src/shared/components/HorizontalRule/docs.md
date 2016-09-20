HorizontalRule

*****title*****
A horizontal dividng line. For use in seperating sections and such

#### state
|Prop		|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
color	|	`string`	|	line	|	nomos color keyword (line, black, darkGrey, grey, lightGrey, lightLightGrey, white, blue, green, red, orange, yellow)
width	|	`number`	|	100	|	percentage width of container div
isCentered	|	`bool`	|	true	|	is the line centered
hasMargins	|	`bool`	|	true	|	does it include 16px margins above and below
classNameProps		|	`array`	| ['normal']	|	array of classes to apply to the component (see below for available classes)



#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`dotted`	| dotted line
`dashed`	| dashed line


*****description*****

<HorizontalRule >
<HorizontalRule color="blue" width="80">
*****example*****
[{
	"component":"HorizontalRule",
	"props": {
		"classNameProps": ["normal"]
	}
},{
	"component":"HorizontalRule",
	"props": {
		"width": 80,
		"color": "blue",
		"classNameProps": ["dashed"]
	}
}]