# Entity Factory
The Entity Factory class is responsible for generating inorigo transactions. It is meant to be used in tandem with the Entity and InorigoAPI classes. 

A transaction allows you to execute multiple operations in the Entity API at the same time, with an immediate rollback if one single operation fails. It is recommended to always use the transaction API when possible, since it is the safest way to communicate with Inorigo and to avoid data corruption.

## Creating transactions
To use transactions you simply instruct the entity factory to create a new transaction object. You can then use the other functions in entity factory to configure the transaction, passing it as an argument to the different other functions.

The following functions are supported:
Function | Description
--- | ---
createNewTransaction(ignoreWarnings)   |   Creates a new transaction.
addCreateToTransaction(transaction, data)   |   Adds an entity object to the transaction as a create operation.
addDeleteToTransaction(transaction, data)   |   Adds an entity object to the transaction as a delete operation.
addUpdateToTransaction(transaction, data)   |   Adds an entity object to the transaction as an update operation.


## Implementing a transaction
Consider the following example to get an idea of how a transaction may be used in practice.
```javascript
const entityTypes = new InorigoEnums().entityTypes()
const entityOne = new Entity(entityTypes.ASSOCIATION_INSTANCE, "00000000-0000-0000-0000-000000000000")
.setDefinition(entityTypes.ASSOCIATION_DEFINITION, "11111111-1111-1111-1111-111111111111")
.setValues({
    "22222222-2222-2222-2222-222222222222": "I am a value."
})
.print()

const entityTwo = new Entity()
.setUUID("33333333-3333-3333-3333-333333333333")
.setValues({
    "44444444-4444-4444-4444-444444444444": "00000000-0000-0000-0000-000000000000"
})
.print()

let transaction = EntityFactory.createTransaction(false)
transaction = EntityFactory.addCreateToTransaction(transaction, entityOne)
transaction = EntityFactory.addUpdateToTransaction(transaction, entityTwo)

const api = new InorigoAPI("https://www.myinorigo.com/")
api.entity().transaction(transaction).then(() => {
    console.log("Success!")
})
```