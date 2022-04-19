import axios from "axios"

/*
 * Resource API class.
 * This class contains APIs for doing CRUD operations on resources (files) in Inorigo.
 */
export class ResourceAPI {
	/**
	 * Resource API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Retrieves a resource from inorigo
	 * @param {string} uuid - ID of the resource
	 * @return {object} - Response
	 */
	getResource(uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}resource/resource/${uuid}/`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Deletes a resource from inorigo
	 * @param {string} uuid - ID of the resource
	 * @return {object} - Response
	 */
	deleteResource(uuid) {
		return axios.delete(`${this.parentAPI.BASE_URL_API}resource/resource/${uuid}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Creates an array of resources in inorigo
	 * @param {boolean} ignorewarnings - Ignore Warnings
	 * @param { Array<{ id: string, dataType: string, presentation: string, fromTime: string, toTime: string, iconUrl: string, name: string, type: string, extension: string, size: string, data: string }> } requestBody - Request Payload (array)
	 * @return {object} - Response
	 */
	createResource(ignorewarnings, requestBody) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}resource/resource${this.parentAPI._buildURIParams({ ignorewarnings })}`,
			requestBody,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Updates an array of resources from inorigo
	 * @param {boolean} ignorewarnings - Ignore Warnings
	 * @param { Array<{ id: string, dataType: string, presentation: string, fromTime: string, toTime: string, iconUrl: string, name: string, type: string, extension: string, size: string, data: {string} }> } requestBody - Request Payload (array)
	 * @return {object} - Response
	 */
	updateResource(ignorewarnings, requestBody) {
		return axios.put(
			`${this.parentAPI.BASE_URL_API}resource/resource${this.parentAPI._buildURIParams({ ignorewarnings })}`,
			requestBody,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Get the data of the resource
	 * @param {string} key - The id or name of the resource.
	 * @param {boolean} attachment - Optional parameter used to set the disposition of the response to attachement (file). Default is false.
	 * @returns {object}
	 */
	getResourceData(key, attachment = false) {
		return axios.get(`${this.parentAPI.BASE_URL_API}resource/data/${key}${this.parentAPI._buildURIParams({ attachment })}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Is image to be inverted on dark backgrounds?
	 * @param {string} key - The id or name of the resource.
	 * @returns {boolean} - true | false
	 */
	getInvertOnDark(key) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers["Accept"] = "text/plain"
		return axios.get(`${this.parentAPI.BASE_URL_API}resource/invert/on/dark/${key}`, customConfig)
	}

	/**
	 * set image to be inverted on dark backgrounds or not
	 * @param {string} key
	 * @param {boolean} invert
	 * @returns {boolean} - true | false
	 */
	setInvertOnDark(key, invert) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers["Accept"] = "text/plain"
		return axios.post(`${this.parentAPI.BASE_URL_API}resource/invert/on/dark/${key}?invert=${invert}`, {}, customConfig)
	}
}
