(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{285:function(t,s,a){"use strict";a.r(s);var n=a(10),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"entity"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#entity"}},[t._v("#")]),t._v(" Entity")]),t._v(" "),s("p",[t._v("Entity is a class used to create entity payloads for Inorigo. Entity generates JSON objects that Inorigo is able to interpret, and that can be used together with the InorigoAPI and EntityFactory classes. The class uses chainable functions to allow for creating easily readable code.")]),t._v(" "),s("p",[t._v("To use Entity you begin by creating a new instance. If you are editing an existing object in inorigo you can provide its type and UUID to the constructor, and if you're creating a new entity then you can simply leave the arguments blank.")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" entity "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InorigoEnums")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("entityTypes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ASSOCIATION_DEFINITION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"00000000-0000-0000-0000-000000000000"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"definitions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#definitions"}},[t._v("#")]),t._v(" Definitions")]),t._v(" "),s("p",[t._v('Entity allows you to add and remove definitions from your entity. Note that that Entity API is additive. That means that omission (or in this case "removal") of a definition will not actually remove it from Inorigo. If you wish to remove a definition then you need to remove the actual relation entity.')]),t._v(" "),s("p",[t._v("The following functions are supported:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Function")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("setDefinition(definitionType, definitionUUID)")]),t._v(" "),s("td",[t._v("Clears any existing definitions on the entity object and sets the given definition.")])]),t._v(" "),s("tr",[s("td",[t._v("addDefinition(definitionType, definitionUUID)")]),t._v(" "),s("td",[t._v("Adds a definition to the entity.")])]),t._v(" "),s("tr",[s("td",[t._v("removeDefinition(definitionType, definitionUUID)")]),t._v(" "),s("td",[t._v("Removed a definition from the entity.")])])])]),t._v(" "),s("h2",{attrs:{id:"values"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#values"}},[t._v("#")]),t._v(" Values")]),t._v(" "),s("p",[t._v("You can add and remove values from your entity. Note that removing an attribute does not mean the same thing as removing it in Inorigo. To clear the value you can set it to null. To completely remove the attribute as such you will need to change the definition as such, which is currently not supported.")]),t._v(" "),s("p",[t._v("The following functions are supported:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Function")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("setValues(attributevalues)")]),t._v(" "),s("td",[t._v("Sets the attributes and values on the entity object, clearing any existing values previously set.")])]),t._v(" "),s("tr",[s("td",[t._v("addValue(attributeUUID, value)")]),t._v(" "),s("td",[t._v("Adds a single value to the entity object.")])]),t._v(" "),s("tr",[s("td",[t._v("removeValue(attributeUUID)")]),t._v(" "),s("td",[t._v("Removes a single value from the object")])]),t._v(" "),s("tr",[s("td",[t._v("clearAllAttributeValues()")]),t._v(" "),s("td",[t._v("Clears all previously set attributes from the object.")])])])]),t._v(" "),s("h2",{attrs:{id:"base-attributes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#base-attributes"}},[t._v("#")]),t._v(" Base Attributes")]),t._v(" "),s("p",[t._v("You can manually set the UUID and the type of the object you are creating / editing.")]),t._v(" "),s("p",[t._v("The following functions are supported:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Function")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("setUUID(uuid)")]),t._v(" "),s("td",[t._v("Sets the UUID of the entity.")])]),t._v(" "),s("tr",[s("td",[t._v("setType(type)")]),t._v(" "),s("td",[t._v("Sets the entity type.")])])])]),t._v(" "),s("h2",{attrs:{id:"relations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#relations"}},[t._v("#")]),t._v(" Relations")]),t._v(" "),s("p",[t._v("You can add superclasses to the entity. Or, in other words, you can classify your entity by other entities.")]),t._v(" "),s("p",[t._v("The following functions are supported:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Function")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("addSuperClass(type, uuid)")]),t._v(" "),s("td",[t._v("Adds a superclass to the entity.")])]),t._v(" "),s("tr",[s("td",[t._v("setSuperClasses(uuidArray)")]),t._v(" "),s("td",[t._v("Sets the superclasses to a provided value, clearing any existing definitions.")])])])]),t._v(" "),s("h2",{attrs:{id:"output"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#output"}},[t._v("#")]),t._v(" Output")]),t._v(" "),s("p",[t._v("After you have created your entity you can export the resulting JSON by using the print function. The print function will return a valid Inorigo JSON object that Inorigo is able to interpret.")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Function")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("print()")]),t._v(" "),s("td",[t._v("Export the finished JSON object.")])])])]),t._v(" "),s("h2",{attrs:{id:"examples"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),s("p",[t._v("A typical example may look something like this:")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" entityTypes "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InorigoEnums")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("entityTypes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" myEntity "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setType")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entityTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ASSOCIATION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setDefinition")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entityTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ASSOCIATION_DEFINITION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"00000000-0000-0000-0000-000000000000"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setValues")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"11111111-1111-1111-1111-111111111111"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Some value"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"22222222-2222-2222-2222-222222222222"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("42")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" api "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InorigoAPI")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://www.myinorigo.com/"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\napi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createEntity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("myEntity"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Success!"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);