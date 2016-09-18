ObjectInfo

*****title*****

**INCOMPLETE** The top information section of an object. this is just a test version at this point.


#### props
|Property								|	Type			|	Default		|	Description
:-----------------------|:----------|:----------|:--------------------------------
title										|	`string`	|	-					|	title text
classNameProps					|	`array`		| []				|	array of buttons to display (see example below)
classNameProps					|	`array`		| ['normal']|	array of classes to apply to the component (see below for available classes)


		const	objectButtons = [
			{	'type': 'wrapper',
				'text': 'View',
				'helpText': 'View this Agreement',
				'actionId': '1235',
				'icon': {
					'icon': 'view',
					'color': 'lightGrey',
					'classNameProps': ['normal']
					},
				'onClickProps': doGoTo,
				'classNameProps': ['normal']
			},
			{	'type': 'wrapper',
				'text': 'Edit',
				'helpText': 'Edit this Agreement',
				'actionId': '4567',
				'icon': {
					'icon': 'edit',
					'color': 'lightGrey',
					'classNameProps': ['normal']
					},
				'onClickProps': doGoTo,
				'classNameProps': ['normal']
			}
		];



#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`		| default style (optional)


#### TODO
- INCOMPLETE
- @khanh: what is the best way to handle things like id's, keys and refs for buttons.
- build out for all use cases
- handel icons
- handle subtitle information

*****description*****

<ObjectInfo classNameProps={['normal']} title="1 Bath St" />

*****example*****
[
{
	"component": "ObjectInfo",
	"props": {
		"title": "1 Bath St"
		}
}
]