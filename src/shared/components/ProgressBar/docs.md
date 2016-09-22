ProgressBar

*****title*****

Simple animated bar for a loading type progress


#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
completed				|	`number`	|	-					|	percent completed, without the % sign
type						|	`string`	|	'standard'	|	one of ('standard', 'line'): determined height/style of bar.
color						|	`string`	|	'blue'		|	use the nomos color keywords
units						|	`string`	|	'%'				|	one of '%' or 'px'. Css unit to use, could also use px for an absolute sizing
hasPadding			|	`bool`		|	'false'		|	true adds 8px margin.
classNameProps	|	`array`		| ['normal'] |	array of classes to apply to the component (see below for available classes)



#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`		| default style (optional) - to be extended later.


#### TODO
- show the % while loading
- a loading message?
- add a 'loding' type.
- unify width and colour options from the ProgressStatus

*****description*****
<ProgressBar completed="68" />
<ProgressBar completed="88" type="line" color="darkGrey" hasPadding />

*****example*****
[
{
	"component": "ProgressBar",
	"props": {
		"completed": 68,
		"classNameProps": ["normal"]
		}
},
{
	"component": "ProgressBar",
	"props": {
		"completed": 88,
		"type": "line",
		"color": "red",
		"hasPadding": true
		}
}
]