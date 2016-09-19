Info

*****title*****

Outputs some text. the most basic thing possible


#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
content					|	`string`	|	-	| text to output
classNameProps	|	`array`		| ['normal']	|	array of classes to apply to the component

#### state

#### classNameProps
|classNameProps		|	Description
:-----------------|:--------------------------------
`normal`					| default styling 
`highlighted`			| background highlight


#### TODO


*****description*****
<info classNameProps={['normal']} content="Gareth is cool"/>

*****example*****
[
{
	"component": "Info",
	"props": {
		"value": "Gareth is cool",
		"classNameProps": ["normal"]
	}
},
{
	"component": "Info",
	"props": {
		"value": "Gareth is very cool",
		"classNameProps": ["highlighted"]
	}
}
]