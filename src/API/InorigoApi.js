import axios from "axios"

/*
 * This is the main API communication class.
 * This class contains functions that return communication instances of each respective API of Inorigo, but with one shared API class instance.
 */
export class InorigoAPI {
	/**
	 * Inorigo API
	 * @param {string} url - The URL of your inorigo instance.
	 * @param {object} options - Options
	 * @param {object} options.customHttpsAgent - A custom HTTPS agent that can used to, for example, surpress certificate related errors
	 * @param {object} options.authorization - Authorization parameters (username, password). If provided these will be stored and sent in every subsequent request
	 * @param {object} options.apiEndpoint - By default the latest version of the web API will typically be used. You can override this by providing your own endpoint.
	 */
	constructor(url, { customHttpsAgent, authorization, apiEndpoint }) {
		this.IS_SECURE = true
		this.BASE_URL = url
		this.BASE_URL_API = url += "services/api/v1/"
		this.DEFAULTCONFIG = {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Accept: "application/json",
				"Access-Control-Max-Age": 1728000
			},
			data: {},
			withCredentials: true
		}

		if (apiEndpoint) {
			this.BASE_URL_API = this.BASE_URL + apiEndpoint
		}

		if (customHttpsAgent !== undefined) {
			this.IS_SECURE = false
			this.DEFAULTCONFIG = {
				...this.DEFAULTCONFIG,
				httpsAgent: customHttpsAgent
			}
		}

