Placeholder

*****title*****

Placeholder is used while content is loading.


#### props
|Property								|	Type			|	Default		|	Description
:-----------------------|:----------|:----------|:--------------------------------
type										|	`string`	|	'text'		|	one of ('paragraph', 'media', 'text', 'circle, 'rectangle')
margin									|	`number`	|	8					|	margin to add
hasMargins							|	`bool`		|	`true`		|	
mask										|	`string`	|	`white`		| CSS colour or hex to define the mask colour
isStaggered							|	`bool`		|	true			| (text) whether to generate a pargraph like look to the line ends


#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`		| default style (optional)


#### TODO

*****description*****

<Placeholder classNameProps={['normal']} type="text" />

*****example*****
[
	{
		"component": "Placeholder"
	}, {
		"component": "Placeholder",
		"props": {
			"type" : "paragraph",
			"mask" : "#f9f9f9"
			}
	}, {
		"component": "Placeholder",
		"props": {
			"type" : "paragraph",
			"mask" : "white"
			}
	}, {
		"component": "Placeholder",
		"props": {
			"type" : "media",
			"mask" : "white"
			}
	}, {
		"component": "Placeholder",
		"props": {
			"type" : "media",
			"mask" : "white"
			}
	}, {
		"component": "Placeholder",
		"props": {
			"type" : "square",
			"mask" : "white"
			}
	}, {
		"component": "Placeholder",
		"props": {
			"type" : "circle",
			"mask" : "white"
			}
	}
	]