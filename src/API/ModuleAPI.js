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
	 * @param {{ requesterID: string, resourceDataType: string, resourceID: string }} requestBody - Request Payload
	 * @returns
	 */
	deleteDependency(requestBody) {
		return axios.delete(`${this.parentAPI.BASE_URL_API}module/dependency`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Delete operation that marks a module for removal. Note that the module is not removed until a system administrator appproves the request
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
	listModules(enabled) {
		const uriParams = {
			enabled
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}module${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Register that a requester is depnding on some resource
	 * @param {{ requesterID: string, resourceDataType: string, resourceID: string }} requestBody - Request Payload
	 * @returns {object} - Response
	 */
	registerDependency(requestBody) {
		return axios.post(`${this.parentAPI.BASE_URL_API}module/dependency`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Submits a request that an external module is to be added to the system.
	 * Note that the module is not enabled until the request is approved by a system administrator
	 * @param {{ name: string, description: string, externalAddress: string, iconData: string, mimeType: string, integrations: [{string}], dataTypes: [{string}], variants: [{string}] }} requestBody - Request Payload
	 * @returns {object} - Response
	 */
	registerModule(requestBody) {
		return axios.post(`${this.parentAPI.BASE_URL_API}module`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 *
	 * @param {string} id - Module id
	 * @returns {object} - Response
	 */
	isModuleActive(id) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers["Accept"] = "*/*"
		return axios.get(`${this.parentAPI.BASE_URL_API}module/active/${id}`, customConfig)
	}

	/**
	 * Get module states for an application component.
	 * @param {object} requestBody - Payload
	 * @returns {object} - Response
	 */
	getModuleModifiers(requestBody) {
		return axios.post(`${this.parentAPI.BASE_URL_API}module/application/component/modifiers`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get one Module
	 * @param {string} id - Module uuid
	 * @returns {object} - Response
	 */
	getModule(id) {
		return axios.get(`${this.parentAPI.BASE_URL_API}module/${id}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get Module State
	 * @param {string} id - Module uuid
	 * @returns {object} - Response
	 */
	getModuleState(id) {
		return axios.get(`${this.parentAPI.BASE_URL_API}module/state/${id}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get all module states.
	 */
	getAllModuleStates() {
		return axios.get(`${this.parentAPI.BASE_URL_API}module/states`, this.parentAPI.DEFAULTCONFIG)
	}
}
