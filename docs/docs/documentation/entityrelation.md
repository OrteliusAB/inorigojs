# Entity Relation
Entity Relation is a class built specifically for generating Inorigo relation objects. Entity relations can be created, updated and deleted using the entity API, similar to any other entity object.

## Creating relations
When creating a relation you need to specify the type of relation (defined by what you are trying to connect to what, and in what way), as well as the type of connection the relation should be. Different types of connection will have a different effect on things like inheritance, but can also help in separating information in different distinct ways.

The following functions are supported:
Function | Description
--- | ---
setUUID(uuid)   |   Sets the UUID of the relation (default value is null).
setType(type)   |   sets the type (or rather category) of the relation (default value is ASDEF_TO_ASDEF)
setLeftDefinitionType(leftDefinitionType)   |   Sets the definition type of the left relation (default value is AsDefinition)
setRightDefinitionType(rightDefinitionType)   |   Sets the definition type of the right relation (default value is AsDefinition)
setRelation(relationSpecifierID, leftID, rightID)   |   defines the relation on the relation entity. 
print()   |   Exports the finished JSON object.

## Implementing relations
Consider the following example to get an idea of how to create a relation.
```javascript
const inorigoEnums = new InorigoEnums()
const entityTypes = inorigoEnums.entityTypes()
const relationCategories = inorigoEnums.relationCategories()
const relationTypes = inorigoEnums.relationTypes()

const entityOneUUID = "00000000-0000-0000-0000-000000000000"
const entityTwoUUID = "11111111-1111-1111-1111-111111111111"

const entityOne = new Entity(entityTypes.ASSOCIATION_DEFINITION, entityOneUUID)
.setDefinition(entityTypes.ASSOCIATION_DEFINITION, "22222222-2222-2222-2222-222222222222")
.setValues({
    "name" : "Definition 1"
})
.print()

const entityTwo = new Entity(entityTypes.ASSOCIATION_DEFINITION, entityTwoUUID)
.setDefinition(entityTypes.ASSOCIATION_DEFINITION, "22222222-2222-2222-2222-222222222222")
.setValues({
    "name": "Definition 2."
})
.print()

const relation = new EntityRelation()
.setRelation(relationTypes.CLASSIFIES_IS_A_KIND_OF, entityOneUUID, entityTwoUUID)
.print()

let transaction = EntityFactory.createTransaction(false)
transaction = EntityFactory.addCreateToTransaction(transaction, entityOne)
transaction = EntityFactory.addCreateToTransaction(transaction, entityTwo)
transaction = EntityFactory.addCreateToTransaction(transaction, relation)

const api = new InorigoAPI("https://www.myinorigo.com/")
api.entity().transaction(transaction).then(() => {
    console.log("Success!")
})
```