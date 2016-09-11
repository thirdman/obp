InputRadio

*****title*****

Radio button input


#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
value						|	`string`	|	-	|	text beside the radio 
id							|	`string`	|	-	|	id of the radio button - so it will activate when clicking on the text
isSelected			|	`bool`		|	false	|	if it is selected
classNameProps	|	`array`		| ['normal']	|	array of classes to apply to the component (see below for available classes)

#### state
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
isSelected			|	`bool`		|	false	|	from the props

#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`		| default styling (inline)
`block`			| makes it display in rows

#### TODO
- make a container so you can group them
- @khanh: we need to handle the id's better. A random generator?

*****description*****
<InputRadio classNameProps={['normal']} value="This is a value"/>
<InputRadio classNameProps={['block']} value="This is a selected value" isSelected/>

*****example*****
[
{
	"component": "InputRadio",
	"props": {
		"value": "This is a value",
		"classNameProps": ["normal"]
	}
},
{
	"component": "InputRadio",
	"props": {
		"value": "This is a selected value",
		"isSelected": true,
		"classNameProps": ["block"]
	}
}
]