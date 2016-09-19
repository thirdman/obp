Column

*****title*****

Utility layout Column Component. use in conjunction with row. By default it will fill up all available space (ie 12/12 columns).*NOTE* until I figure out the bug in webpack/scss/react/jsx/modules, every width perentage will be of 12.


#### props
|Property				|	Type			|	Default		|	Description
:---------------------------|:----------|:--------------|:--------------------------------
columns					| `number`		| 12			| number of columns to take up (if inside a row)
of							| `number`		| 12			| total number of rows (eg. use 2/5 to take up 2 columns out of five (ie.40%))
isFlex					|	`bool`			|	true		|	usex flexbox. If false, will use floats (can cause unexpected layout issues, but better supported in browsers)
devMode					|	`bool`			|	false		|	shows up borders etc for development purposes
classNameProps	|	`array`			| []			|	*unused* array of classes to apply to the component 

#### state

#### classNameProps

#### TODO

*****description*****
<Row>
	<Column colums={2} of={5}>
	<span>test</span>
	<Column>
</Row>

*****example*****
[
{
	"component": "Column"
},
{
	"component": "Column",
	"props": {
		"columns": 9,
		"of": 12,
		"devMode": true,
		"children": "<span> fake child </span>"
	}
}
]