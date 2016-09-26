ProgressBar

*****title*****

Simple animated bar for a loading type progress


#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
title						|	`string`	|	-					|	Title for widget
type						|	`string`	|	'standard'	|	one of ('standard', 'line', progress): determined height/style of bar.
color						|	`string`	|	'blue'		|	use the nomos color keywords
units						|	`string`	|	'%'				|	one of '%' or 'px'. Css unit to use, could also use px for an absolute sizing
hasMarkers			|	`bool`		|	'false'		|	shows markers on the timeline.
hasTitles				|	`bool`		|	'false'		|	shows titles of the markers
markerData			|	`array`		|	[]				|	array of markers to display
classNameProps	|	`array`		| ['normal'] |	array of classes to apply to the component (see below for available classes)



#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`		| default style (optional) - to be extended later.


#### TODO


*****description*****
<WidgetProgress completed="68" />


*****example*****
[
{
	"component": "ProgressBar",
	"props": {
		"completed": 68,
		"classNameProps": ["normal"]
		}
}
]