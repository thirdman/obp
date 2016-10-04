InputDate

*****title*****

Basic date select component

#### usage

#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
value						|	`date`	|	new Date()	| This prop is parsed by Moment.js, so it is possible to use a date string or a moment object.
input						|	`bool`	|	true	| Whether to show an input field to edit the date manually.
open						|	`bool`	|	-	| If not set react-datetime will open the datepicker on input focus and close it on click outside.
onChange						|	`func`	|	-	| Callback trigger when the date changes
onFocus						|	`func`	|	-	| Callback trigger for when the user opens the datepicker.
onBlur						|	`func`	|	-	| Callback trigger for when the user clicks outside of the input, simulating a regular onBlur.
viewMode						|	`string`	|	'days'	| The default view to display when the picker is shown ('years', 'months', 'days', 'time').
inputProps				|	`object`	|	- | Defines additional attributes for the input element of the component. For example: placeholder
classNameProps	|	`array`		| ['normal']	|	array of classes to apply to the component (see below for available classes)


#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`				| default style (optional)

#### TODO

*****description*****
<InputDate classNameProps={['normal']} />

*****example*****
[
{
	"component": "InputDate",
	"props": {
		"classNameProps": ["blue"]
		}
}
]