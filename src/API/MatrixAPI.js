import axios from "axios"

/*
 * Matrix API class.
 * This class contains APIs for doing operations on Matrix objects in Inorigo.
 */
export class MatrixAPI {
	/**
	 * Matrix API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
		this.baseURL = this.parentAPI.BASE_URL + "services/api/"
	}

	/**
	 * Get Meta and Data for an Application Component
	 * @param {string} runtimeid - Runtime ID (uuid)
	 * @param {string} componentid - Component ID (uuid)
	 * @param {string} selection - Selection. (optional, default = All) options: "All", "Selected", "Implicit", "Explicit"
	 * @returns
	 */
	getMetaAndDataForApplicationComponent(runtimeid, componentid, selection) {
		const uriParams = {
			selection
		}
		return axios.get(
			`${this.baseURL}matrix/meta/and/data/for/application/component/${runtimeid}/${componentid}${this.parentAPI._buildURIParams(uriParams)}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Get Meta and Data for a definition and its subclasses
	 * @param {string} definitiontype - Definition Type
	 * @param {string} definitionuuid - Definition ID
	 * @param {boolean} subclasses - Include subclasses. (optional, default = true)
	 * @returns
	 */
	getMetaAndDataForDefinition(definitiontype, definitionuuid, subclasses) {
		const uriParams = {
			subclasses
		}
		return axios.get(
			`${this.baseURL}matrix/meta/and/data/for/definition/${definitiontype}/${definitionuuid}${this.parentAPI._buildURIParams(uriParams)}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Get Meta for an Application Component
	 * @param {string} runtimeid - Application or Runtime ID
	 * @param {string} componentid - Component ID
	 * @returns
	 */
	getMetaForApplicationComponent(applicationid, componentid) {
		return axios.get(`${this.baseURL}matrix/meta/for/application/component/${applicationid}/${componentid}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get Meta for a definition and its subclasses
	 * @param {string} definitiontype - Definition Type
	 * @param {string} definitionuuid - Definition ID
	 * @param {boolean} subclasses - Include subclasses. (optional, default = true)
	 * @returns
	 */
	getMetaForDefinition(definitiontype, definitionuuid, subclasses) {
		return axios.get(
			`${this.baseURL}matrix/meta/for/definition/${definitiontype}/${definitionuuid}${this.parentAPI._buildURIParams({ subclasses })}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Get Data for a request
	 * @param {object} requestBody - Request body: application/json
	 * @returns
	 */
	getDataForRequest(requestBody) {
		return axios.post(`${this.baseURL}matrix/data/for/request`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get Meta for a filter
	 * @param {{dataType: string, sourceID: {uuid: string, type: string}, operator: string, parameters: Array<{id: string, dataType: string, name: string}>}} requestBody Request body: application/json
	 * @returns
	 */
	getMetaForFilter(requestBody) {
		return axios.post(`${this.baseURL}matrix/meta/for/filter`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Populate matrix data
	 * @param {object} requestBody Request body: application/json
	 * @returns
	 */
	populate(requestBody) {
		return axios.post(`${this.baseURL}matrix/populate`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Commit matrix data
	 * @param {object} requestBody Request body: application/json
	 * @returns
	 */
	commit(requestBody) {
		return axios.post(`${this.baseURL}matrix/commit`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Attribute Options Count
	 * @param {object} requestBody Request body: application/json
	 * @returns
	 */
	attributeOptionsCount(requestBody) {
		return axios.post(`${this.baseURL}matrix/attribute/options/count`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Attribute Options List
	 * @param {object} requestBody Request body: application/json
	 * @returns
	 */
	attributeOptionsList(requestBody) {
		return axios.post(`${this.baseURL}matrix/attribute/options/list`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Attribute Parse Values
	 * @param {object} requestBody Request body: application/json
	 * @returns
	 */
	attributeParseValues(requestBody) {
		return axios.post(`${this.baseURL}matrix/attribute/parse/values`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Validate a resource
	 * @param {object} requestBody Request body: application/json
	 */
	resourceValidate(requestBody) {
		return axios.post(`${this.baseURL}matrix/resource/validate`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get meta data for attribute recipe
	 * @param {object} requestBody Request body: application/json
	 */
	attributeRecipe(requestBody) {
		return axios.post(`${this.baseURL}matrix/attribute/recipe`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/** Download a resource (link) */
	downloadResource(resourceId) {
		return axios.get(`${this.baseURL}matrix/resource/download/${resourceId}`, this.parentAPI.DEFAULTCONFIG)
	}

	/** Get the bytes of a resource */
	getResource(resourceId) {
		return axios.get(`${this.baseURL}matrix/resource/get/${resourceId}`, this.parentAPI.DEFAULTCONFIG)
	}
}
