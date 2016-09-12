QuickView

*****title*****

A hover information/tooltip/help component.

#### usage

Wrap it around the thing you want to trigger, or give it an icon.
**NOTE** Example won't work until children are supported


#### props
|Property				|	Type			|	Default	|	Description
:---------------------------|:--------|:--------------|:--------------------------------
content					|	`string`	|	-							|	text to display in the dialog
title						|	`string`	|	-				|	title of the dialog
units						|	`string`	|	'%'			|	progress unit
viewType				|	`string`	|	- 			|	**(future)** will determine the display based on type of content
align						|	`string`	|	center 	|	aligns to parent edge. By default will be central
childWidth			|	`number`	|	- 			|	set the width of the content it is wrapping
hasCloseBuutton	|	`bool`		|	false		|	shows a close button
showInfo				|	`bool`		|	false		|	sets initial state of visibility
classNameProps	|	`array`		| ['normal']	|	array of classes to apply to the component (see below for available classes)
children				|	`oneOfType` | - 		| the content that the quickview Wraps around
		
#### state
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
showInfo				|	`bool`	|	prop	|	controls the showing of the popover


#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`		| default style (optional)


#### TODO
- **IMCOMPLETE**: needs better width and height settings
- Ideally should reposition absed on dom width of child elements
- needs 'type' control: Agreement/Proepty/Entity etc

*****description*****
<div style={{width: `40px`, height: `40px`}}><QuickView content="This is an example of the sort of text that might appear">
	<Icon icon="question" classNameProps={['grey']} />
</QuickView></div>
<div style={{display: `inline-block`, marginLeft: `24px`, width: `300px`, height: `40px`, backgroundColor: `#eee`}}><QuickView title="title" content="of course he is">
	gareth is cool
</QuickView></div>

*****example*****
[
{
	"component": "QuickView",
	"props": {
		"content": "this is the text that will appear",
		"classNameProps": ["normal"]
		}
},{
	"component": "QuickView",
	"props": {
		"content": "this is the text that will appear",
		"size": 300, 
		"classNameProps": ["normal"]
		}
}]