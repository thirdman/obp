Section

*****title*****

Utility component for display purposes. 


#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
type						|	`oneof`		|	'section'	|	(required) the type of content (from 'item', 'section', view', 'container', 'wizard')
title						|	`string`	|	''				|	(optional) if exists, will display an h3 title for the section
subtitle				|	`string`	|	''				|	(optional) if exists, will display a subtitle for the content
description			|	`string`	|	''				|	(optional) if exists, will display a div with a paragraph
loadingMessage	|	`string`	|	-					|	text to appear while loading. If has content, then loading message will appear.
isLoading				|	`bool`		|	false			|	shows the loading icon
isError					|	`bool`		|	false			|	error styling. Use loadingMessage to display text
hasDivider			|	`bool`		|	false			|	show a dividing line abov this component
hasBackground		|	`bool`		|	false			|	show a grey background
hasBorder				|	`bool`		|	false			|	show a border
hasPadding			|	`bool`		|	false			|	adds a padding
templateMode		|	`bool`		|	false			|	shows dotted borders etc when setting up
styleProps			|	`object` 	| - 				| Object of styles to use
classNameProps	|	`array`		| ['normal']|	array of classes to apply to the component (see below for available classes)
children				|	`oneOfType` | - 			| (required) this component is designed to wrap around child content



#### state
#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`		| default styling (= 12 col, or 100% wide)
`space`			| adds a 24px gap above it
`right`			| aligns content right
`oneCol`		| makes it 1/12 of the parent width
`twoCol`		| makes it 2/12 of the parent width
`threeCol`	| makes it 3/12 of the parent width
`fourCol`		| makes it 4/12 of the parent width
`fiveCol`		| makes it 5/12 of the parent width
`sixCol`		| makes it 6/12 of the parent width
`sevenCol`	| makes it 7/12 of the parent width
`eightCol`	| makes it 8/12 of the parent width
`nineCol`		| makes it 9/12 of the parent width
`tenCol`		| makes it 10/12 of the parent width
`elevenCol`	| makes it 11/12 of the parent width
`twelveCol`	| makes it 12/12 of the parent width



#### styles

#### TODO
- **INCOMPLETE DOCS** the examples won't appear until it's possible to do children.
- refactor 'oneCol' etc into props
- NEEDS to include types other than section

*****description*****
<section classNameProps={['normal']}><div>test content</div></Section>
<section type="section"><div>test content</div></Section>
*****example*****
[{
	"component": "Section",
	"props": {
		"title": "two test tickles"
	}
},{
	"component": "Section",
	"props": {
		"classNameProps": ["isLoading"],
		"type":"section",
		"isloading": true,
		"description": "Porta a magna mattis nascetur consequat velit urna eget parturient id per sit neque vel scelerisque luctus vestibulum ultrices volutpat. A nunc at dis penatibus conubia id vestibulum consectetur orci taciti a a ."
	}
},{
	"component": "Section",
	"props": {
		"type":"section",
		"isError": true,
		"loadingMessage": "This is the loading message",
		"description": "Porta a magna mattis nascetur consequat velit urna eget parturient id per sit neque vel scelerisque luctus vestibulum ultrices volutpat. A nunc at dis penatibus conubia id vestibulum consectetur orci taciti a a ."
	}
},{
	"component": "Section",
	"props": {
		"type":"section",
		"title": "This is a title",
		"description": "Porta a magna mattis nascetur consequat velit urna eget parturient id per sit neque vel scelerisque luctus vestibulum ultrices volutpat. A nunc at dis penatibus conubia id vestibulum consectetur orci taciti a a ."
	}
},{
	"component": "Section",
	"props": {
		"classNameProps": ["normal", "space"],
		"type":"view",
		"title": "1. This is a title for a view",
		"subtitle": "An example of an optional subtitle",
		"description": "Sscelerisque semper inceptos conubia tristique nisi morbi vestibulum himenaeos. Ullamcorper scelerisque natoque fermentum tellus risus a nostra dui mauris condimentum consectetur gravida suscipit commodo orci dapibus risus suscipit parturient. Imperdiet ridiculus vestibulum senectus a parturient adipiscing per parturient ad ante a magna dictumst molestie a tristique ullamcorper nascetur egestas accumsan hac parturient lectus at a a habitasse. Feugiat a a nisl praesent mattis odio scelerisque cras primis scelerisque a adipiscing habitant mus senectus ipsum morbi congue consectetur ut volutpat nostra."
	}
},{
	"component": "Section",
	"props": {
		"type":"section",
		"styleProps": {"border": "1px solid red"},
		"title": "A section with styleProps",
		"description": "Sscelerisque semper inceptos conubia tristique nisi morbi vestibulum himenaeos. Ullamcorper scelerisque natoque fermentum tellus risus a nostra dui mauris condimentum consectetur gravida suscipit commodo orci dapibus risus suscipit parturient. Imperdiet ridiculus vestibulum senectus a parturient adipiscing per parturient ad ante a magna dictumst molestie a tristique ullamcorper nascetur egestas accumsan hac parturient lectus at a a habitasse. Feugiat a a nisl praesent mattis odio scelerisque cras primis scelerisque a adipiscing habitant mus senectus ipsum morbi congue consectetur ut volutpat nostra.",
		"classNameProps": ["normal", "space"]
	}
}]