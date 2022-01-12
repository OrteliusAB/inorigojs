import axios from "axios"

/*
 * Data Object class.
 * This class contains APIs for doing CRUD operations on inorigo data object.
 */
export class DataObjectAPI {
	/**
	 * Data Object API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Lists data objects by type (optional)
	 * @param {string} type - type of the objects to get
	 * @return {object} - Response
	 */
	listDataObjects(type) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}dataobject${this.parentAPI._buildURIParams({
				type
			})}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Gets a data object by ID
	 * @param {string} id - ID of data object to get
	 * @return {object} - Response
	 */
	getDataObject(id) {
		return axios.get(`${this.parentAPI.BASE_URL_API}dataobject/${id}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Gets several data objects by type (optional)
	 * @param {string} type - type of the objects to get
	 * @return {object} - Response
	 */
	async getDataObjects(type) {
		const list = await this.listDataObjects(type)
		if (list.data.dataobjects.length === 0) {
			return []
		}
		const promises = list.data.dataobjects.map(dataObject => this.getDataObject(dataObject.id))
		const results = (await Promise.all(promises)).map(dataObject => dataObject.data)
		return results
	}

	/**
	 * Gets a data variant by ID
	 * @param {string} id - ID of data variant to get
	 * @return {object} - Response
	 */
	getDataVariant(id) {
		return axios.get(`${this.parentAPI.BASE_URL_API}dataobject/variant/${id}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Lists all data variants in inorigo
	 * @return {object} - Response
	 */
	listDataVariants() {
		return axios.get(`${this.parentAPI.BASE_URL_API}dataobject/variant`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Creates a data object
	 * @param {string} id - UUID (optional)
	 * @param {string} type - Type of data object
	 * @param {string} name - Name for the data object
	 * @param {string} mimeType - Mime type for the data object data property
	 * @param {any} data - Data to be stored
	 * @param {string} iconUrl - URL for data object icon
	 * @param {string} presentation - presentation of data objcet
	 * @param {string} dataType - data type of value
	 * @param {date} fromTime - fromTime for object
	 * @param {date} toTime - toTime for object
	 *
	 * @return {object} - Response
	 */
	createDataObject(id, type, name, mimeType, data, iconUrl, presentation, dataType, fromTime, toTime) {
		const payload = {
			id,
			type,
			name,
			mimeType,
			data,
			iconUrl,
			presentation,
			dataType,
			fromTime,
			toTime
		}
		Object.keys(payload).forEach(key => {
			if (payload[key] === undefined) {
				delete payload[key]
			}
		})
		return axios.post(`${this.parentAPI.BASE_URL_API}dataobject`, payload, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Registers a data variant
	 * @param {string} id - UUID (optional)
	 * @param {string} type - Type of data object
	 * @param {string} name - Name for the data object
	 * @param {string} mimeType - Mime type for the data object data property
	 * @param {string} remark - Remark for the variant
	 * @param {string} iconUrl - URL for data object icon
	 * @param {string} presentation - presentation of data objcet
	 * @param {string} dataType - data type of value
	 * @param {date} fromTime - fromTime for object
	 * @param {date} toTime - toTime for object
	 *
	 * @return {object} - Response
	 */
	registerDataVariant(id, type, name, mimeType, remark, iconUrl, presentation, dataType, fromTime, toTime) {
		const payload = {
			id,
			type,
			name,
			mimeType,
			remark,
			iconUrl,
			presentation,
			dataType,
			fromTime,
			toTime
		}
		Object.keys(payload).forEach(key => {
			if (payload[key] === undefined) {
				delete payload[key]
			}
		})
		return axios.post(`${this.parentAPI.BASE_URL_API}dataobject/variant`, payload, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Updates a data object
	 * @param {string} id - ID of object to update
	 * @param {string} type - Type of data object
	 * @param {string} name - Name for the data object
	 * @param {string} mimeType - Mime type for the data object data property
	 * @param {any} data - Data to be stored
	 * @param {string} iconUrl - URL for data object icon
	 * @param {string} presentation - presentation of data objcet
	 * @param {string} dataType - data type of value
	 * @param {date} fromTime - fromTime for object
	 * @param {date} toTime - toTime for object
	 *
	 * @return {object} - Response
	 */
	updateDataObject(id, type, name, mimeType, data, iconUrl, presentation, dataType, fromTime, toTime) {
		const payload = {
			id,
			type,
			name,
			mimeType,
			data,
			iconUrl,
			presentation,
			dataType,
			fromTime,
			toTime
		}
		Object.keys(payload).forEach(key => {
			if (payload[key] === undefined) {
				delete payload[key]
			}
		})
		return axios.put(`${this.parentAPI.BASE_URL_API}dataobject/${id}`, payload, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Delete data object
	 * @param {string} id - ID of data object to delete
	 * @return {object} - Response
	 */
	deleteDataObject(id) {
		return axios.delete(`${this.parentAPI.BASE_URL_API}dataobject/${id}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Delete data variant
	 * @param {string} id - ID of data variant to delete
	 * @return {object} - Response
	 */
	deleteDataVariant(id) {
		return axios.delete(`${this.parentAPI.BASE_URL_API}dataobject/variant/${id}`, this.parentAPI.DEFAULTCONFIG)
	}
}
