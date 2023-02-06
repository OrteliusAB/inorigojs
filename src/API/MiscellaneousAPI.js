import axios from "axios"

/*
 * Miscellaneous API class.
 * This class contains APIs for doing operations on miscellaneous objects in Inorigo.
 */
export class MiscellaneousAPI {
	/**
	 * Miscellaneous API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Get info on the currently logged in user
	 * @returns {object} - Response
	 */
	getUser() {
		return axios.get(`${this.parentAPI.BASE_URL_API}user`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Trigger an execution of a Method, Class or Function
	 * @param {{ target: string, commit: boolean, dataContextID: string, arguments: [{}]} } requestBody - Request Payload
	 * @returns {object} - Response
	 */
	execute(requestBody) {
		return axios.post(`${this.parentAPI.BASE_URL_API}execute`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Register an activity to the user activity log
	 * @param {{ activityID: number, activity: string, eventType: string, userID: string, targetID: { id: "string", dataType: string }, details: string }} requestBody - Request Payload
	 * @returns {object} - Response
	 */
	registerActivity(requestBody) {
		return axios.post(`${this.parentAPI.BASE_URL_API}activity`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get a dynamic image. The filter parameter allows the image to be processed with the specified filter before it is returned
	 * @param {string} key
	 * @param {string} contextID - ContextId as a uuid.
	 * @param {string} filter
	 * @returns {object} - Response
	 */
	getDynamicImage(key, contextID, filter) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "image/*"
		customConfig.headers["Content-Type"] = ""

		const uriParams = {
			contextID,
			filter
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}dynamic/image/${key}${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
	}

	/**
	 * Get the general icon for a relation direction
	 * @param {*} dirction - direction: [DOWN || UP]
	 * @returns {object} - Response
	 */
	getRelationDirectionIcon(direction) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "image/*"
		customConfig.headers["Content-Type"] = ""

		const uriParams = {
			direction
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}relation/direction/icon${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
	}

	/**
	 * Get the icon for a identified relation
	 * @param {string} direction - Relation Direction
	 * @param {string} relationType - Relation Type
	 * @param {string} relationID - Relation ID
	 * @returns {object} - Response
	 */
	getRelationIcon(direction, relationType, relationID) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "image/*"
		customConfig.headers["Content-Type"] = ""

		const uriParams = {
			direction,
			relationType,
			relationID
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}relation/id/icon${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
	}

	/**
	 * Get the icon for a relation specifier
	 * @param {string} direction - Relation direction
	 * @param {string} specifier - Relation specifier (ID or name of an UnRel)
	 * @returns {object}
	 */
	getRelationSpecifierIcon(direction, specifier) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "image/*"
		customConfig.headers["Content-Type"] = ""

		const uriParams = {
			direction,
			specifier
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}relation/specifier/icon${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
	}

	/**
	 * Get a static image
	 * @param {string} key - Key (image name)
	 * @param {string} filter - Optional filter name
	 * @returns {object}
	 */
	getStaticImage(key, filter) {
		const uriParams = {
			filter
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}static/image/${key}${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}
}
