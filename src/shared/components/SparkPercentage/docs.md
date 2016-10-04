SparkPercentage

*****title*****

small marker to go next to a percentage

#### usage

#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
percentage			|	`number`	|	-	|	how much of the pue to fill
classNameProps	|	`array`		| ['normal']	|	array of classes to apply to the component (see below for available classes)


#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`				| default style (optional)
`blue`					| makes the percentage blue

#### TODO

*****description*****
<SparkPercentage classNameProps={['normal']} percentage={90} />
<SparkPercentage classNameProps={['normal']} percentage={50} />
<SparkPercentage classNameProps={['blue']} percentage={20} />

*****example*****
[
{
	"component": "SparkPercentage",
	"props": {
		"title": "Example Stat",
		"percentage": 90,
		"classNameProps": ["normal"]
		}
},{
	"component": "SparkPercentage",
	"props": {
		"percentage": 50,
		"classNameProps": ["normal"]
		}
},{
	"component": "SparkPercentage",
	"props": {
		"percentage": 20,
		"classNameProps": ["blue"]
		}
}
]