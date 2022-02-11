import axios from "axios"

/*
 * Knowledge Set API class.
 * This class contains APIs for interacting with knowledge sets.
 */
export class KnowledgeSetAPI {
	/**
	 * Knowledge Set API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Retrieves meta data for a given knowledge set.
	 * @param {string} uuid - UUID of the knowledge set
	 * @return {object} - Response
	 */
	getMetaData(uuid) {
		return axios.post(`${this.parentAPI.BASE_URL_API}knowledgeset/${uuid}?metadata=true&page=1&pagesize=0`, {}, this.parentAPI.DEFAULTCONFIG)
	}

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
	getResult(uuid, isDistinct, page, pagesize, parameters, allowCache) {
		const uriParams = {
			metadata: true,
			distinct: isDistinct,
			page,
			pagesize
		}
		return axios.post(
			`${this.parentAPI.BASE_URL_API}knowledgeset/${uuid}${allowCache ? "/cache/read" : ""}${this.parentAPI._buildURIParams(uriParams)}`,
			parameters !== undefined && parameters !== null ? { parameters } : {},
			this.parentAPI.DEFAULTCONFIG
		)
	}

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
	searchResult(uuid, text, fuzzy, metaData, compactLeafs, allowCache, searchIDs, includedColumns, excludedColumns) {
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
		return axios.get(
			`${this.parentAPI.BASE_URL_API}knowledgeset/${uuid}/tree/search/text${this.parentAPI._buildURIParams(uriParams)}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Executes a given knowledge set and retrieves the response in a tree format.
	 * @param {string} uuid - UUID of the knowledge set
	 * @param {boolean} metaData - Should meta data be included?
	 * @param {number} compactLeafs - Should leafs be made compact?
	 * @param {object} parameters - Extra parameters for the knowledge set provided as an object literal
	 * @param {boolean} allowCache - Allow cached data?
	 * @return {object} - Response
	 */
	getTreeResult(uuid, metaData, compactLeafs, parameters, allowCache) {
		const uriParams = {
			metadata: metaData,
			compactleafs: compactLeafs,
			allowCache
		}
		return axios.post(
			`${this.parentAPI.BASE_URL_API}knowledgeset/tree/${uuid}${this.parentAPI._buildURIParams(uriParams)}`,
			parameters !== undefined && parameters !== null ? { parameters } : {},
			this.parentAPI.DEFAULTCONFIG
		)
	}

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
	searchTreeResult(uuid, text, fuzzy, metaData, compactLeafs, allowCache, searchIDs, includedColumns, excludedColumns) {
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
		return axios.get(
			`${this.parentAPI.BASE_URL_API}knowledgeset/${uuid}/tree/search/text${this.parentAPI._buildURIParams(uriParams)}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Get the definition of specified knowledgeset
	 * @param {string} uuid
	 * @returns {object} - Response
	 */
	getDefinition(uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}knowledgeset/${uuid}/definition`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves all knowledgesets found in Inorigo.
	 * @return {object} - Response
	 */
	getAvailable() {
		return axios.get(`${this.parentAPI.BASE_URL_API}knowledgeset/list`, this.parentAPI.DEFAULTCONFIG)
	}

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
	query(uuid, query, metadata, context, parameters, allowCache) {
		const uriParams = {
			sql: query,
			metadata,
			context,
			allowCache
		}
		return axios.post(
			`${this.parentAPI.BASE_URL_API}knowledgeset/${uuid}/query${this.parentAPI._buildURIParams(uriParams)}`,
			parameters !== undefined && parameters !== null ? { parameters } : {},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Counts the rows inside of a knowledge set.
	 * @param {string} uuid - UUID of the knowledge set
	 * @param {boolean} isDistinct- Should the rows be distinct?
	 * @return {object} - Response
	 */
	countRows(uuid, isDistinct) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}knowledgeset/${uuid}/count${this.parentAPI._buildURIParams({
				distinct: isDistinct
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves all knowledge set scheduling information.
	 * @return {object} - Response
	 */
	getSchedulingStatus() {
		return axios.get(`${this.parentAPI.BASE_URL_API}knowledgeset/scheduling/status`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Export knowledgeset to a file, as .CSV or Excel format, filename will be same as knowledgeset name.
	 * @param {string} uuid
	 * @param {boolean} metaData
	 * @param {string} context
	 * @param {boolean} isDistinct
	 * @param {number} page
	 * @param {number} pagesize
	 * @param {boolean} compactpaths
	 * @param {boolean} allowCache
	 * @param {boolean} replaceidbypresentation
	 * @param {boolean} excelFormat
	 * @returns {object} - Response
	 */
	exportToFile(uuid, metaData, context, isDistinct, page, pagesize, compactpaths, allowCache, replaceidbypresentation, excelFormat = false) {
		const uriParams = {
			metadata: metaData,
			context,
			distinct: isDistinct,
			page,
			pagesize,
			compactpaths,
			allowCache,
			replaceidbypresentation
		}
		// default text/csv
		this.parentAPI.setDefaultRequestHeader("Accept", "text/csv")
		if (excelFormat) {
			this.parentAPI.setDefaultRequestHeader("Accept", "application/vnd.ms-excel")
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}knowledgeset/file/${uuid}${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Execute a Knowledge Set. Result as Json Objects.
	 * @param {string} uuid
	 * @param {boolean} metaData
	 * @param {string} context
	 * @param {boolean} isDistinct
	 * @param {number} page
	 * @param {number} pagesize
	 * @param {boolean} compactpaths
	 * @param {boolean} allowCache
	 * @param {boolean} replaceidbypresentation
	 * @returns {object} - Response
	 */
	getResultAsObjects(uuid, metaData, context, isDistinct, page, pagesize, compactpaths, allowCache, replaceidbypresentation) {
		const uriParams = {
			metadata: metaData,
			context,
			distinct: isDistinct,
			page,
			pagesize,
			compactpaths,
			allowCache,
			replaceidbypresentation
		}
		return axios.post(
			`${this.parentAPI.BASE_URL_API}knowledgeset/objects/${uuid}${this.parentAPI._buildURIParams(uriParams)}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Search Knowledge Set for text occurrences. Result as Json Objects.
	 * @param {string} uuid - The uuid of the Knowledge Set to search
	 * @param {string} text - The text to search for
	 * @param {boolean} fuzzy - Optional parameter. Enable Fuzzy Pattern Match? Default is false.
	 * @param {boolean} metaData - Optional boolean parameter. If true, the response will include metadata about the Knowledge Set
	 * @param {number} page - The page index
	 * @param {number} pagesize - Number of items per page
	 * @param {boolean} compactpaths - Compact Paths
	 * @param {boolean} allowCache - Optional parameter. Allow data to be read from cache?
	 * @param {boolean} searchIDs - Optional parameter. Should ID columns be searched?
	 * @param {Array} includedColumns - Optional parameter. Columns to be included in search
	 * @param {Array} excludedColumns - Optional parameter. Columns to be excluded from search
	 * @param {boolean} replaceidbypresentation - Optional parameter. Replace all ids by presentations?
	 * @returns
	 */
	searchResultAsObjects(
		uuid,
		text,
		fuzzy,
		metaData,
		page,
		pagesize,
		compactpaths,
		allowCache,
		searchIDs,
		includedColumns,
		excludedColumns,
		replaceidbypresentation
	) {
		const uriParams = {
			text,
			fuzzy,
			metadata: metaData,
			page,
			pagesize,
			compactpaths,
			allowCache,
			searchIDs,
			includedColumns,
			excludedColumns,
			replaceidbypresentation
		}
		return axios.get(
			`${this.parentAPI.BASE_URL_API}knowledgeset/${uuid}/objects/search/text${this.parentAPI._buildURIParams(uriParams)}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}
}
