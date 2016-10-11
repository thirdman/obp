InputTextarea

*****title*****

Input elment for standard (resizable) textarea input


#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
label						|	`string`	|	-	|	label above the Input
value						|	`string`	|	-	|	text inside the textarea. 
type						|	`string`	|	-	|	Modifier one of('small, medium, large, hasError')
placeholder			|	`string`	|	-	|	helper text that displays before there is any value 
rows						|	`number`	|	3	|	number of blank rows to initially display
maxRows					|	`number`	|	-	|	(optional) maximum number of rows to rezize before scrolling
hasValidation		|	`bool`		|	-	|	if it has validation
isRequired			|	`bool`		|	false	|	if it is required
hasError				|	`bool`		|	false	|	if there is an error
classNameProps	|	`array`		| ['normal']	|	array of classes to apply to the component (see below for available classes)
onResize				|	`func`		| -	|	function to call when it resizes itself

#### state

#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`		| default styling
`clean`		| makes the the 'Material' style clean version
`small`		| width: 100px;
`medium`		| (unused) placeholder if we want to set a medium width
`large`		| (unused) placeholder if we want to set a large width
`hasError`		| applied when the srror props is true
`isRequired`		| applied when it isRequired (adds text to the title)
`contentItem`		| moves it up 8px, for when it exists inside a contentItem component (POTENTIAL)

#### TODO
- fix up the balnk clickable area.


*****description*****
<InputTextarea classNameProps={['normal', 'space']} placeholder="enter your text here" >this is an example of child passed through with nor rows set</InputTextarea>
<InputTextarea classNameProps={['normal', 'space']} rows={5} isRequired placeholder="enter your text here, this example has 5 rows set, and required" />

*****example*****
[
{
	"component": "InputTextarea",
	"props": {
		"textValue": "this is an example of child passed through with no rows set",
		"placeholder": "enter your text here",
		"classNameProps": ["normal", "space"]
	}
},
{
	"component": "InputTextarea",
	"props": {
		"isRequired": true,
		"rows": 5,
		"placeholder": "enter your text here, this example has 5 rows set, and required",
		"classNameProps": ["normal", "space"]
	}
}
]