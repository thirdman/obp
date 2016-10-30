Accordion

*****title*****

makes multiple sections expandable and progressable.  
Lots of code taken from here: https://github.com/rorykermack/redux-accordion  
  
  NOTE: example will not work until we can do child elements in docs



#### props
|Property								|	Type					|	Default				|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
openByDefault						|	`bool` 				| false 				| will it be open by default
sinlgeOpen							|	`bool` 				| false 				| will only allow one open at a time.
uniqueId								|	`string` 			| - 						| pass in a specific id
className								|	`string` 			| - 						| a classname for the accordion

#### AccordionSection Props
|Property								|	Type					|	Default				|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
active									|	`bool` 				| false 				| is this section active
title										|	`string` 			| -			 				| title for the seciton
unq											|	`string` 			| - 						| 
className								|	`string` 			| - 						| a classname for the accordion
toggle									|	`func` 				| -			 				| function to call when toggled

				
#### TODO
- convert className to standard classes format

*****description*****
<Accordion
  {...this.props}
  uniqId={'testAccordion'}>

  <AccordionSection
   title="Section 1">
   {*/ Content Goes Here /*}
  </AccordionSection>

  <AccordionSection
   title="Section 2">
   {*/ Content Goes Here /*}
  </AccordionSection>

</Accordion>



*****example*****
[
]