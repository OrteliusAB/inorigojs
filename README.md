# InorigoJS

<div align="center">
  <img src="https://www.ortelius.com/wp-content/uploads/2020/05/Ortelius-logo-black.png" />
  <br>
  InorigoJS is the only Inorigo utility you need! Built and supported by Ortelius.
  <br>
  <a target="_blank" href="https://orteliusab.github.io/virrvarr/docs/dist/index.html">Documentation</a>
</div>

# Contribute
Are you missing something? Consider contributing your time to the project! You can of course also post suggestions, bug reports or general questions to us here on Github.



-----OLD-----




# Inorigojs

## Inorigo API Helper Services
InorigoJS is a tool that allows you to more efficiently communicate with the Inorigo Web API.

### Installing
Using npm:
```
npm install @ortelius/inorigojs
```

Using script element
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>
<script src="https://unpkg.com/@ortelius/inorigojs/bundle/inorigojs.js"></script>
```

### InorigoAPI
InorigoAPI is a class that essentially mirrors the Inorigo API
#### Example
Using Import
```javascript
import { InorigoAPI } from '@ortelius/inorigojs';

//First create an API instance like so
const API = new InorigoAPI("API_BASE_URL")
//Then login
API.login("username", "password")
//Then you can use the instance to access different parts of the API (such as entity() and knowledgeset())
API.entity().generateUUID()
//To log out you can use
API.logout()
//To get your session (and check if already logged in), you can use:
API.getSession()
//getSession() can also be used to ping the server to stay logged in. The session with Inorigo will be destroyed after 5 minutes of inactivity.
```

Script element
```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>
<script src="https://unpkg.com/@ortelius/inorigojs/bundle/inorigojs.js"></script>

