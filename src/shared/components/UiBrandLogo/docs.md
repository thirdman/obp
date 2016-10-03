UiBrandLogo

*****title*****
the logo at top left.


####props
|Prop		|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
isSmall		|	`bool`	|	false		|	is true when nav is collapsed
isLoading	|	`bool`	|	true	|	returns true while the logo is loading
#### classNameProps
No relevant classes
#### styles
|ClassName		|	Description
:-----------------------|:--------------------------------
`.saving`	| shows the saving indicator and rotates the icon.
#### TODO
 - make the saving a props, not a class

*****description*****

<UiBrandLogo />
*****example*****
[{
	"component":"UiBrandLogo",
	"props": {
		"isSmall": false
	}
}]