Icon

*****title*****

Diplays an icon


#### usage

The icon will fill 100% of the container element. In practice this means you need to wrap it in an .iconWrap div that has something like 'width: 24px; height: 24px'

#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
icon					|	`string`	|	'view'	|	name of the svg file
color					|	`string`	|	-	|	nomos colour keyword (black, darkGrey, grey, lightGrey, lightLightGrey, line, white, blue, green, red, orange, yellow)
source				|	`string`	|	'icons/interface'	|	source folder for the svg file. usually you can leave this alone.
borderColor		|	`string`	|	-	|	if it needs a border, put ht ekeyword here
size					|	`number`	|	-	|	(optional) in px, sets the size of the icon. by default, it will expand to fill the space in the wrapper - prefer to use .iconWrap in parent
colorHtml			|	`string`	|	-	|	*(proposed)* override colour with html colour reference (#aaaaaa)
hoverColor		|	`string`	|	-	|	*(proposed)* colour of icon when hovered.
classNameProps	|	`array`	| ['black']	|	array of classes to apply to the component (see below for available classes)


#### state

#### classNameProps

#### TODO
- build in ability to pass through has colour reference
- for sizing purposes, build in ability to pass through an iconWrap props so it automatially wraps it in a div

*****description*****
<Icon classNameProps={['normal']} icon="view" />
<Icon icon="view" color="grey" />
<Icon icon="view" color="lightGrey" />
<Icon icon="view" color="lightLightGrey" />
<Icon icon="view" classNameProps={['white']} color="white" />
<Icon classNameProps={['blue']} icon="entity" />
<Icon classNameProps={['red']} icon="property" />
<Icon classNameProps={['orange']} icon="edit" />
<Icon classNameProps={['green']} icon="edit" />
*****example*****
[{
	"component": "Icon"
},{
	"component": "Icon",
	"props": {
		"icon": "view",
		"color": "grey"
	}
},{
	"component": "Icon",
	"props": {
		"icon": "view",
		"color": "lightGrey"
	}
},{
	"component": "Icon",
	"props": {
		"icon": "entity",
		"color": "green"
	}
},{
	"component": "Icon",
	"props": {
		"icon": "view",
		"color": "red"
	}
},{
	"component": "Icon",
	"props": {
		"icon": "property",
		"color": "orange"
	}
},{
	"component": "Icon",
	"props": {
		"icon": "edit",
		"color": "yellow"
	}
},{
	"component": "Icon",
	"props": {
		"icon": "edit",
		"color": "grey",
		"size": 16
	}
}]