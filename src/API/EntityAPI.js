import axios from "axios"

/*
 * Entity API class.
 * This class contains APIs for doing CRUD operations on entities.
 */
export class EntityAPI {
	/**
	 * Entity API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Generates a number of valid Inorigo UUIDs that are not in use
	 * @param {number} count - How many IDs should be generated?
	 * @return {object} - Response
	 */
	generateUUID(count) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/generateid${this.parentAPI._buildURIParams({
				count
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves an entity from Inorigo
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @param {boolean} includePresentations - Include presentations?
	 * @param {boolean} includeIcons - Include icons of nested data?
	 * @param {boolean} includePresentationsSubObject - Include presentations of sub object?
	 * @return {object} - Response
	 */
	getEntity(entityType, uuid, includePresentations, includeIcons, includePresentationsSubObject) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}${this.parentAPI._buildURIParams({
				presentations: includePresentations ? "true" : undefined,
				includeIcons: includeIcons ? "true" : undefined,
				info: includePresentationsSubObject ? "true" : undefined
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves all instances of a given definition entity
	 * @param {string} entityType - Type of defining entity
	 * @param {string} uuid - ID of defining entity
	 * @param {[string]} informationType - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @return {object} - Response
	 */
	getInstances(entityType, uuid, informationType, page, pagesize) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/instances${this.parentAPI._buildURIParams({
				info: informationType,
				page,
				pagesize
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Find all partnering entities
	 * @param {string} entityType - Type of origin entity
	 * @param {string} uuid - ID of origin entity
	 * @param {string} relation - ID or name (i.e classifies) of the relation
	 * @param {string} direction - Direction of the relation
	 * @param {boolean} isRecursive - Is the lookup recursive? I.e. is it deep.
	 * @param {boolean} isLeafsOnly - Retrieve only the leafs?
	 * @param {[string]} info - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @param {boolean} [icons] - Add Icons (optional)
	 * @param {boolean} [presentations] - Add Presentations (optional)
	 * @return {object} - Response
	 */
	partners(entityType, uuid, relation = "classifies", direction, isRecursive, isLeafsOnly, informationType, page, pagesize, icons, presentations) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/partners${this.parentAPI._buildURIParams({
				relation,
				direction,
				recursive: isRecursive,
				leafsonly: isLeafsOnly,
				info: informationType,
				page,
				pagesize,
				icons,
				presentations
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves model partners for a given definition
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @return {object} - Response
	 */
	getModelPartners(entityType, uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/model/partners`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Executes a query
	 * @param {any} query - Query to execute
	 * @param {boolean} presentations - Should presentations be included?
	 * @param {number} page - What page to retrieve
	 * @param {number} pageSize - How large should the page size be?
	 * @return {object} - Response
	 */
	query(query, presentations, page, pageSize) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}entity/query${this.parentAPI._buildURIParams({
				presentations,
				page,
				pageSize
			})}`,
			query,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Search Find entities by name / presentation. The search is fuzzy (using the Bitap algorithm) by default and can be fine tuned by passing options via the request body. Returns a map with data type as key and a list of entities as value.
	 * @param {object} text - Text to search for
	 * @param {object=} options - Options
	 * @param {string[]=} options.entityTypes - Type of entities
	 * @param {string=} options.text - Text to search for
	 * @param {string=} options.definitionType - Optional definition type
	 * @param {string=} options.definitionID - Optional definition ID
	 * @param {boolean=} options.extendedMetadata - Include extended meta data for search?
	 * @param {boolean=} options.includeIcons - Include icons?
	 * @param {boolean=} options.caseSensitive - Is the search case sensitive?
	 * @param {boolean=} options.fullScan - Is the search a full scan search?
	 * @param {boolean=} options.positionRelevant - Is the position of the match relevant?
	 * @param {boolean=} options.contextSizeRelevant - Is the size of the searched contexts relevant?
	 * @param {number=} options.maxErrors - What is the maximum allowed levenshtein distance?
	 * @return {object=} options.- Response
	 */
	search(text, options) {
		const payload = options ? { text, ...options } : { text }
		return axios.post(`${this.parentAPI.BASE_URL_API}entity/search`, payload, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Find all defining entities
	 * @param {string} entityType - Type of origin entity
	 * @param {string} uuid - ID of origin entity
	 * @param {boolean} isDeep - Is the search deep?
	 * @param {[string]} informationType - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @return {object} - Response
	 */
	getDefinitions(entityType, uuid, isDeep, informationType, page, pagesize) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/definitions${this.parentAPI._buildURIParams({
				deep: isDeep,
				info: informationType,
				page,
				pagesize
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Find all super class entities
	 * @param {string} entityType - Type of origin entity
	 * @param {string} uuid - ID of origin entity
	 * @param {boolean} isDeep - Is the search deep?
	 * @param {[string]} informationType - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @param {boolean=} icons - Add icon to response
	 * @param {boolean} [addPresentations] - Add presentations to response
	 *
	 * @return {object} - Response
	 */
	getSuperClasses(entityType, uuid, isDeep, informationType, page, pagesize, addIcons, addPresentations) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/superclasses?deep=${this.parentAPI._buildURIParams({
				deep: isDeep,
				info: informationType,
				page,
				pagesize,
				icons: addIcons,
				presentations: addPresentations
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Find all sub class entities
	 * @param {string} entityType - Type of origin entity
	 * @param {string} uuid - ID of origin entity
	 * @param {boolean} isDeep - Is the search deep?
	 * @param {[string]} informationType - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @param {boolean} [addIcons] - Add icon to response
	 * @param {boolean} [addPresentations] - Add presentations to response
	 * @return {object} - Response
	 */
	getSubClasses(entityType, uuid, isDeep, informationType, page, pagesize, addIcons, addPresentations) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/subclasses${this.parentAPI._buildURIParams({
				deep: isDeep,
				info: informationType,
				page,
				pagesize,
				icons: addIcons,
				presentations: addPresentations
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Find all attribute references of an entity
	 * @param {string} entityType - Type of origin entity
	 * @param {string} uuid - ID of origin entity
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @return {object} - Response
	 */
	getReferents(entityType, uuid, page, pagesize) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/referents${this.parentAPI._buildURIParams({
				page,
				pagesize
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Find all relations of an entity
	 * @param {string} entityType - Type of origin entity
	 * @param {string} uuid - ID of origin entity
	 * @param {string} specifier - The type of relations to fetch, as an id or name (i.e classifies)
	 * @param {string} direction - direction of the search
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @param {boolean} [icon] - Add Icons? (optional)
	 * @param {boolean} [presentations] - Add Presentations? (optional)
	 *
	 * @return {object} - Response
	 */
	getRelations(entityType, uuid, specifier = "classifies", direction, page, pagesize) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/relations${this.parentAPI._buildURIParams({
				specifier,
				direction,
				page,
				pagesize
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Updates an entity
	 * @param {array} entityJSONArray - Array of entity DTOs
	 * @return {object} - Response
	 */
	updateEntity(entityJSON) {
		return axios.put(`${this.parentAPI.BASE_URL_API}entity`, entityJSON, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Creates an entity
	 * @param {array} entityJSONArray - Array of entity DTOs
	 * @return {object} - Response
	 */
	createEntity(entityJSONArray) {
		return axios.post(`${this.parentAPI.BASE_URL_API}entity`, entityJSONArray, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Executes a transaction
	 * @param {object} transactionData - The transaction DTO
	 * @return {object} - Response
	 */
	transaction(transactionData) {
		return axios.post(`${this.parentAPI.BASE_URL_API}entity/commit/transaction`, transactionData, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Deletes an entity
	 * @param {string} entityType - Entity Type
	 * @param {string} uuid - Entity ID
	 * @return {object} - Response
	 */
	deleteEntity(entityType, uuid) {
		return axios.delete(`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves a simplified format of all instances of a given association definition
	 * @param {string} definitionUUID - Entity UUID
	 * @return {object} - Response
	 */
	getSimplifiedInstances(definitionUUID) {
		return axios
			.get(`${this.parentAPI.BASE_URL_API}entity/AsDefinition/${definitionUUID}/instances?info=values`, this.parentAPI.DEFAULTCONFIG)
			.then(result => {
				const simplifiedJSON = result.data.entities.map(entity => {
					const newEntity = {
						id: entity.id,
						type: entity.dataType
					}
					newEntity.values = entity.attributeValues.reduce((simplifiedOilEntity, attributeValue) => {
						simplifiedOilEntity[attributeValue.name] = attributeValue.value
						return simplifiedOilEntity
					}, {})
					return newEntity
				})
				return new Promise(resolve => {
					resolve(simplifiedJSON)
				})
			})
	}

	/**
	 * Retrieves a simplified format of an entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @return {object} - Response
	 */
	getSimplifiedEntity(entityType, uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/`, this.parentAPI.DEFAULTCONFIG).then(result => {
			const simplifiedResult = result.data.attributeValues.reduce((acc, attributeValue) => {
				acc[attributeValue.name] = attributeValue.value
				return acc
			}, {})
			simplifiedResult.type = entityType
			simplifiedResult.uuid = uuid
			simplifiedResult.presentation = result.data.presentation
			return Promise.resolve(simplifiedResult)
		})
	}

	/**
	 * Retrieves all graph dependencies of a given entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @param {boolean} dependants - Include dependants?
	 * @param {boolean} dependencies - Include dependencies?
	 * @param {boolean} values - Include values?
	 * @param {boolean} references - Include references?
	 * @param {boolean} relations - Include relations?
	 * @param {boolean} instances - Include instances?
	 * @param {boolean} presentations - Include presentations?
	 * @param {boolean} icons - Include instances?
	 * @return {object} - Response
	 */
	getGraphDependencies(
		entityType,
		uuid,
		dependants = true,
		dependencies = true,
		values = true,
		references = true,
		relations = true,
		instances = true,
		presentations = true,
		icons = true
	) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/dependencies/graph${this.parentAPI._buildURIParams({
				dependants,
				dependencies,
				values,
				references,
				relations,
				instances,
				presentations,
				icons
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves all possible entity references of an entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @return {object} - Response
	 */
	getPossibleEntityReferences(entityType, uuid) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/possible/references${this.parentAPI._buildURIParams({
				type: entityType,
				id: uuid
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves all possible instance references of an entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @return {object} - Response
	 */
	getPossibleInstanceReferences(definitionType, uuid) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/possible/instance/references${this.parentAPI._buildURIParams({
				type: definitionType,
				id: uuid
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves the presentation string of an entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @param {string} povAttributeID - Optional ID for contextual alias
	 * @return {object} - Response
	 */
	getPresentation(entityType, uuid, povAttributeID) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/presentation${this.parentAPI._buildURIParams({
				povAttributeID
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves all dependency edges of a given entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @param {boolean} dependants - Include dependants?
	 * @param {boolean} dependencies - Include dependencies?
	 * @param {boolean} values - Include values?
	 * @param {boolean} references - Include references?
	 * @param {boolean} relations - Include relations?
	 * @param {boolean} instances - Include instances?
	 * @param {boolean} presentations - Include presentations?
	 * @param {boolean} icons - Include icons?
	 * @return {object} - Response
	 */
	getDependencyEdges(
		entityType,
		uuid,
		dependants = true,
		dependencies = true,
		values = true,
		references = true,
		relations = true,
		instances = false,
		presentations = true,
		icons = true
	) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/dependencies/edges${this.parentAPI._buildURIParams({
				dependants,
				dependencies,
				values,
				references,
				relations,
				instances,
				presentations,
				icons
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves attribute meta data, including inheritance structure
	 * @param {string} entityType - Type of entity
	 * @param {string} entityUUID - ID of entity
	 * @param {string} attributeUUID - ID of attribute
	 * @return {object} - Response
	 */
	getAttribute(entityType, entityUUID, attributeUUID) {
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/${entityType}/${entityUUID}/attribute/${attributeUUID}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves user permissions for a given user
	 * @param {string} entityType - Type of entity to get authorizations for
	 * @param {string} entityUUID - ID of entity to get authorizations for
	 * @param {string} userUUID - ID of user to get authorizations for
	 * @return {object} - Response
	 */
	getUserAuthorization(entityType, entityUUID, userUUID) {
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/${entityType}/${entityUUID}/authorizations/${userUUID}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves collateral dependants for a given entity
	 * @param {string} entityType - Type of entity to get authorizations for
	 * @param {string} entityUUID - ID of entity to get authorizations for
	 * @return {object} - Response
	 */
	getCollateralDependants(entityType, entityUUID) {
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/${entityType}/${entityUUID}/collateral/dependants`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves the icon of an entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @param {number} size - Size of the icon
	 * @param {string} contextID - ID of the context where the icon is stored
	 * @return {object} - Response
	 */
	getEntityIcon(entityType, uuid, size, contextID) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "*/*"
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/icon${this.parentAPI._buildURIParams({
				size,
				contextID
			})}`,
			customConfig
		)
	}

	/**
	 * Retrieves the ID of the icon of an entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @param {string} contextID - ID of the context where the icon is stored
	 * @return {object} - Response
	 */
	getEntityIconID(entityType, uuid, contextID) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/icon/id${this.parentAPI._buildURIParams({
				contextID
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves a value set by ID
	 * @param {string} uuid - ID of value set
	 * @return {object} - Response
	 */
	getValueset(uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/valueset/${uuid}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves presentation of multiple entities simultaneously
	 * @param {array} entityArray - Array of entity IDs
	 * @return {object} - Response
	 */
	getPresentations(entityArray) {
		return axios.post(`${this.parentAPI.BASE_URL_API}entity/presentations/`, entityArray, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Query the granted actions for a class, variant or entity
	 * @param {string} type - The data type to get granted actions for.
	 * @param {string} entityId - Optional id of an entity to get granted actions for
	 * @param {string} variant - Optional data object variant to get granted actions for. Note: Only valid when type is GsGenericDataObject
	 * @param {string} actions - Optional actions to get grants for, as a comma-separated string. Defaults to all actions
	 * @param {string} userId - {uuid} Optional user to get authorizations for. Defaults to the user making the API call
	 * @param {string} contextID - Optional context id. Defaults to the current request data context
	 * @returns {object} - Response
	 */
	getGranted(type, entityId, variant, actions, userId, contextID) {
		const uriParams = {
			type,
			entityId,
			variant,
			actions,
			userId,
			contextID
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/granted/${type}${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Generate one or several empty entities with ready made id
	 * @param {string} type - The type of entity to generate
	 * @param {number} count - Number of entities to generate. Defaults to 1, maximum allowed value is 1000
	 * @param {string} definition - The uuid of the definition to base the generated entity on. Example : 492C2918-E33E-C6E2-317C-A75300C0D105
	 * @returns {object} - Response
	 */
	generateEntity(type, count, definition) {
		const uriParams = {
			count,
			definition
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/${type}/generate${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}
}
