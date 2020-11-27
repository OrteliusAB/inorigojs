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
}
