Row

*****title*****

Utility layout Component. use in conjunction with column. By default it will fill up all available space (ie 1/1 rows), but you could set up a vertical grid inside a column say, 1/4 (=25%)


#### props
|Property				|	Type			|	Default		|	Description
:---------------------------|:----------|:--------------|:--------------------------------
rows						| `number`		| -				| number of rows to take up (if in a column wrap, see below)
maxRows					| `number`		| -				| total number of rows (eg. use 2/5 to take up 2 rows out of five)
isFlex					|	`bool`			|	true		|	usex flexbox. If false, will use floats (can cause unexpected layout issues, but better supported in browsers)
devMode					|	`bool`			|	false		|	shows up borders etc for development purposes
classNameProps	|	`array`			| []			|	*unused* array of classes to apply to the component 

#### state

#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------

#### TODO

*****description*****
<Row>
<span>test</span>
</Row>

*****example*****
[
{
	"component": "Row"
},
{
	"component": "Row",
	"props": {
		"rows": 2,
		"maxRows": 3,
		"devMode": true,
		"children": "<span> fake child </span>"
	}
}
]