		if (authorization) {
			if (authorization.username && authorization.password) {
				this.DEFAULTCONFIG.headers.Authorization = "Basic " + this._genericBtoA(authorization.username + ":" + authorization.password)
			}
		}
	}

	/* Security, Global Settings */

	/**
	 * Can be used to inject cookies in all subsequent requests.
	 * @param {string} cookies - the cookie string
	 */
	injectCookies(cookies) {
		this.DEFAULTCONFIG.headers.Cookie = cookies
	}

	/* Account, Session */

	/**
	 * Send a login request to Inorigo.
	 * @param {string} username - Username to be used
	 * @param {string} password - Password to be used
	 */
	async login(username, password) {
		const CONFIG = {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Accept: "application/json",
				Authorization: "Basic " + this._genericBtoA(username + ":" + password)
			},
			data: {},
			withCredentials: true
		}
		if (!this.IS_SECURE) {
			CONFIG.httpsAgent = this.DEFAULTCONFIG.httpsAgent
		}
		return axios.post(`${this.BASE_URL}services/open/login`, {}, CONFIG)
	}

	/**
	 * Send a logout request to Inorigo.
	 */
	async logout() {
		return axios.post(`${this.BASE_URL}services/open/logout`, {}, this.DEFAULTCONFIG)
	}

	/**
	 * Retrieves the current session from Inorigo.
	 */
	async getSession() {
		return axios.get(`${this.BASE_URL}services/open/session/user`, this.DEFAULTCONFIG)
	}

	/* API Shortcuts (Common inorigo helper functions) */

	/**
	 * Retrieves a shortcut API that can be used to abstract away some of the trickiness of the entity API.
	 * @return {object} - The API
	 */
	shortcuts() {
		return {
			/**
			 * Gets all classified entities of a given entity in an easily readable form.
			 * @param {string} definitionUUID - UUID of root entity
			 * @param {boolean} isDeep - Is it a deep search?
			 * @return {object} - Response
			 */
			getClassifiedValuesList: (definitionUUID, isDeep) => {
				return new Promise(resolve => {
					this.entity()
						.getSubClasses("AsDefinition", definitionUUID, isDeep)
						.then(response => {
							const promises = response.data.entities.map(entity => {
								return this.entity().getEntity("AsDefinition", entity.id)
							})
							Promise.all(promises).then(result => {
								const options = result.map(genderOption => {
									return {
										presentation: genderOption.data.presentation,
										id: genderOption.data.id,
										abstract: genderOption.data.attributeValues.filter(item => {
											return item.name === "abstract"
										})[0].value
									}
								})
								resolve(options)
							})
						})
				})
			}
		}
	}

	/* Verso (Application Builder) */
	/**
	 * Retrieves an Application Builder API.
	 * @return {object} - The API
	 */
	versoRuntime() {
		return {
			/**
			 * Refreshes a given verso runtime
			 * @param {string} vrid - Runtime ID
			 * @return {object} - Response
			 */
			refresh: vrid => {
				return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/refresh`, {}, this.DEFAULTCONFIG)
			},

			/**
			 * Executes a calcualte in a given verso runtime.
			 * @param {string} vrid - Runtime ID
			 * @return {object} - Response
			 */
			calculate: vrid => {
				return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/calculate`, {}, this.DEFAULTCONFIG)
			},

			/**
			 * Clears selections in a given filter box in a given verso runtime.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			clear: (vrid, where) => {
				return axios.post(
					`${this.BASE_URL_API}application/runtime/${vrid}/select/clear${this._buildURIParams({
						where
					})}`,
					{},
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves values from a given verso runtime. Compatible with both expression variables, filter boxes and data sets.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			getValue: (vrid, where) => {
				return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/variable/value?key=${where}`, this.DEFAULTCONFIG)
			},

			/**
			 * Selects one entity in a given filterbox.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @param {string} what - Value to select
			 * @param {boolean} isClearFirst - Should box first be cleared?
			 * @return {object} - Response
			 */
			selectOne: (vrid, where, what, isClearFirst) => {
				return axios.post(
					`${this.BASE_URL_API}application/runtime/${vrid}/select/one${this._buildURIParams({
						where,
						what,
						clear: isClearFirst
					})}`,
					{},
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Selects Many entities in a given filterbox.
			 * @param {string} vrid - Runtime ID
			 * @param {string} selectionJSON - Array of values to be selected
			 * @return {object} - Response
			 */
			selectMany: (vrid, selectionJSON) => {
				return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/select/many`, selectionJSON, this.DEFAULTCONFIG)
			},

			/**
			 * Counts all entities in a given filterbox.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			countAll: (vrid, where) => {
				return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/items/count/all?where=${where}`, this.DEFAULTCONFIG)
			},

			/**
			 * Counts all selected entities in a given filterbox.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			countSelected: (vrid, where) => {
				return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/items/count/selected?where=${where}`, this.DEFAULTCONFIG)
			},

			/**
			 * Counts all explicitly selected entities in a given filterbox.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			countExplicit: (vrid, where) => {
				return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/items/count/explicit?where=${where}`, this.DEFAULTCONFIG)
			},

			/**
			 * Counts all implicitly selected entities in a given filterbox.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			countImplicit: (vrid, where) => {
				return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/items/count/implicit?where=${where}`, this.DEFAULTCONFIG)
			},

			/**
			 * Retrieves the built in Verso runtime API script.
			 * @param {string} vrid - Runtime ID
			 * @return {object} - Response
			 */
			getScript: vrid => {
				return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/script`, this.DEFAULTCONFIG)
			},

			/**
			 * Retrieves the tooltip text of a given component.
			 * @param {string} vrid - Runtime ID
			 * @param {string} componentID - Component name (Usually p(x))
			 * @param {string} row - Row where the tooltip should be found
			 * @param {string} column - Column where the tooltip should be found
			 * @return {object} - Response
			 */
			getTooltip: (vrid, componentID, row, column) => {
				return axios.get(
					`${this.BASE_URL_API}application/runtime/${vrid}/cell/tooltip${this._buildURIParams({
						componentID,
						row,
						column
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Evaluates a given expression inside of a given verso runtime.
			 * @param {string} vrid - Runtime ID
			 * @param {string} expression - Expression to be evaluated
			 * @return {object} - Response
			 */
			evaluateExpression: (vrid, expression) => {
				return axios.get(`${this.BASE_URL_API}application/runtime/${vrid}/evaluate?expression=${expression}`, this.DEFAULTCONFIG)
			},

			/**
			 * Sets a runtime variable inside of a given verso runtime.
			 * @param {string} vrid - Runtime ID
			 * @param {string} name - Name of variable
			 * @param {string} type - Data type of variable
			 * @param {string} element - Element
			 * @param {string} value - Value to be set
			 * @return {object} - Response
			 */
			setRuntimeVariable: (vrid, name, type, element, value) => {
				const payload = {
					name,
					type,
					element,
					value
				}
				return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/set/runtime/value`, payload, this.DEFAULTCONFIG)
			},

			/**
			 * Locks the selection in a given filterbox in a given verso runtime.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			lockSelection: (vrid, where) => {
				return axios.post(
					`${this.BASE_URL_API}application/runtime/${vrid}/lock/selection${this._buildURIParams({
						where
					})}`,
					{},
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Unlocks the selection in a given filterbox in a given verso runtime.
			 * @param {string} vrid - Runtime ID
			 * @param {string} where - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			unlockSelection: (vrid, where) => {
				return axios.post(
					`${this.BASE_URL_API}application/runtime/${vrid}/unlock/selection${this._buildURIParams({
						where
					})}`,
					{},
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Focuses a component in a given verso runtime. This can be used to programatically switch tabs.
			 * @param {string} vrid - Runtime ID
			 * @param {string} component - Component name (Usually p(x))
			 * @return {object} - Response
			 */
			focusComponent: (vrid, component) => {
				return axios.post(`${this.BASE_URL_API}application/runtime/${vrid}/component/focus/${component}`, {}, this.DEFAULTCONFIG)
			}
		}
	}

	/* Knowledge set */
	/**
	 * Retrieves a Knowledge Set API.
	 * @return {object} - The API
	 */
	knowledgeset() {
		return {
			/**
			 * Retrieves meta data for a given knowledge set.
			 * @param {string} uuid - UUID of the knowledge set
			 * @return {object} - Response
			 */
			getMetaData: uuid => {
				return axios.post(`${this.BASE_URL_API}knowledgeset/${uuid}?metadata=true&page=1&pagesize=0`, {}, this.DEFAULTCONFIG)
			},

			/**
			 * Executes a given knowledge set and retrieves the response in a flat format.
			 * @param {string} uuid - UUID of the knowledge set
			 * @param {boolean} isDistinct - Should rows be distinct?
			 * @param {number} page - What page do you want to retrieve?
			 * @param {number} pagesize - How many rows should be in one page?
			 * @param {object} parameters - Extra parameters for the knowledge set provided as an object literal
			 * @param {boolean} allowCache - Allow cached data?
			 * @return {object} - Response
			 */
			getResult: (uuid, isDistinct, page, pagesize, parameters, allowCache) => {
				const uriParams = {
					metadata: true,
					distinct: isDistinct,
					page,
					pagesize
				}
				return axios.post(
					`${this.BASE_URL_API}knowledgeset/${uuid}${allowCache ? "/cache/read" : ""}${this._buildURIParams(uriParams)}`,
					parameters !== undefined && parameters !== null ? { parameters } : {},
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Executes a free text search in a given knowledge set.
			 * @param {string} uuid - UUID of the knowledge set
			 * @param {string} text - Text string to search for
			 * @param {boolean} fuzzy - Is it a fuzzy search?
			 * @param {boolean} metaData - Include meta data?
			 * @param {boolean} compactLeafs - Should leafs be compact when searching?
			 * @param {boolean} allowCache - Allow cached data?
			 * @param {boolean} searchIDs - Should IDs be searched?
			 * @param {boolean} includedColumns - Columns of the knowledge set to be exclusively included
			 * @param {boolean} excludedColumns - Columns of th knowledge set to be exclusively excluded
			 * @return {object} - Response
			 */
			searchResult: (uuid, text, fuzzy, metaData, compactLeafs, allowCache, searchIDs, includedColumns, excludedColumns) => {
				const uriParams = {
					text,
					fuzzy,
					metadata: metaData,
					compactleafs: compactLeafs,
					allowCache,
					searchIDs,
					includedColumns,
					excludedColumns
				}
				return axios.get(`${this.BASE_URL_API}knowledgeset/${uuid}/tree/search/text${this._buildURIParams(uriParams)}`, this.DEFAULTCONFIG)
			},

			/**
			 * Executes a given knowledge set and retrieves the response in a tree format.
			 * @param {string} uuid - UUID of the knowledge set
			 * @param {boolean} metaData - Should meta data be included?
			 * @param {number} compactLeafs - Should leafs be made compact?
			 * @param {object} parameters - Extra parameters for the knowledge set provided as an object literal
			 * @param {boolean} allowCache - Allow cached data?
			 * @return {object} - Response
			 */
			getTreeResult: (uuid, metaData, compactLeafs, parameters, allowCache) => {
				const uriParams = {
					metadata: metaData,
					compactleafs: compactLeafs,
					allowCache
				}
				return axios.post(
					`${this.BASE_URL_API}knowledgeset/tree/${uuid}${this._buildURIParams(uriParams)}`,
					parameters !== undefined && parameters !== null ? { parameters } : {},
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Executes a free text search in a given knowledge set in tree format.
			 * @param {string} uuid - UUID of the knowledge set
			 * @param {string} text - Text string to search for
			 * @param {boolean} fuzzy - Is it a fuzzy search?
			 * @param {boolean} metaData - Include meta data?
			 * @param {boolean} compactLeafs - Should leafs be compact when searching?
			 * @param {boolean} allowCache - Allow cached data?
			 * @param {boolean} searchIDs - Should IDs be searched?
			 * @param {boolean} includedColumns - Columns of the knowledge set to be exclusively included
			 * @param {boolean} excludedColumns - Columns of th knowledge set to be exclusively excluded
			 * @return {object} - Response
			 */
			searchTreeResult: (uuid, text, fuzzy, metaData, compactLeafs, allowCache, searchIDs, includedColumns, excludedColumns) => {
				const uriParams = {
					text,
					fuzzy,
					metadata: metaData,
					compactleafs: compactLeafs,
					allowCache,
					searchIDs,
					includedColumns,
					excludedColumns
				}
				return axios.get(`${this.BASE_URL_API}knowledgeset/${uuid}/tree/search/text${this._buildURIParams(uriParams)}`, this.DEFAULTCONFIG)
			},

			/**
			 * Retrieves all knowledgesets found in Inorigo.
			 * @return {object} - Response
			 */
			getAvailable: () => {
				return axios.get(`${this.BASE_URL_API}knowledgeset/list`, this.DEFAULTCONFIG)
			},

			/**
			 * Executes a SQL query on top of a knowledge set result.
			 * @param {string} uuid - UUID of the knowledge set
			 * @param {string} query - SQL Query (MSSQL)
			 * @param {boolean} metaData - Include meta data?
			 * @param {string} context - Conext ID in Inorigo
			 * @param {object} parameters - Extra parameters for the knowledge set provided as an object literal
			 * @param {boolean} allowCache - Allow cached data?
			 * @return {object} - Response
			 */
			query: (uuid, query, metadata, context, parameters, allowCache) => {
				const uriParams = {
					sql: query,
					metadata,
					context,
					allowCache
				}
				return axios.post(
					`${this.BASE_URL_API}knowledgeset/${uuid}/query${this._buildURIParams(uriParams)}`,
					parameters !== undefined && parameters !== null ? { parameters } : {},
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Counts the rows inside of a knowledge set.
			 * @param {string} uuid - UUID of the knowledge set
			 * @param {boolean} isDistinct- Should the rows be distinct?
			 * @return {object} - Response
			 */
			countRows: (uuid, isDistinct) => {
				return axios.post(
					`${this.BASE_URL_API}knowledgeset/${uuid}/count${this._buildURIParams({
						distinct: isDistinct
					})}`,
					{},
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves all knowledge set scheduling information.
			 * @return {object} - Response
			 */
			getSchedulingStatus: () => {
				return axios.get(`${this.BASE_URL_API}knowledgeset/scheduling/status`, this.DEFAULTCONFIG)
			}
		}
	}

	/* Entity (Data Objects) */
	/**
	 * Retrieves an Entity API.
	 * @return {object} - The API
	 */
	entity() {
		return {
			/**
			 * Generates a number of valid Inorigo UUIDs that are not in use
			 * @param {number} count - How many IDs should be generated?
			 * @return {object} - Response
			 */
			generateUUID: count => {
				return axios.get(
					`${this.BASE_URL_API}entity/generateid${this._buildURIParams({
						count
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves an entity from Inorigo
			 * @param {string} entityType - Type of entity
			 * @param {string} uuid - ID of entity
			 * @return {object} - Response
			 */
			getEntity: (entityType, uuid) => {
				return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/`, this.DEFAULTCONFIG)
			},

			/**
			 * Retrieves all instances of a given definition entity
			 * @param {string} entityType - Type of defining entity
			 * @param {string} uuid - ID of defining entity
			 * @param {string} informationType - What type of information to include in the response.
			 * @param {number} page - What page to retrieve
			 * @param {number} pagesize - How large should the page size be?
			 * @return {object} - Response
			 */
			getinstances: (entityType, uuid, informationType, page, pagesize) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/instances${this._buildURIParams({
						info: informationType,
						page,
						pagesize
					})}`,
					this.DEFAULTCONFIG
				)
			},

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
			partners: (entityType, uuid, relationUuid, direction, isRecursive, isLeafsOnly, informationType, page, pagesize) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/partners${this._buildURIParams({
						relation: relationUuid,
						direction,
						recursive: isRecursive,
						leafsonly: isLeafsOnly,
						info: informationType,
						page,
						pagesize
					})}`,
					this.DEFAULTCONFIG
				)
			},

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
			getDefinitions: (entityType, uuid, isDeep, informationType, page, pagesize) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/definitions${this._buildURIParams({
						deep: isDeep,
						info: informationType,
						page,
						pagesize
					})}`,
					this.DEFAULTCONFIG
				)
			},

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
			getSuperClasses: (entityType, uuid, isDeep, informationType, page, pagesize) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/superclasses?deep=${this._buildURIParams({
						deep: isDeep,
						info: informationType,
						page,
						pagesize
					})}`,
					this.DEFAULTCONFIG
				)
			},

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
			getSubClasses: (entityType, uuid, isDeep, informationType, page, pagesize) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/subclasses${this._buildURIParams({
						deep: isDeep,
						info: informationType,
						page,
						pagesize
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Find all attribute references of an entity
			 * @param {string} entityType - Type of origin entity
			 * @param {string} uuid - ID of origin entity
			 * @param {number} page - What page to retrieve
			 * @param {number} pagesize - How large should the page size be?
			 * @return {object} - Response
			 */
			getReferents: (entityType, uuid, page, pagesize) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/referents${this._buildURIParams({
						page,
						pagesize
					})}`,
					this.DEFAULTCONFIG
				)
			},

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
			getRelations: (entityType, uuid, relationUuid, direction, page, pagesize) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/relations${this._buildURIParams({
						specifier: relationUuid,
						direction,
						page,
						pagesize
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Updates an entity
			 * @param {object} entityJSON - Entity DTO
			 * @return {object} - Response
			 */
			updateEntity: entityJSON => {
				return axios.put(`${this.BASE_URL_API}entity`, entityJSON, this.DEFAULTCONFIG)
			},

			/**
			 * Creates an entity
			 * @param {array} entityJSONArray - Array of entity DTOs
			 * @return {object} - Response
			 */
			createEntity: entityJSONArray => {
				return axios.post(`${this.BASE_URL_API}entity`, entityJSONArray, this.DEFAULTCONFIG)
			},

			/**
			 * Executes a transaction
			 * @param {object} transactionData - The transaction DTO
			 * @return {object} - Response
			 */
			transaction: transactionData => {
				return axios.post(`${this.BASE_URL_API}entity/commit/transaction`, transactionData, this.DEFAULTCONFIG)
			},

			/**
			 * Deletes an entity
			 * @param {string} entityType - Entity Type
			 * @param {string} uuid - Entity ID
			 * @return {object} - Response
			 */
			deleteEntity: (entityType, uuid) => {
				return axios.delete(`${this.BASE_URL_API}entity/${entityType}/${uuid}`, this.DEFAULTCONFIG)
			},

			/**
			 * Retrieves a simplified format of all instances of a given association definition
			 * @param {string} definitionUUID - Entity UUID
			 * @return {object} - Response
			 */
			getSimplifiedInstances: definitionUUID => {
				return axios.get(`${this.BASE_URL_API}entity/AsDefinition/${definitionUUID}/instances?info=values`, this.DEFAULTCONFIG).then(result => {
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
			},

			/**
			 * Retrieves a simplified format of an entity
			 * @param {string} entityType - Type of entity
			 * @param {string} uuid - ID of entity
			 * @return {object} - Response
			 */
			getSimplifiedEntity: (entityType, uuid) => {
				return axios.get(`${this.BASE_URL_API}entity/${entityType}/${uuid}/`, this.DEFAULTCONFIG).then(result => {
					const simplifiedResult = result.data.attributeValues.reduce((acc, attributeValue) => {
						acc[attributeValue.name] = attributeValue.value
						return acc
					}, {})
					simplifiedResult.type = entityType
					simplifiedResult.uuid = uuid
					simplifiedResult.presentation = result.data.presentation
					Promise.resolve(simplifiedResult)
				})
			},

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
			getGraphDependencies: (
				entityType,
				uuid,
				dependants = true,
				dependencies = true,
				values = true,
				references = true,
				relations = true,
				instances = true,
				presentations = true
			) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/dependencies/graph${this._buildURIParams({
						dependants,
						dependencies,
						values,
						references,
						relations,
						instances,
						presentations
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves all possible entity references of an entity
			 * @param {string} entityType - Type of entity
			 * @param {string} uuid - ID of entity
			 * @return {object} - Response
			 */
			getPossibleEntityReferences: (entityType, uuid) => {
				return axios.get(
					`${this.BASE_URL_API}entity/possible/references${this._buildURIParams({
						type: entityType,
						id: uuid
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves all possible instance references of an entity
			 * @param {string} entityType - Type of entity
			 * @param {string} uuid - ID of entity
			 * @return {object} - Response
			 */
			getPossibleInstanceReferences: (definitionType, uuid) => {
				return axios.get(
					`${this.BASE_URL_API}entity/possible/instance/references${this._buildURIParams({
						type: definitionType,
						id: uuid
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves the presentation string of an entity
			 * @param {string} entityType - Type of entity
			 * @param {string} uuid - ID of entity
			 * @param {string} povAttributeID - Optional ID for contextual alias
			 * @return {object} - Response
			 */
			getPresentation: (entityType, uuid, povAttributeID) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/presentation${this._buildURIParams({
						povAttributeID
					})}`,
					this.DEFAULTCONFIG
				)
			},

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
			getDependencyEdges: (
				entityType,
				uuid,
				dependants = true,
				dependencies = true,
				values = true,
				references = true,
				relations = true,
				instances = true,
				presentations = true
			) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/dependencies/edges${this._buildURIParams({
						dependants,
						dependencies,
						values,
						references,
						relations,
						instances,
						presentations
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves the icon of an entity
			 * @param {string} entityType - Type of entity
			 * @param {string} uuid - ID of entity
			 * @param {number} size - Size of the icon
			 * @param {string} contextID - ID of the context where the icon is stored
			 * @return {object} - Response
			 */
			getEntityIcon: (entityType, uuid, size, contextID) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/icon${this._buildURIParams({
						size,
						contextID
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves the ID of the icon of an entity
			 * @param {string} entityType - Type of entity
			 * @param {string} uuid - ID of entity
			 * @param {string} contextID - ID of the context where the icon is stored
			 * @return {object} - Response
			 */
			getEntityIconID: (entityType, uuid, contextID) => {
				return axios.get(
					`${this.BASE_URL_API}entity/${entityType}/${uuid}/icon/id${this._buildURIParams({
						contextID
					})}`,
					this.DEFAULTCONFIG
				)
			},

			/**
			 * Retrieves a value set by ID
			 * @param {string} uuid - ID of value set
			 * @return {object} - Response
			 */
			getValueset: uuid => {
				return axios.get(`${this.BASE_URL_API}entity/valueset/${uuid}`, this.DEFAULTCONFIG)
			},

			/**
			 * Retrieves presentation of multiple entities simultaneously
			 * @param {array} entityArray - Array of entity IDs
			 * @return {object} - Response
			 */
			getPresentations: entityArray => {
				return axios.post(`${this.BASE_URL_API}entity/presentations/`, entityArray, this.DEFAULTCONFIG)
			}
		}
	}

	/* Resource (Files) */
	/**
	 * Retrieves a resource (file) API.
	 * @return {object} - The API
	 */
	resource() {
		return {
			/**
			 * Retrieves a resource from inorigo
			 * @param {string} uuid - ID of the resource
			 * @return {object} - Response
			 */
			getResource: uuid => {
				return axios.get(`${this.BASE_URL_API}resource/resource/${uuid}/`, this.DEFAULTCONFIG)
			},

			/**
			 * Deletes a resource from inorigo
			 * @param {string} uuid - ID of the resource
			 * @return {object} - Response
			 */
			deleteResource: uuid => {
				return axios.delete(`${this.BASE_URL_API}resource/resource/${uuid}`, this.DEFAULTCONFIG)
			},

			/**
			 * Creates an array of resources in inorigo
			 * @param {array} resourceJSONArray - array of resource DTOs
			 * @return {object} - Response
			 */
			createResource: resourceJSONArray => {
				return axios.post(`${this.BASE_URL_API}resource/resource`, resourceJSONArray, this.DEFAULTCONFIG)
			},

			/**
			 * Updates an array of resources from inorigo
			 * @param {array} resourceJSONArray - array of resource DTOs
			 * @return {object} - Response
			 */
			updateResource: resourceJSONArray => {
				return axios.put(`${this.BASE_URL_API}resource/resource`, resourceJSONArray, this.DEFAULTCONFIG)
			}
		}
	}

	/* Legacy Endpoints (some of which are undocumented!) */
	/**
	 * Retrieves a legacy API.
	 * @return {object} - The API
	 */
	legacy() {
		return {
			/**
			 * Executes a method in Inorigo
			 * @param {string} uuid - ID of the method
			 * @param {string} contextID - Context where the method exists
			 * @param {boolean} commit - Should changes be committed?
			 * @param {array} inputArray - Array of inputs for the method
			 * @return {object} - Response
			 */
			executeMethod: (uuid, contextID, commit, inputArray) => {
				const inputString = inputArray.reduce((acc, item) => {
					acc += `&input=${item}`
					return acc
				}, "")
				return axios.get(`${this.BASE_URL}services/authorized/${contextID}/execute/method/${uuid}?commit=${commit}${inputString}`, this.DEFAULTCONFIG)
			},

			/**
			 * Executes a change in Inorigo
			 * @param {string} uuid - ID of the change
			 * @param {string} contextID - Context where the change exists
			 * @param {boolean} commit - Should changes be committed?
			 * @param {array} inputArray - Array of inputs for the change
			 * @return {object} - Response
			 */
			executeChange: (uuid, contextID, commit, inputArray) => {
				const inputString = inputArray.reduce((acc, item) => {
					acc += `&input=${item}`
					return acc
				}, "")
				return axios.get(`${this.BASE_URL}services/authorized/${contextID}/execute/change/${uuid}?commit=${commit}${inputString}`, this.DEFAULTCONFIG)
			}
		}
	}

	/* Utility Functions */

	_buildURIParams(object) {
		let returnString = ""
		//Stringify removes the undefined values
		let tempObj = JSON.stringify(object)
		if (tempObj !== JSON.stringify({})) {
			returnString = "?"
		}
		tempObj = JSON.parse(tempObj)
		return (
			returnString +
			Object.keys(tempObj)
				.map(key => {
					if (Array.isArray(tempObj[key])) {
						let uriShard = ""
						tempObj[key].forEach(value => {
							uriShard = `${uriShard}&${key}=${value}`
						})
						return encodeURIComponent(uriShard.substr(1))
					}
					return [key, "" + tempObj[key]].map(encodeURIComponent).join("=")
				})
				.join("&")
		)
	}

	_genericBtoA(b) {
		if (typeof process === "object" && Object.prototype.toString.call(process) === "[object process]") {
			//If running in node, use Buffer
			return Buffer.from(b).toString("base64")
		} else {
			//If running in browser, use btoa()
			return btoa(b)
		}
	}
}
