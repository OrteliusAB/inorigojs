import axios from "axios"

/*
 * Legacy API class.
 * This class contains APIs for the legacy web API.
 */
export class LegacyAPI {
	/**
	 * Legacy API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Executes a method in Inorigo
	 * @param {string} uuid - ID of the method
	 * @param {string} contextID - Context where the method exists
	 * @param {boolean} commit - Should changes be committed?
	 * @param {array} inputArray - Array of inputs for the method
	 * @return {object} - Response
	 */
	executeMethod(uuid, contextID, commit, inputArray) {
		const inputString = inputArray.reduce((acc, item) => {
			acc += `&input=${item}`
			return acc
		}, "")
		return axios.get(
			`${this.parentAPI.BASE_URL}services/authorized/${contextID}/execute/method/${uuid}?commit=${commit}${inputString}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Executes a change in Inorigo
	 * @param {string} uuid - ID of the change
	 * @param {string} contextID - Context where the change exists
	 * @param {boolean} commit - Should changes be committed?
	 * @param {array} inputArray - Array of inputs for the change
	 * @return {object} - Response
	 */
	executeChange(uuid, contextID, commit, inputArray) {
		const inputString = inputArray.reduce((acc, item) => {
			acc += `&input=${item}`
			return acc
		}, "")
		return axios.get(
			`${this.parentAPI.BASE_URL}services/authorized/${contextID}/execute/change/${uuid}?commit=${commit}${inputString}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}
}
