import axios from "axios"

/*
 * Module API class.
 * This class contains APIs for doing operations on Module objects in Inorigo.
 */
export class ModuleAPI {
	/**
	 * Module API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Remove a registered dependency from the specified requester
	 * @param {*} requestBody
	 * @returns
	 */
	deleteDependency(requestBody) {
		return axios.delete(`${this.parentAPI.BASE_URL_API}module/dependency`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Delete operation that marks a module for removlal. Note that the module is not removed until a system administrator appproves the request
	 * @param {string} uuid
	 * @returns {object} - Response
	 */
	deleteModule(uuid) {
		return axios.delete(`${this.parentAPI.BASE_URL_API}module/${uuid}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * List the available modules
	 * @param {boolean} enabled
	 * @returns {object} - Response
	 */
	getModule(enabled) {
		return axios.get(`${this.parentAPI.BASE_URL_API}module`, { enabled }, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Register that a requester is depnding on some resource
	 * @param {object} requestBody - Example: {"requesterID": "string", "resourceDataType": "string", "resourceID": "string"}
	 * @returns {object} - Response
	 */
	registerDependency(requestBody) {
		return axios.post(`${this.parentAPI.BASE_URL_API}module/dependency`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Submits a request that an external module is to be added to the system.
	 * Note that the module is not enabled until the request is approved by a system administrator
	 * @param {*} requestBody
	 * @returns {object} - Response
	 */
	registerModule(requestBody) {
		return axios.post(`${this.parentAPI.BASE_URL_API}module`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}
}
