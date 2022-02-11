import axios from "axios"

/*
 * Favorite API class.
 * This class contains APIs for doing CRUD operations on favorties.
 */
export class FavoriteAPI {
	/**
	 * Favorite API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Delete a user favorite
	 * @param {string} uuid - The uuid of the user favorite to delete
	 * @returns {object} - Response
	 */
	deleteFavorite(uuid) {
		return axios.delete(`${this.parentAPI.BASE_URL_API}favorite/${uuid}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * List a users favorites - a list with all favorites
	 * @param {string} targetType - Optional filter parameter. Return only favorites targeting the specified type
	 * @returns {object} - Response
	 */
	getFavorites(targetType) {
		const uriParams = {
			targetType
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}favorite${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get a user favorite object
	 * @param {string} uuid - The uuid of the user favorite to get
	 * @returns {object} - Response
	 */
	getFavorite(uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}favorite/${uuid}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Create a user favorite for id and data type of the entity
	 * @param {string} uuid
	 * @param {string} datatype
	 * @returns
	 */
	createFavorite(uuid, datatype) {
		const requestBody = {
			id: uuid,
			dataType: datatype
		}
		return axios.post(`${this.parentAPI.BASE_URL_API}favorite`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}
}
