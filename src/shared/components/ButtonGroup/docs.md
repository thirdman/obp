ButtonGroup

*****title*****
A group of buttons. Use when there are a few distinct options 

#### props
|Property				|	Type					|	Default		|	Description
:---------------|:--------------|:----------|:--------------------------------
options					|	`array`				|	false			|	returns true for select type, when the the dropdown content exixts (and changes direction of the little arrow)
selected				|	`string`			|	-					|	highlights the selected choice
onClickProps		|	`func`				|	-					|	a function to call when the button is clicked
classNameProps	|	`array`				| ['normal']|	array of classes to apply to the component (see below for available classes)
hasData					|	`bool`				|	false			|	forces the component to use optionData
optionData			|	`array`				|	-					|	array of data to create hero content

		optionData: [
	  	{
				name: 'match',
				title: 'Match Entities',
				subtitle: '(between Xero and Nomos One)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'Users who have been using both Xero and Nomos for a while and have existing entities in each.',
				classes: ['hero']
			}, {
				name: 'import',
				title: 'Import Xero Contacts',
				subtitle: '(from Xero to Nomos one)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'Users are new to Nomos One and have been using Xero for a while',
				classes: ['hero']
			}, {
				name: 'export',
				title: 'Export Nomos One Entities',
				subtitle: '(from Nomos One to Xero)',
				showButton: 'true',
				descriptionTitle: 'Best For',
				description: 'users are new to Nomos One and have been using Xero for a while',
				classes: ['hero']
			}
		]
			
#### state
#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`	| buttons small side by side
`large`	| makes larger buttons with icons above
`hero`	| makes the hero options work. Should be added automatically, but possibly you'll need this

#### styles
#### TODO
- INCOMPLETE
- convert into new style of icons and buttons
- make props for options arrays
- make hero version more robust

*****description*****
<ButtonGroup />
<ButtonGroup classNameProps={'hero'} hasData />
*****example*****
[{
	"component":"ButtonGroup",
	"props": {
		"classNameProps": ["normal"],
		"options": ["one", "two", "three"]
	}
},{
	"component":"ButtonGroup",
	"props": {
		"classNameProps": ["large"],
		"options": ["one", "two", "three"]
	}
},{
	"component":"ButtonGroup",
	"props": {
		"classNameProps": ["hero"],
		"hasData" : true
	}
}]