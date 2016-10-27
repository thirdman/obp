ObjectInfo

*****title*****

**INCOMPLETE** The top information section of an object. this is just a test version at this point.


#### props
|Property								|	Type			|	Default		|	Description
:-----------------------|:----------|:----------|:--------------------------------
title										|	`string`	|	-					|	title text
id											|	`string`	|	-					|	object id
type										|	`string`	|	-					|	object type (subtype), or 'custom'
subType									|	`string`	|	-					|	secondary level type to be displayed
imageUrl								|	`string`	|	-					|	url to use if type = 'custom'
mode										|	`string`	|	-					|	object mode (active/inactive)
display									|	`string`	|	'large'		|	sets the display type of the output. (oneOf: 'large', 'small', ''flat)
objectButtons						|	`array`		| []				|	array of buttons to display (see example below)
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
`small`			| smaller size for manipulation (= display: 'small')
`flat`			| removes the box-shadow (equiv. to: display: 'flat')
`hasBorder`	| adds a single line border
`isDisabled`| makes it grey.


#### TODO
- INCOMPLETE
- @khanh: what is the best way to handle things like id's, keys and refs for buttons.
- build out for all use cases
- handel icons
- handle subtitle information

*****description*****

<ObjectInfo classNameProps={['normal']} title="1 Bath St" />
<ObjectInfo type="flat" title="1 Bath St" additionalContent="Additonal Content here" />

*****example*****
[
{
	"component": "ObjectInfo",
	"props": {
		"type" : "property",
		"title": "1 Bath St"
		}
},{
	"component": "ObjectInfo",
	"props": {
		"title": "The bromley house agreement",
		"type" : "agreement",
		"display": "small"
		}
},{
	"component": "ObjectInfo",
	"props": {
		"title": "Bromley Co",
		"type" : "entity",
		"display": "flat",
		"additionalContent": "Additional Content"
		}
}
]