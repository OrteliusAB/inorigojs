# Inorigo Enums
The Inorigo API requires you to know quite a lot about the systems internal lingo and UUIDs. Inorigo Enums helps with this, by translating human readable words into Inorigo lingo and UUIDs.

## Using Inorigo Enums
To use Inorigo Enums you need to create an instance of the Inorigo Enums class. After doing so you can execute a number of functions that will return object literal lookup maps.

The following functions are supported:
Function | Description
--- | ---
relationDirections()   |   Lookup map for relation directions.
relationCategories()   |   Lookup map for different categories of relations. Usually "From X, To X", or just GENERIC for relations that are not categorical.
relationTypes()   |   Lookup map for different types of relations (e.g. "classifies/is a kind of", "implements/implemented by", etc).
entityTypes()   |   Lookup map for systen names of entity types. This is probably the most used lookup table when interacting with the API.
entityInformationTypes()   |   Lookup map for information types that are retrievable using the Entity API.

Below is an example of how to use the class:
```javascript
const inorigoEnums = new InorigoEnums()
const relationDirections = inorigoEnums.relationDirections()
const relationCategories = inorigoEnums.relationCategories()
const relationTypes = inorigoEnums.relationTypes()
const entityTypes = inorigoEnums.entityTypes()
const entityInformationTypes = inorigoEnums.entityInformationTypes()
```