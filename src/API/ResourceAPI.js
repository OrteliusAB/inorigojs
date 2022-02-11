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
	 * @param {array} resourceJSONArray - array of resource DTOs
	 * @return {object} - Response
	 */
	createResource(resourceJSONArray) {
		return axios.post(`${this.parentAPI.BASE_URL_API}resource/resource`, resourceJSONArray, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Updates an array of resources from inorigo
	 * @param {array} resourceJSONArray - array of resource DTOs
	 * @return {object} - Response
	 */
	updateResource(resourceJSONArray) {
		return axios.put(`${this.parentAPI.BASE_URL_API}resource/resource`, resourceJSONArray, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the data of the resource
	 * @param {string} key - The id or name of the resource.
	 * @param {boolean} attachment - Optional parameter used to set the disposition of the response to attachement (file). Default is false.
	 * @returns
	 */
	getResourceData(key, attachment = false) {
		return axios.get(`${this.parentAPI.BASE_URL_API}resource/data/${key}${this.parentAPI._buildURIParams({ attachment })}`, this.parentAPI.DEFAULTCONFIG)
	}
}
