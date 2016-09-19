Breadcrumbs

*****title*****

provides a breadcrumb.



#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
divider					|	`string` 	| - | this component is designed to wrap around child content
sections				|	`array` 	| see below | array of sections to display in the breadcrumb
showHome				|	`bool` 		| true | show the home icon of the org
icon						|	`string` 	| - | For use with the sections prop. Render as an `Icon` component with `divider` class instead of a `div` in Breadcrumb.Divider.
				
		sections: [
		  { text: 'Home', link: 'home' },
		  { text: 'Agreements', link: 'agreements' },
		  { text: 'View', active: true },
		]
			text: name to appera
			link: url to link to. eg 'agreements', or 'property/2145'
			active: true ( if it is the current page)
			icon: name of icon for this section (will replace the divider)

#### TODO


*****description*****
<Breadcrumb divider='/' sections={sections} />

*****example*****
[
{
	"component": "Breadcrumbs",
	"props": {
			"divider": "\/",
			"classNameProps": ["normal"]
	}
},{
	"component": "Breadcrumbs",
	"props": {
			"divider": "|",
			"icon": "chevron-right",
			"classNameProps": ["red"],
			"sections":	[{"text":"Entities","icon": "entity", "link":"entities"},{"text":"Individual", "icon": "individual", "link":"1234"},{"text":"View","active":true}]
		}
}
]