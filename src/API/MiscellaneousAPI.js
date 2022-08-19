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
	excecute(requestBody) {
		return axios.post(`${this.parentAPI.BASE_URL_API}excecute`, requestBody, this.parentAPI.DEFAULTCONFIG)
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
		const uriParams = {
			contextID,
			filter
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}dynamic/image/${key}${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the general icon for a relation direction
	 * @param {*} dirction - direction: [DOWN || UP]
	 * @returns {object} - Response
	 */
	getRelationDirectionIcon(direction) {
		const uriParams = {
			direction
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}dynamic/image${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the icon for a identified relation
	 * @param {string} direction - Relation Direction
	 * @param {string} relationType - Relation Type
	 * @param {string} relationID - Relation ID
	 * @returns {object} - Response
	 */
	getRelationIcon(direction, relationType, relationID) {
		const uriParams = {
			direction,
			relationType,
			relationID
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}dynamic/id/icon${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}
}