//First create an API instance like so
const API = new inorigojs.InorigoAPI("API_BASE_URL")
//Then login
API.login("username", "password")
//Then you can use the instance to access different parts of the API (such as entity() and knowledgeset())
API.entity().generateUUID()
//To log out you can use
API.logout()
//To get your session (and check if already logged in), you can use:
API.getSession()
//getSession() can also be used to ping the server to stay logged in. The session with Inorigo will be destroyed after 5 minutes of inactivity.
```

NodeJS Server Side (You may need to pass some extra variables)
```javascript
const { InorigoAPI } = require('@ortelius/inorigojs')
const api = new InorigoAPI(env.INORIGO_BASE_URL, {
    rejectUnauthorized: false, //if you get errors with Inorigos certificate, you can surpress them programatically
    authorization: { //This will force the credentials to be sent again with every request. This is necessary is certain implementations
        username: env.INORIGO_USER,
        password: env.INORIGO_PWD
    }
});
```

The following operations are supported:
- injectCookies(cookies)
- login(username, password)
- logout() 
- getSession()
- versoRuntime() {
    - refresh(vrid)
    - calculate(vrid)
    - clear(vrid, where)
    - getValue(vrid, where)
    - selectOne(vrid, where, what, isClearFirst)
    - selectMany(vrid, selectionJSON)
    - countAll(vrid, where)
    - countSelected(vrid, where)
    - countExplicit(vrid, where)
    - countImplicit(vrid, where)
    - getScript(vrid)
- knowledgeset() {
    - getMetaDatauuid
    - getResult(uuid, isDistinct, page, pagesize, parameters, allowcache)
    - getTreeResult(uuid, metaData, compactLeafs, parameters, allowcache)
    - getAvailable()
    - query(uuid, query)
    - countRows(uuid, isDistinct)
 - entity() {
    - generateUUIDcount(count)
    - getEntity(entityType, uuid)
    - getinstances(entityType, uuid, informationType, page, pagesize)
    - partners(entityType, uuid, relationUuid, direction, isRecursive, isLeafsOnly, informationType, page, pagesize)
    - getDefinitions(entityType, uuid, isDeep, informationType, page, pagesize)
    - getSuperClasses(entityType, uuid, isDeep, informationType, page, pagesize)
    - getSubClasses(entityType, uuid, isDeep, informationType, page, pagesize)
    - getReferents(entityType, uuid, page, pagesize)
    - getRelations(entityType, uuid, relationUuid, direction, page, pagesize)
    - updateEntityentityJSON(entityJSONArray)
    - createEntityentityJSONArray(entityJSONArray)
    - transactiontransactionData(transactionData)
    - deleteEntity(entityType, uuid)
    - getSimplifiedInstances(definitionUUID)
 - resource() {
    - getResource(uuid)
    - deleteResource(uuid)
    - createResourceresourceJSONArray(resourceJSONArray)
    - updateResourceresourceJSONArray(resourceJSONArray)

### Entity
The entity class is used to generate JSON structures that the Inorigo Web API is able to consume.

All entity operations are chainable and can be used to create an entity blueprint in memory. Said entity can then either be sent directly into the web API or added to a transaction.

Node
```javascript
const { Entity } = require('@ortelius/inorigojs')
const myEntity = new Entity("AsInstance")
.addDefinition("AsDefinition", "Some-UUID")
.print() //Returns the object
```

HTML:
```javascript
<script src="https://unpkg.com/@ortelius/inorigojs/bundle/inorigojs.js"></script>
const myEntity = new inorigojs.Entity("AsInstance")
.addDefinition("AsDefinition", "Some-UUID")
.print() //Returns the object
```

The following operations are supported:
- setDefinition(definitionType, definitionUUID)
- addDefinition(definitionType, definitionUUID)
- removeDefinition(definitionType, definitionUUID)
- setValues(attributevalues) (object literal with attribute UUID and value pairs)
- addValue(attributeUUID, value)
- removeValue(attributeUUID)
- clearAllAttributeValues()
- setUUID(uuid)
- setType(type)
- print()


### Entity Relation
The entity relation class is used to generate UnRel relation JSON structures that the Inorigo Web API is able to consume.

All entity relation operations are chainable and can be used to create an entity blueprint in memory. Said entity can then either be sent directly into the web API or added to a transaction.

Node
```javascript
const { EntityRelation, InorigoEnums } = require('@ortelius/inorigojs')
const relation = new EntityRelation("AsDefinitionRel")
.setRelations(new InorigoEnums().relationTypes().CLASSIFIES_IS_A_KIND_OF, "ID1", "ID2")
.print() //Returns the payload object
```

HTML:
```javascript
<script src="https://unpkg.com/@ortelius/inorigojs/bundle/inorigojs.js"></script>
const relation = new inorigojs.EntityRelation("AsDefinitionRel")
.setRelations(new inorigojs.InorigoEnums().relationTypes().CLASSIFIES_IS_A_KIND_OF, "ID1", "ID2")
.print() //Returns the payload object
```

The following operations are supported:
- setDefinition(definitionType, definitionUUID)
- addDefinition(definitionType, definitionUUID)
- removeDefinition(definitionType, definitionUUID)
- setRelations(relationSpecifierID, leftID, rightID, leftDefinitionType, rightDefinitionType)
- setUUID(uuid)
- setType(type)
- print()


### Entity Factory
The entity factory class is used to build inorigo transactions.

A transaction essentially consists of three arrays: create, update, and delete.

Node
```javascript
const { EntityFactory } = require('@ortelius/inorigojs')
const factory = new EntityFactory()
let transaction = factory.createNewTransaction(true) //surpress warnings from Inorigo
transaction = factory.addCreateToTransaction(transaction, myCreateEntity)
```

HTML:
```javascript
<script src="https://unpkg.com/@ortelius/inorigojs/bundle/inorigojs.js"></script>
const factory = new inorigojs.EntityFactory()
let transaction = factory.createNewTransaction(true) //surpress warnings from Inorigo
transaction = factory.addCreateToTransaction(transaction, myCreateEntity)
```

The following operations are supported:
- createNewTransaction(ignoreWarnings)
- addCreateToTransaction(transaction, data)
- addDeleteToTransaction(transaction, data)
- addUpdateToTransaction(transaction, data)

### Enum
The Enum class contains an Enum of the different technical terms and their "general" equivalents. E.g. AsDefinition = Assocication Definition.

Node:
```javascript
import { InorigoEnums } from '@ortelius/inorigojs';
const enums = new InorigoEnums();
enums.entityTypes().ASSOCIATION_DEFINITION
```

HTML
```javascript
<script src="https://unpkg.com/@ortelius/inorigojs/bundle/inorigojs.js"></script>
const enums = new inorigojs.InorigoEnums();
enums.entityTypes().ASSOCIATION_DEFINITION
```


### Inorigo Knowledge Set Parser (Legacy)

Using Node
```Javascript
import 'babel-polyfill'; //<--- for ie if needed
import { Parser } from '@ortelius/inorigojs';
const parser = new Parser()
```
Using HTML
```Javascript
<script src="inorigojs.js"></script>
const parser = new inorigojs.Parser();
```

Supported Operations:
- parseRawKSToJSON
    - Parses a raw Knowledge Set into a JSON tree.
- parseKSToTree
    - This parses the knowledgeset into a series of metadata / object data maps
- buildResultSetRecursive
    - This connects the dots from the metadata / object data maps generated by parseKSToTree
- groupColumns
    - This gets essential data from the Knowledge Set’s metadata and turns it into an object that contains the column names and ids of the cells in the knowledge set.
- createTableData
    - Here the data is converted into columns and rows that can then be put into the HTML table.
- generateColumns
    - Goes through each column in the Knowledge Set meta data and makes small objects that can be used in the table header to identify each column.


# For Library Developers
### Build Instructions

After cloning run:
```
npm install
```

To build a npm ready package into /lib:
```
npm run build
```
 
To build a javascript bundle file into /bundle:

```
npm run webp
```

To create both a npm package and a javascript bundle file:
```
npm run buildall
```

To run tests:
```
npm run test
```

To publish lib and src folder to NPM:
```
npm publish
```