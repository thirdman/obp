Avatar

*****title*****

Image version of an icon.


#### usage

pass through the url, and a size.
- small: 24px;
- medium: 32px;
- large: 100px;
- fill: 100% of container;

NOTE: if a title is provided, the quickview assumes the component is displayed within a div that has 'postion:relative' so will display at 50% of it's width.

#### props
|Property				|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
type						|	`string`	|	'user'	|	one of 'user' (round), 'organisation'/'org' (squareish)
size						|	`string`	|	-	|	one of 'small' (24px), 'medium' (32px), 'large' (100px)
imageUrl				|	`string`	|	see below	|	url of image
title						|	`string`	|	-	|	title to appear in the quickview (on hover, and alt)
defaultIconColor	|	`string`	|	-	|	option to pass through a custom icon color (nomos color codes)
classNameProps	|	`array`	| ['black']	|	array of classes to apply to the component (see below for available classes)


**Default image url:** http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg

#### state

#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`normal`					| default styling
`fill`						| overrides the size and fills the wrapping container


#### TODO
- possibly allow an iotional '.iconWrap' property to automatically size the quickview

*****description*****
<Avatar type="user" size="small" imageUrl="https://pbs.twimg.com/profile_images/668279339838935040/8sUE9d4C.jpg" />
<Avatar type="user" size="medium" title="Tyrion Lannister" imageUrl="https://pbs.twimg.com/profile_images/668279339838935040/8sUE9d4C.jpg" />
<Avatar type="user" size="large"  imageUrl="https://pbs.twimg.com/profile_images/668279339838935040/8sUE9d4C.jpg" />
<Avatar type="org" imageUrl="https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAARsAAAAJDNlMWJmOWMwLTYyZWItNDlhMS1hNTA2LWZmMWE1NGI4MTEyZQ.png" size="small" />
<Avatar type="org" imageUrl="https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAARsAAAAJDNlMWJmOWMwLTYyZWItNDlhMS1hNTA2LWZmMWE1NGI4MTEyZQ.png" size="medium" />
<Avatar type="org" imageUrl="https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAARsAAAAJDNlMWJmOWMwLTYyZWItNDlhMS1hNTA2LWZmMWE1NGI4MTEyZQ.png" size="large" title="ABC Legal" />
					
*****example*****
[{
	"component": "Avatar",
	"props": {
		"type": "user",
		"size": "small"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "user",
		"size": "medium",
		"title": "Tyrion Lannister"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "user",
		"size": "large",
		"title": "Tyrion Lannister"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "user",
		"size": "small",
		"title": "Tyrion Lannister",
		"imageUrl": "https://pbs.twimg.com/profile_images/668279339838935040/8sUE9d4C.jpg"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "user",
		"size": "medium",
		"title": "Tyrion Lannister",
		"imageUrl": "https://pbs.twimg.com/profile_images/668279339838935040/8sUE9d4C.jpg"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "user",
		"size": "large",
		"title": "Tyrion Lannister",
		"imageUrl": "https://pbs.twimg.com/profile_images/668279339838935040/8sUE9d4C.jpg"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "org",
		"size": "small",
		"title": "ABC Legal"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "org",
		"size": "medium",
		"title": "ABC Legal"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "org",
		"size": "large",
		"title": "ABC Legal"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "org",
		"size": "small",
		"title": "ABC Legal",
		"imageUrl": "https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAARsAAAAJDNlMWJmOWMwLTYyZWItNDlhMS1hNTA2LWZmMWE1NGI4MTEyZQ.png"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "org",
		"size": "medium",
		"title": "ABC Legal",
		"imageUrl": "https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAARsAAAAJDNlMWJmOWMwLTYyZWItNDlhMS1hNTA2LWZmMWE1NGI4MTEyZQ.png"
	}
},{
	"component": "Avatar",
	"props": {
		"type": "org",
		"size": "large",
		"title": "ABC Legal",
		"imageUrl": "https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAARsAAAAJDNlMWJmOWMwLTYyZWItNDlhMS1hNTA2LWZmMWE1NGI4MTEyZQ.png"
	}
}]