InputSelect

*****title*****

Component for dor a drop down action menu  
Usage: Pass into it an array of items to be displayed in the menu. Use the onClickProps to handle what happens when you click on it. Array can include title, calue, and helpContent - but will still work if you just use an array of titles.



#### props
|Property						|	Type					|	Default			|	Description
:-------------------|:--------------|:------------|:--------------------------------
content							|	`string`			|	-						|	text to appear inside the dropdown trigger button
postion							|	`string`			|	-						|	'right' aligns it to the right
color								|	`string`			|	oneOf				|	one of (grey, white)
options							|	`array`				|	-						|	array of the option buttons to appear in the list.
isOpen							|	`array`				|	-						|	Controls whether the dropdown is open or not
classNameProps			|	`array`				| ['normal']	|	array of classes to apply to the component (see below for available classes)
btnClassNameProps		|	`array`				| ['normal']	|	array of classes to aaply to the BUTTON component
onClickProps				|	`array`				| ['func']		|	function to call when clicked

#### state
|Property						|	Type			|	Default				|	Description
:-------------------|:----------|:--------------|:--------------------------------
`isOpen`			 			| `bool`		| false 				| determines whether the dropdown menu is opsn

#### classNameProps
|classNameProps		|	Description
:-----------------|:--------------------------------
`normal`					| default styling
`wide`						| makes it stretch full width of the container element

#### btnClassNameProps
|classNameProps		|	Description
:-----------------|:--------------------------------
`white`						| white version of the trigger button
`wide`						| makes it stretch full width of the container element

#### styles

#### TODO
- handle closing it automatically when ANOTHER select is triggered, OR when you click outside it.

*****description*****
<InputSelect
	content={'Select ...'}
	classNameProps={['action']}
	options={['one', 'two', 'three']}
	btnClassNameProps={['select', 'btn']}
	/>
<InputSelect
	content={'Options'}
	classNameProps={['action', 'white']}
	options={['one', 'two', 'three']}
	btnClassNameProps={['select', 'btn', 'white']}
	/>
*****example*****
[{
	"component": "InputSelect",
	"props": {
		"content" : "Select ...",
		"classNameProps": ["action"],
		"options": [
			{
				"title": "The one",
				"value": "one",
				"helpContent": "Selects the value of one"
			}, 
			{
				"title": "Dos",
				"value": "two",
				"helpContent": "In Spanish the word for two is 'dos'"
			}, 
			{
				"title": "Toru",
				"value": "three",
				"helpContent": "Toru is three"
			}
		],
		"btnClassNameProps": ["select"]
	}
},{
	"component": "HorizontalRule"
},{
	"component": "InputSelect",
	"props": {
		"content" : "White...",
		"color" : "white",
		"classNameProps": ["action"],
		"options": ["one", "two", "three"],
		"btnClassNameProps": ["select"]
	}
},{
	"component": "HorizontalRule"
},{
	"component": "InputSelect",
	"props": {
		"content" : "Select ...",
		"classNameProps": ["wide"],
		"options": ["one", "two", "three"],
		"btnClassNameProps": ["select", "white", "wide"]
	}
}]