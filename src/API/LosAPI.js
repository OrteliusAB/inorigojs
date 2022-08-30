import axios from "axios"

/*
 * LOS API class.
 * This class contains APIs for customer LOS component.
 */
export class LosAPI {
	/**
	 * LOS API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
		this.baseURL = this.parentAPI.BASE_URL + "services/api/"
	}

	/** Returns all locations */
	getLocations() {
		return axios.get(`${this.baseURL}customer/los/location/all`, this.parentAPI.DEFAULTCONFIG)
	}

	/** Returns all persons */
	getPersons() {
		return axios.get(`${this.baseURL}customer/los/person/all`, this.parentAPI.DEFAULTCONFIG)
	}

	/** Returns all projects */
	getProjects() {
		return axios.get(`${this.baseURL}customer/los/project/all`, this.parentAPI.DEFAULTCONFIG)
	}

	/** Create a project */
	createProject(requestBody) {
		return axios.post(`${this.baseURL}customer/los/project/create/basics`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/** Returns a project */
	getProject(projectId) {
		return axios.get(`${this.baseURL}customer/los/one/${projectId}`, this.parentAPI.DEFAULTCONFIG)
	}

	/** Update a project */
	updateProject(requestBody) {
		return axios.post(`${this.baseURL}customer/los/project/update/basics`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/** Update houses */
	updateHouses(requestBody) {
		return axios.post(`${this.baseURL}customer/los/project/update/houses`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}

	/** Returns all existing roles */
	getRoles() {
		return axios.get(`${this.baseURL}customer/los/role/all`, this.parentAPI.DEFAULTCONFIG)
	}

	/** Returns all existing versions */
	getVersions() {
		return axios.get(`${this.baseURL}customer/los/version/all`, this.parentAPI.DEFAULTCONFIG)
	}

	/** Create a new version */
	cloneVersion(targetVersionName, sourceVersionID = null) {
		const uriParams = {
			targetVersionName
		}
		if (sourceVersionID) {
			uriParams.sourceVersionID = sourceVersionID
		}
		return axios.post(`${this.baseURL}customer/los/version/clone${this.parentAPI._buildURIParams(uriParams)}`, {}, this.parentAPI.DEFAULTCONFIG)
	}

	/** Returns a list of distinct version house values for the given column */
	getVersionHouseValues(columnName, versionId) {
		const param = versionId ? "version=" + versionId + "&attribute=" + columnName.replaceAll(" ", "%20") : "attribute=" + columnName.replaceAll(" ", "%20")
		return axios.get(`${this.baseURL}customer/los/version/house/values?` + param, this.parentAPI.DEFAULTCONFIG)
	}

	/** Returns a list of version hosues */
	getVersionHouses(versionId) {
		const param = versionId ? "?version=" + versionId : ""
		return axios.get(`${this.baseURL}customer/los/version/houses` + param, this.parentAPI.DEFAULTCONFIG)
	}
}
