Statistic

*****title*****

Basic display unit of Statistic

#### usage
It will fill the width containing element.


#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
content					|	`string`	|	-					|	statistic amount to display
title						|	`string`	|	-					|	title above the text
units						|	`string`	|	-					|	text to display after the statistic
countTime				|	`number`	|	700				|	time to animate the stat.
isAnimated			|	`bool`		|	false			|	turns on the animation
ishorizontal		|	`bool`		|	false			|	puts the units along side
hasDivider			|	`bool`		|	false			|	puts a divider above it
classNameProps	|	`array`		| ['normal']|	array of classes to apply to the component (see below for available classes)


#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`				| default style (optional)
`white`					| makes it all white (for dark background)
`inline`				| will display side by side 
`isHorizontal`	| units will display next to the stat 
`hasDivider`		| will show a divider bar above it


#### TODO
- convert classes into props for ease of use
- allow it to automaticlaly include a 'column' component for ease of use when you are dislaying multiple

*****description*****
<Statistic classNameProps={['normal']} content="34" units="Percent" title="Example Stat" />
<Statistic classNameProps={['normal', 'isHorizontal', 'hasDivider']} content="34.33" isAnimated units="Percent" title="Animated Stat" />
<Statistic classNameProps={['normal', 'hasDivider']} content="$12345.67" units="per Building" isAnimated title="Example Title" />
<Statistic classNameProps={['normal', 'hasDivider']} content="$8734" isAnimated title="Average Income Per Tenancy" />
<div style={{backgroundColor: `#aaa`, display: `inline-block`, padding: `8px`}}><Statistic classNameProps={['white', 'hasDivider']} isAnimated content="$8734" title="Average Income Per Tenancy" /></div>

*****example*****
[
{
	"component": "Statistic",
	"props": {
		"title": "Example Stat",
		"content": "34",
		"units": "%",
		"classNameProps": ["normal"]
		}
},{
	"component": "Statistic",
	"props": {
		"title": "Animated Stat",
		"content": "34.55",
		"units": "Percent",
		"isAnimated": true,
		"classNameProps": ["normal", "isHorizontal", "hasDivider"]
		}
},{
	"component": "Statistic",
	"props": {
		"title": "Example with currency",
		"content": "$12345.67",
		"units": "per Building",
		"classNameProps": ["normal", "hasDivider"]
		}
},{
	"component": "Statistic",
	"props": {
		"title": "Average Income Per Tenancy",
		"content": "$8234",
		"units": "per Building",
		"isAnimated": true,
		"classNameProps": ["normal", "hasDivider"]
		}
},{
	"component": "Statistic",
	"props": {
		"title": "white Income Per Tenancy",
		"content": "$8234",
		"units": "per Building",
		"isAnimated": true,
		"classNameProps": ["white", "hasDivider"]
		}
}
]