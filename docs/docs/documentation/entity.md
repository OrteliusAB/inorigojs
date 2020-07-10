# Entity

Entity is a class used to create entity payloads for Inorigo. Entity generates JSON objects that Inorigo is able to interpret, and that can be used together with the InorigoAPI and EntityFactory classes. The class uses chainable functions to allow for creating easily readable code. 

To use Entity you begin by creating a new instance. If you are editing an existing object in inorigo you can provide its type and UUID to the constructor, and if you're creating a new entity then you can simply leave the arguments blank.
```javascript
const entity = new Entity(new InorigoEnums().entityTypes().ASSOCIATION_DEFINITION, "00000000-0000-0000-0000-000000000000")
```

## Definitions
Entity allows you to add and remove definitions from your entity. Note that that Entity API is additive. That means that omission (or in this case "removal") of a definition will not actually remove it from Inorigo. If you wish to remove a definition then you need to remove the actual relation entity.

The following functions are supported:
Function | Description
--- | ---
setDefinition(definitionType, definitionUUID)   |   Clears any existing definitions on the entity object and sets the given definition.
addDefinition(definitionType, definitionUUID)   |   Adds a definition to the entity.
removeDefinition(definitionType, definitionUUID)   |   Removed a definition from the entity.

## Values
You can add and remove values from your entity. Note that removing an attribute does not mean the same thing as removing it in Inorigo. To clear the value you can set it to null. To completely remove the attribute as such you will need to change the definition as such, which is currently not supported.

The following functions are supported:
Function | Description
--- | ---
setValues(attributevalues)   |   Sets the attributes and values on the entity object, clearing any existing values previously set.
addValue(attributeUUID, value)   |   Adds a single value to the entity object.
removeValue(attributeUUID)   |   Removes a single value from the object
clearAllAttributeValues()   |   Clears all previously set attributes from the object.

## Base Attributes
You can manually set the UUID and the type of the object you are creating / editing.

The following functions are supported:
Function | Description
--- | ---
setUUID(uuid)   |   Sets the UUID of the entity.
setType(type)   |   Sets the entity type.

## Relations
You can add superclasses to the entity. Or, in other words, you can classify your entity by other entities.

The following functions are supported:
Function | Description
--- | ---
addSuperClass(type, uuid)   |   Adds a superclass to the entity.
setSuperClasses(uuidArray)   |   Sets the superclasses to a provided value, clearing any existing definitions.

## Output
After you have created your entity you can export the resulting JSON by using the print function. The print function will return a valid Inorigo JSON object that Inorigo is able to interpret.

Function | Description
--- | ---
print()   |   Export the finished JSON object.

## Examples

A typical example may look something like this:
```javascript
const entityTypes = new InorigoEnums().entityTypes()
const myEntity = new Entity()
.setType(entityTypes.ASSOCIATION_INSTANCE)
.setDefinition(entityTypes.ASSOCIATION_DEFINITION, "00000000-0000-0000-0000-000000000000")
.setValues({
    "11111111-1111-1111-1111-111111111111": "Some value"
    "22222222-2222-2222-2222-222222222222": 42
})
.print()

const api = new InorigoAPI("https://www.myinorigo.com/")
api.entity().createEntity([myEntity]).then(() => {
    console.log("Success!")
})
```