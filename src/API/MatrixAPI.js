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
	 * @param {string} applicationid - Application ID
	 * @param {string} componentid - Component ID
	 * @param {string} selection - Selection. (optional, default = All) options: "All", "Selected", "Implicit", "Explicit"
	 * @returns
	 */
	getMetaAndDataForApplicationComponent(applicationid, componentid, selection) {
		const uriParams = {
			selection
		}
		return axios.get(
			`${this.baseURL}matrix/meta/and/data/for/application/component/${applicationid}/${componentid}${this.parentAPI._buildURIParams(uriParams)}`,
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
	 * @param {string} applicationid - Application or Runtime ID
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
	 * Get Data for one Matrix Row
	 * @param {object} requestBody - Request body: application/json
	 * @returns
	 */
	getDataForRow(requestBody) {
		return axios.post(`${this.baseURL}matrix/data/for/row`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get Meta for a filter
	 * @param {object} requestBody Request body: application/json
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
}
