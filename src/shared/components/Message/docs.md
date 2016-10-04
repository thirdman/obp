Message

*****title*****

A message box to display errors and suggestions

####usage

- 'error'/'warning'
- 'question'
- 'info'/'normal'
- 'success'


#### props
|Property					|	Type			|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
content						|	`string`	|	-	|	text inside the message
type							|	`string`	|	-	|	type of message. one of: error/warning(red), question(orange), info (grey), success (green)
hasIcon						|	`bool`		|	true	|	has an icon
icon							|	`string`	|	-	|	name of icon if hasIcon
hasCloseButton		|	`bool`		|	false	|	if it has a close icon
children					|	`oneOfType` | - | this component can wrap around child content
classNameProps		|	`array`		| ['normal']	|	array of classes to apply to the component (see below for available classes)


#### classNameProps
|classNameProps		|	Description
:-----------------------|:--------------------------------
`large`		| makes a big icon and size


#### TODO


*****description*****
<Message classNameProps={['normal', 'space']} content="this is a default information message" type="normal" />
<Message classNameProps={['normal', 'error']} content="this is an error message" type="error" />
<Message classNameProps={['normal', 'question']} content="this is a question, and inlcludes optional close buttong" hasCloseButton type="question" />
<Message classNameProps={['normal', 'success']} content="this is a message" type="success" />
<Message classNameProps={['normal', 'warning', 'large']} content="this is a large message, using the alternate class of warning. You can write as much as you like and it should be able to handle the jandle." type="warning" />
*****example*****
[
{
	"component": "Message",
	"props": {
		"type": "normal",
		"content": "this is a default information message",
		"classNameProps": ["normal"]
		}
},{
	"component": "Message",
	"props": {
		"type": "error",
		"content": "this is an error message"
		}
},{
	"component": "Message",
	"props": {
		"type": "question",
		"content": "this is a question message"
		}
},{
	"component": "Message",
	"props": {
		"type": "success",
		"content": "this is a success message",
		"hasCloseButton": true
		}
},{
	"component": "Message",
	"props": {
		"type": "warning",
		"content": "this is a large message, using the alternate class of warning. You can write as much as you like and it should be able to handle the jandle.",
		"classNameProps": ["large"]
	}
}

]