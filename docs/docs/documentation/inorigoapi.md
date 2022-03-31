# Inorigo API

InorigoAPI is the class responsible for communicating with Inorigo. InorigoAPI is built with the help of [Axios](https://github.com/axios/axios), and each call made from InorigoAPI will be behave exactly that a web call made through Axios (because that is literally what it is!).

## Creating an instance
InorigoAPI takes two arguments, an Inorigo root URL as well as an options object.

The following options can be passed to InorigoAPI:
Option | Description
--- | ---
customHttpsAgent   |   If set InorigoAPI will set a custom https agent. This is useful if you for example need to bypass security protocols during development, or when certificates are causing issues. 
authorization   |   Authorization should contain two properties: "username" and "password". If provided authorization headers will be sent with every request. 
apiEndpoint   |   If your api endpoint is not located on the base URL then you can provide a separate, relative URL.

Creating an instance is as simple as this:
```javascript
const api = new InorigoAPI("https://www.myinorigo.com/", {})
```

## Cookies
You can manually set cookies to be included in all subsequent requests by supplying them as a string to injectCookies(). This is useful if you are not in a web browser, and cookies are not automatically handled for you.
```javascript
api.injectCookies("mycookies")
```

## Account
The account functions allow you to login, logout, as well as get information about your session.

The following functions are supported:
Function | Description
--- | ---
login(username, password)   |   Will send a login request to Inorigo with the provided credentials. 
logout()   |   Will send a logout request to Inorigo. 
getSession()   |   Will send a session request to Inorigo.

## Verso Runtime
The Verso Runtime API allows you to communicate and interact with a running Inorigo Application instance. To access the API you need to first retrieve an instance of it from your API instance like so:
```javascript
const versoAPI = api.getVersoRuntimeAPI()
```

The following functions are supported:
Function | Description
--- | ---
refresh(vrid)   |   Requests the application to refresh its data.
calculate(vrid)   |   Requests the application to recalculate the selection. 
clear(vrid, where)   |   Requests the application to clear all selections in the provided filterbox ID.
getValue(vrid, where)   |   Attempts to retrieve a value from a given verso runtime parameter (filterbox, dataset, etc).
selectOne(vrid, where, what, isClearFirst)   |   Will attempt to make a selection in a given filterbox. isClearFirst indicates if the current selection should be cleared before the new one is made.
selectMany(vrid, selectionJSON)   |   Will attempt to make multiple selections in a number of filterboxes. For more information on the JSON format please check the official Inorigo API documentation.
countAll(vrid, where)   |   Counts all items in a given filterbox.
countSelected(vrid, where)   |   Counts all selected items in a given filterbox.
countExplicit(vrid, where)   |   Counts all explicitly selected items in a given filterbox.
countImplicit(vrid, where)   |   Counts all implicitly selected items in a given filterbox.
getTooltip(vrid, componentID, row, column)   |   Get the tooltip text for a given component.
evaluateExpression(vrid, expression)   |   Evaluate an Inorigo expression.
setRuntimeVariable(vrid, name, type, element, value)   |   Set a runtime variable.
lockSelection(vrid, where)   |   Lock the selection in a given set of filterboxes.
unlockSelection(vrid, where)   |   Unlock the selection in a given set of filterboxes.
focusComponent(vrid, component)   |   Focus on a given component.
setComponentReadOnly(vrid, component, readonly) |   Set a component read only
setComponentVisible(vrid, component, visible)   |   Set the visibility of a component
setComponentEnabled(vrid, component, enabled)   |   Set a component enabled
triggerAction(vrid, action, entityType, entityUUID, where)  |   Trigger an interactive action to be performed for an entity

## Knowledgeset
The knowledgeset API allows you to retrieve knowledgesets and meta data about knowledgesets. To access the API you need to first retrieve an instance of it from your API instance like so:
```javascript
const KSAPI = api.getKnowledgesetAPI()
```

The following functions are supported:
Function | Description
--- | ---
getMetaData(uuid)   |   Retrieves meta data about a given knowledgeset. 
getResult(uuid, isDistinct, page, pagesize, parameters)   |   Retrieves a knowledgeset in table format.
searchResult(uuid, text, fuzzy, metaData, compactLeafs, allowCache, searchIDs, includedColumns, excludedColumns)   |   Retrieves a knowledgeset in table format where every row matches a given free text search
getCachedResult: (uuid, page, pagesize, compactPaths)   |   Retrieves a (cached) knowledgeset in table format
getTreeResult(uuid, metaData, compactLeafs, parameters, allowCache)   |   Retrieves a knowledgeset in tree format.
searchTreeResult(uuid, text, fuzzy, metaData, compactLeafs, allowCache, searchIDs, includedColumns, excludedColumns)   |   Retrieves a knowledgeset in tree format where every node matches a given free text search
getAvailable()   |   Retrieves a list of all available knowledgesets.
query(uuid, query, metadata, context, parameters, allowCache)   |   Executes a SQL Server query on top of the result of a given knowledgeset and retrieves the result.
countRows(uuid, isDistinct)   |   Retrieves the amount of rows in a knowledgeset.
getSchedulingStatus()   |   Retrieves the scheduling status for all knowledgeset caches.
exportToFile(uuid, metaData, context, isDistinct, page, pagesize, compactpaths, allowCache, replaceidbypresentation, mediaType) |   Export knowledgeset to a file, as .CSV or Excel format, filename will be same as knowledgeset name.
getResultAsObjects(uuid, metadata, context, distinct, page, pagesize, compactpaths, allowCache, replaceidbypresentation)    |   Execute a Knowledge Set. Result as Json Objects.
searchResultAsObjects(uuid, text, fuzzy, metaData, page, pagesize, compactpaths, allowCache, searchIDs, includedColumns, excludedColumns, replaceidbypresentation)  |   Search Knowledge Set for text occurrences. Result as Json Objects.

## Entity
The entity API allows you to execute CRUD operations in Inorigo. To access the API you need to first retrieve an instance of it from your API instance like so:
```javascript
const entityAPI = api.getEntityAPI()
```

The following functions are supported:
Function | Description
--- | ---
generateUUID(count)   |  Generates new valid UUIDs that is currently unused in Inorigo.
generateEntity(type, count, definition) |   Generate one or several empty entities with ready made id.
getEntity(entityType, uuid)   |  Retrieves information about a given entity in Inorigo.
getSimplifiedEntity(entityType, uuid)   |  Retrieves information about a given entity in Inorigo, but in an easier to interpret format.
getinstances(entityType, uuid, informationType, page, pagesize)   |  Retrieves a list of all instances of a given definition.
getSimplifiedInstances(definitionUUID)   |  Retrieves all instances of a given definition, but in an easier to interpret format. Only works for Association Definitions.
partners(entityType, uuid, relationUuid, direction, isRecursive, isLeafsOnly, informationType, page, pagesize)   |  Retrieves all related entities with a given set of parameters.
getDefinitions(entityType, uuid, isDeep, informationType, page, pagesize)   |  Retrieves all definitions of a given entity.
getSuperClasses(entityType, uuid, isDeep, informationType, page, pagesize)   |  Retrieves all classifying entities of a given entity.
getSubClasses(entityType, uuid, isDeep, informationType, page, pagesize)   |  Retrieves all classified entities of a given entity.
getReferents(entityType, uuid, page, pagesize)   |  Retrieves all entities that have references to a given entity.
getRelations(entityType, uuid, relationUuid, direction, page, pagesize)   |  Retrieves all relations for a given entity.
updateEntity(entityJSON)   |  Updates a given set of entities.
createEntity(entityJSONArray)   |  Creates a given set of entities.
deleteEntity(entityType, uuid)   |  Deletes a given set of entities.
transaction(transactionPayload)   |  Executes a transaction in Inorigo.
getGraphDependencies(entityType, uuid, dependants, dependencies, values, references, relations, instances, presentations)   |  Retrieves all graph dependencies of a given entity
getPossibleEntityReferences(entityType, uuid)   |  Retrieves all possible entity references for a given entity.
getPossibleInstanceReferences(definitionType, uuid)   |  Retrieves all possible entity references for every instance of a given definition.
getDependencyEdges(entityType, uuid, dependants, dependencies, values, references, relations, instances, presentations)   |  Retrieves all dependency edges of a given entity.
getEntityIcon(entityType, uuid, size, contextID)   |  Retrieves the icon of an entity.
getEntityIconID(entityType, uuid, contextID)   |  Retrieves the ID of the icon of a given entity.
getValueset(uuid)   |  Retrieves a valueset.
getPresentation(entityType, uuid, povAttributeID)   |  retrieves the presentation of an entity, with an optional pov attribute ID.
getPresentations(entityArray)   |  Retrieves multiple presentations simultaneously. The entity array should be an array of objects, where every object has an "entityType" and "uuid" attribute.
getModelPartners(entityType, uuid)   |  Retrieves model partners for a given definition
query(query, presentations, page, pagesize)   |  Executes a query
search(text, options)   |  Search Find entities by name / presentation. The search is fuzzy (using the Bitap algorithm) by default and can be fine tuned by passing options via the request body. Returns a map with data type as key and a list of entities as value.
getAttribute(entityType, entityUUID, attributeUUID)   |  Retrieves attribute meta data, including inheritance structure
getUserAuthorization(entityType, entityUUID, userUUID)   |  Retrieves user permissions for a given user
getCollateralDependants(entityType, entityUUID)   |  Retrieves collateral dependants for a given entity
getGranted(type, entityId, variant, actions, userId, contextID) |   Query the granted actions for a class, variant or entity

## Resource
The resource API allows you to execute CRUD operations for resources (files) stored in Inorigo. To access the API you need to first retrieve an instance of it from your API instance like so:
```javascript
const resourceAPI = api.getResourceAPI()
```

The following functions are supported:
Function | Description
--- | ---
getResource(uuid)   |    Retrieves a resource from Inorigo
deleteResource(uuid)   |    Deletes a resource from Inorigo
createResource(resourceJSONArray)   |   Creates a resource in Inorigo
updateResource(resourceJSONArray)   |   Updates a resource in Inorigo  
getResourceData(key, attachment)    |   Get the data of the resource 

## Legacy
The legacy API allows you to execute operations in the Inorigo legacy web services:
```javascript
const legacyAPI = api.getLegacyAPI()
```

The following functions are supported:
Function | Description
--- | ---
executeChange(uuid, contextID, commit?, stringInputArray)   |    Executes a change in Inorigo (process unit definition -> main)
executeMethod(uuid, contextID, commit?, stringInputArray)   |    Executes a method in Inorigo

## Data Object
The data object API allows for storage of arbitrary data objects in Inorigo. Useful for storing things like configuration for external applications:
```javascript
const DOAPI = api.getDataObjectAPI()
```

The following functions are supported:
Function | Description
--- | ---
listDataObjects(type)   |   Lists data objects by type (optional)
getDataObject(id)   |   Gets a data object by ID
async getDataObjects(type)   |   Gets several data objects by type (optional)
getDataVariant(id)   |   Gets a data variant by ID
listDataVariants()   |   Lists all data variants in inorigo
createDataObject(type, data, id, name, mimeType)   |   Creates a data object
registerDataVariant(name, remark, id, mimeType)   |   Registers a data variant
updateDataObject(id, data, type, name, mimeType)   |   Updates a data object
deleteDataObject(id)   |   Delete data object
deleteDataVariant(id)   |   Delete data variant
    
## Core
The Core API allows you to execute operations in the Inorigo core web services:
```javascript
const coreAPI = api.getCoreAPI()
```

The following functions are supported:
Function | Description
--- | ---
getEntityPresentation(type, uuid)   |    Retrieves the entity presentation from inorigo
getFilter(uuid)   |    Retrieves a Filter definition from inorigo
runFilter(filterDefinition, presentations?, icons?)   |    Runs a Filter in inorigo
getTranslation(text)   |    Retrieves a Translation from inorigo
getAttributeDefinition(attributeKey, definitionID, definitionType, entityType)   |    Retrieves an Attribute Definition from inorigo
getPossibleAttributeValues(attributeKey, definitionID, definitionType, entityType, presentations, icons)   |    Retrieves possible known values for an Inorigo attribute
getPossibleAttributeValuesCount(attributeKey, definitionID, definitionType, entityType, presentations, icons)   |    Retrieves possible known values for an Inorigo attribute
getEntityTypeCount(entityType)   |    Retrieves number of entities for an Inorigo Type
getRelationSpecifierName(relationSpecifierID, direction)   |    Retrieves the name of a relation specifier in the specified direction
getEntityConfigByRequest(request)   |    Retrieves attributes, relations and references for a Config Request object
getEntityConfigTreeByRequest(request)   |    Retrieves Tree structure for attributes, relations and references for a Config Request object
getCriterionOptions(criterion, filter, presentations, icons, page, pageSize)   |    Retrives a list of possible values for a criterion
getCriterionOptionsCount(criterion)   |    Retrives the number of possible values for a criterion
getEntityIconUrl(type, uuid)   |    Retrives the Icon URL for a given entity
getTypeIconUrl(type, size)   |    Retrives the Icon URL for a given entity type
getCategoryIconUrl(category, size)   |    Retrives the Icon URL for a given category
getInorigoDataTypes(primitives = false)   |    Retrives the known data types from Inorigo
getExpressionFunctions()   |    Retrives the known Expression Functions from Inorigo
getAttributeReferenceName(attributeKey, definitionID, detailed = false)   |    Retrieves the reference name for an Inorigo attribute

## Module
The Module API allows you to execute operations in the Inorigo module web services:
```javascript
const moduleAPI = api.getModuleAPI()
```

The following functions are supported:
Function | Description
--- | ---
registerModule(requestBody) |   Submits a request that an external module is to be added to the system
registerDependency(requestBody) |   Register that a requester is depnding on some resource
getModule(enabled)  |   List the available modules
deleteModule(uuid)  |   Delete operation that marks a module for removal. Note that the module is not removed until a system administrator appproves the request
deleteDependency(requestBody)   |   Remove a registered dependency from the specified requester

## Favorite
The Favorite API allows you to execute operations in the Inorigo favorite web services:
```javascript
const favoriteAPI = api.getFavoriteAPI()
```

The following functions are supported:
Function | Description
--- | ---
createFavorite(uuid, datatype)  |   Create a user favorite for id and data type of the entity
getFavorite(uuid)   |   Get a user favorite object
getFavorites(targetType)    |   List a users favorites - a list with all favorites
deleteFavorite(uuid)    |   Delete a user favorite

## Miscellaneous
The Miscellaneous API allows you to execute operations in the Inorigo Miscellaneous web services:
```javascript
const miscellaneousAPI = api.getMiscellaneousAPI()
```

The following functions are supported:
Function | Description
--- | ---
getUser()   |   Get info on the currently logged in user
excecute(requestBody)   |   Trigger an execution of a Method, Class or Function
registerActivity(requestBody)   |   Register an activity to the user activity log
getDynamicImage(key, contextID, filter) |   Get a dynamic image. The filter parameter allows the image to be processed with the specified filter before it is returned
getRelationDirectionIcon(direction) |   Get the general icon for a relation direction
getRelationIcon(direction, relationType, relationID)    |   Get the icon for a identified relation

## Theme
The Theme API allows you to execute operations in the Inorigo theme web services:
```javascript
const themeAPI = api.getThemeAPI()
```

The following functions are supported:
Function | Description
--- | ---
getCssDefault(cssClass) |   Get the default stylesheet
getVariablesDefault()   |   Get the default theme
getVariablesPortal()    |   Get the configured portal theme. The default theme is returned if no portal theme is configured
getCssPortal(cssClass)  |   Get the configured portal stylesheet. The default stylesheet is returned if no portal theme is configured
getCssSession(cssClass) |   Get the session stylesheet
getVariablesSession()   |   Get the session theme
getVariables(id)    |   Get a theme
getCss(id, cssClass)    |   Get a theme
getImage(key, mainColor, accentColor, highlightColor, theme)    |   
getThemedImage(image, mainColor, accentColor, highlightColor, theme)    |   
getTheme()  |   Get id and presentation for the available themes
getWorkbenchTheme() |   Get the configured workbench theme. The default stylesheet is returned if no workbench theme is configured
getWorkbenchStylesheet()    |   Get the configured workbench stylesheet. The default stylesheet is returned if no workbench theme is configured
applyTheme(mainColor, accentColor, highlightColor, requestBody, contentType)    |   Apply theme on any text. Like svg, html etc