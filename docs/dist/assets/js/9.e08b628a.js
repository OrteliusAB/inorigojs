(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{361:function(t,n,s){"use strict";s.r(n);var a=s(25),e=Object(a.a)({},(function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"entity-relation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#entity-relation"}},[t._v("#")]),t._v(" Entity Relation")]),t._v(" "),s("p",[t._v("Entity Relation is a class built specifically for generating Inorigo relation objects. Entity relations can be created, updated and deleted using the entity API, similar to any other entity object.")]),t._v(" "),s("h2",{attrs:{id:"creating-relations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#creating-relations"}},[t._v("#")]),t._v(" Creating relations")]),t._v(" "),s("p",[t._v("When creating a relation you need to specify the type of relation (defined by what you are trying to connect to what, and in what way), as well as the type of connection the relation should be. Different types of connection will have a different effect on things like inheritance, but can also help in separating information in different distinct ways.")]),t._v(" "),s("p",[t._v("The following functions are supported:")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("Function")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("setUUID(uuid)")]),t._v(" "),s("td",[t._v("Sets the UUID of the relation (default value is null).")])]),t._v(" "),s("tr",[s("td",[t._v("setType(type)")]),t._v(" "),s("td",[t._v("sets the type (or rather category) of the relation (default value is ASDEF_TO_ASDEF)")])]),t._v(" "),s("tr",[s("td",[t._v("setLeftDefinitionType(leftDefinitionType)")]),t._v(" "),s("td",[t._v("Sets the definition type of the left relation (default value is AsDefinition)")])]),t._v(" "),s("tr",[s("td",[t._v("setRightDefinitionType(rightDefinitionType)")]),t._v(" "),s("td",[t._v("Sets the definition type of the right relation (default value is AsDefinition)")])]),t._v(" "),s("tr",[s("td",[t._v("setRelation(relationSpecifierID, leftID, rightID)")]),t._v(" "),s("td",[t._v("defines the relation on the relation entity.")])]),t._v(" "),s("tr",[s("td",[t._v("print()")]),t._v(" "),s("td",[t._v("Exports the finished JSON object.")])])])]),t._v(" "),s("h2",{attrs:{id:"implementing-relations"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#implementing-relations"}},[t._v("#")]),t._v(" Implementing relations")]),t._v(" "),s("p",[t._v("Consider the following example to get an idea of how to create a relation.")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" inorigoEnums "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InorigoEnums")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" entityTypes "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" inorigoEnums"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("entityTypes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" relationCategories "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" inorigoEnums"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("relationCategories")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" relationTypes "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" inorigoEnums"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("relationTypes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" entityOneUUID "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"00000000-0000-0000-0000-000000000000"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" entityTwoUUID "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"11111111-1111-1111-1111-111111111111"')]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" entityOne "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entityTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ASSOCIATION_DEFINITION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entityOneUUID"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setDefinition")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entityTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ASSOCIATION_DEFINITION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22222222-2222-2222-2222-222222222222"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setValues")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Definition 1"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" entityTwo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entityTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ASSOCIATION_DEFINITION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entityTwoUUID"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setDefinition")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("entityTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ASSOCIATION_DEFINITION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"22222222-2222-2222-2222-222222222222"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setValues")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Definition 2."')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" relation "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EntityRelation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setRelation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("relationTypes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("CLASSIFIES_IS_A_KIND_OF")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entityOneUUID"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entityTwoUUID"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" transaction "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" EntityFactory"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createTransaction")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ntransaction "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" EntityFactory"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addCreateToTransaction")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("transaction"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entityOne"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ntransaction "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" EntityFactory"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addCreateToTransaction")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("transaction"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" entityTwo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ntransaction "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" EntityFactory"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addCreateToTransaction")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("transaction"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" relation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" api "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InorigoAPI")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://www.myinorigo.com/"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\napi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("entity")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("transaction")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("transaction"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Success!"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])}),[],!1,null,null,null);n.default=e.exports}}]);