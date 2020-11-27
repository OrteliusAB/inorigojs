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
	 * @return {object} - Response
	 */
	getEntity(entityType, uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves all instances of a given definition entity
	 * @param {string} entityType - Type of defining entity
	 * @param {string} uuid - ID of defining entity
	 * @param {string} informationType - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @return {object} - Response
	 */
	getinstances(entityType, uuid, informationType, page, pagesize) {
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
	 * @param {string} relationUuid - ID of the relation type to be evaluated
	 * @param {string} direction - Direction of the relation
	 * @param {string} isRecursive - Is the lookup recursive? I.e. is it deep.
	 * @param {string} isLeafsOnly - Retrieve only the leafs?
	 * @param {string} informationType - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @return {object} - Response
	 */
	partners(entityType, uuid, relationUuid, direction, isRecursive, isLeafsOnly, informationType, page, pagesize) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/partners${this.parentAPI._buildURIParams({
				relation: relationUuid,
				direction,
				recursive: isRecursive,
				leafsonly: isLeafsOnly,
				info: informationType,
				page,
				pagesize
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Find all defining entities
	 * @param {string} entityType - Type of origin entity
	 * @param {string} uuid - ID of origin entity
	 * @param {string} isDeep - Is the search deep?
	 * @param {string} informationType - What type of information to include in the response.
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
	 * @param {string} isDeep - Is the search deep?
	 * @param {string} informationType - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @return {object} - Response
	 */
	getSuperClasses(entityType, uuid, isDeep, informationType, page, pagesize) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/superclasses?deep=${this.parentAPI._buildURIParams({
				deep: isDeep,
				info: informationType,
				page,
				pagesize
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Find all sub class entities
	 * @param {string} entityType - Type of origin entity
	 * @param {string} uuid - ID of origin entity
	 * @param {string} isDeep - Is the search deep?
	 * @param {string} informationType - What type of information to include in the response.
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @return {object} - Response
	 */
	getSubClasses(entityType, uuid, isDeep, informationType, page, pagesize) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/subclasses${this.parentAPI._buildURIParams({
				deep: isDeep,
				info: informationType,
				page,
				pagesize
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
	 * @param {string} relationUuid - ID of the relation type
	 * @param {string} direction - direction of the search
	 * @param {number} page - What page to retrieve
	 * @param {number} pagesize - How large should the page size be?
	 * @return {object} - Response
	 */
	getRelations(entityType, uuid, relationUuid, direction, page, pagesize) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/relations${this.parentAPI._buildURIParams({
				specifier: relationUuid,
				direction,
				page,
				pagesize
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Updates an entity
	 * @param {object} entityJSON - Entity DTO
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
			Promise.resolve(simplifiedResult)
		})
	}

	/**
	 * Retrieves all graph dependencies of a given entity
	 * @param {string} entityType - Type of entity
	 * @param {string} uuid - ID of entity
	 * @param {string} dependants - Include dependants?
	 * @param {string} dependencies - Include dependencies?
	 * @param {string} values - Include values?
	 * @param {string} references - Include references?
	 * @param {string} relations - Include relations?
	 * @param {string} instances - Include instances?
	 * @param {string} presentations - Include presentations?
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
		presentations = true
	) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/dependencies/graph${this.parentAPI._buildURIParams({
				dependants,
				dependencies,
				values,
				references,
				relations,
				instances,
				presentations
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
	 * @param {string} dependants - Include dependants?
	 * @param {string} dependencies - Include dependencies?
	 * @param {string} values - Include values?
	 * @param {string} references - Include references?
	 * @param {string} relations - Include relations?
	 * @param {string} instances - Include instances?
	 * @param {string} presentations - Include presentations?
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
		instances = true,
		presentations = true
	) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/dependencies/edges${this.parentAPI._buildURIParams({
				dependants,
				dependencies,
				values,
				references,
				relations,
				instances,
				presentations
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
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
		return axios.get(
			`${this.parentAPI.BASE_URL_API}entity/${entityType}/${uuid}/icon${this.parentAPI._buildURIParams({
				size,
				contextID
			})}`,
			this.parentAPI.DEFAULTCONFIG
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
}
