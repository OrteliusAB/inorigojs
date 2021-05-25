import axios from "axios"
import { EntityAPI } from "./EntityAPI"
import { KnowledgeSetAPI } from "./KnowledgeSetAPI"
import { LegacyAPI } from "./LegacyAPI"
import { ResourceAPI } from "./ResourceAPI"
import { ShortcutAPI } from "./ShortcutAPI"
import { VersoRuntimeAPI } from "./VersoRuntimeAPI"

/*
 * This is the main API communication class.
 * This class contains functions that return communication instances of each respective API of Inorigo, but with one shared API class instance.
 */
export class InorigoAPI {
	/**
	 * Inorigo API
	 * @param {string} url - The URL of your inorigo instance.
	 * @param {object} options - Options
	 * @param {object} options.customHttpsAgent - A custom HTTPS agent that can used to, for example, surpress certificate related errors
	 * @param {object} options.authorization - Authorization parameters (username, password). If provided these will be stored and sent in every subsequent request
	 * @param {object} options.apiEndpoint - By default the latest version of the web API will typically be used. You can override this by providing your own endpoint.
	 */
	constructor(url, { customHttpsAgent, authorization, apiEndpoint }) {
		this.IS_SECURE = true
		this.BASE_URL = url
		this.BASE_URL_API = url += "services/api/v1/"
		this.DEFAULTCONFIG = {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Accept: "application/json",
				"Access-Control-Max-Age": 1728000
			},
			data: {},
			withCredentials: true
		}

		if (apiEndpoint) {
			this.BASE_URL_API = this.BASE_URL + apiEndpoint
		}

		if (customHttpsAgent !== undefined) {
			this.IS_SECURE = false
			this.DEFAULTCONFIG = {
				...this.DEFAULTCONFIG,
				httpsAgent: customHttpsAgent
			}
		}

		if (authorization) {
			if (authorization.username && authorization.password) {
				this.DEFAULTCONFIG.headers.Authorization = "Basic " + this._genericBtoA(authorization.username + ":" + authorization.password)
			}
		}
	}

	/* Security, Global Settings */

	/**
	 * Can be used to inject cookies in all subsequent requests.
	 * @param {string} cookies - the cookie string
	 */
	injectCookies(cookies) {
		this.DEFAULTCONFIG.headers.Cookie = cookies
	}

	/* Account, Session */

	/**
	 * Send a login request to Inorigo.
	 * @param {string} username - Username to be used
	 * @param {string} password - Password to be used
	 */
	async login(username, password) {
		const CONFIG = {
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Accept: "application/json",
				Authorization: "Basic " + this._genericBtoA(username + ":" + password)
			},
			data: {},
			withCredentials: true
		}
		if (!this.IS_SECURE) {
			CONFIG.httpsAgent = this.DEFAULTCONFIG.httpsAgent
		}
		return axios.post(`${this.BASE_URL}services/open/login`, {}, CONFIG)
	}

	/**
	 * Send a logout request to Inorigo.
	 */
	async logout() {
		return axios.post(`${this.BASE_URL}services/open/logout`, {}, this.DEFAULTCONFIG)
	}

	/**
	 * Retrieves the current session from Inorigo.
	 */
	async getSession() {
		return axios.get(`${this.BASE_URL}services/open/session/user`, this.DEFAULTCONFIG)
	}

	/* API Shortcuts (Common inorigo helper functions) */

	/**
	 * Retrieves a shortcut API that can be used to abstract away some of the trickiness of the entity API.
	 * @return {ShortcutAPI} - The API
	 */
	getShortcutAPI() {
		return new ShortcutAPI(this)
	}

	/* DEPRECATED */
	shortcut() {
		return new ShortcutAPI(this)
	}

	/* Verso (Application Builder) */
	/**
	 * Retrieves an Application Builder API.
	 * @return {VersoRuntimeAPI} - The API
	 */
	getVersoRuntimeAPI() {
		return new VersoRuntimeAPI(this)
	}

	/* DEPRECATED */
	versoRuntime() {
		return new VersoRuntimeAPI(this)
	}

	/* Knowledge set */
	/**
	 * Retrieves a Knowledge Set API.
	 * @return {KnowledgeSetAPI} - The API
	 */
	getKnowledgesetAPI() {
		return new KnowledgeSetAPI(this)
	}

	/* DEPRECATED */
	knowledgeset() {
		return new KnowledgeSetAPI(this)
	}

	/* Entity (Data Objects) */
	/**
	 * Retrieves an Entity API.
	 * @return {EntityAPI} - The API
	 */
	getEntityAPI() {
		return new EntityAPI(this)
	}

	/* DEPRECATED */
	entity() {
		return new EntityAPI(this)
	}

	/* Resource (Files) */
	/**
	 * Retrieves a resource (file) API.
	 * @return {ResourceAPI} - The API
	 */
	getResourceAPI() {
		return new ResourceAPI(this)
	}

	/* DEPRECATED */
	resource() {
		return new ResourceAPI(this)
	}

	/* Legacy Endpoints (some of which are undocumented!) */
	/**
	 * Retrieves a legacy API.
	 * @return {LegacyAPI} - The API
	 */
	getLegacyAPI() {
		return new LegacyAPI(this)
	}

	/* DEPRECATED */
	legacy() {
		return new LegacyAPI(this)
	}

	/* Utility Functions */

	_buildURIParams(object) {
		let returnString = ""
		//Stringify removes the undefined values
		let tempObj = JSON.stringify(object)
		if (tempObj !== JSON.stringify({})) {
			returnString = "?"
		}
		tempObj = JSON.parse(tempObj)
		return (
			returnString +
			Object.keys(tempObj)
				.map(key => {
					if (!tempObj[key]) {
						return null
					} else if (Array.isArray(tempObj[key])) {
						let uriShard = ""
						tempObj[key].forEach(value => {
							uriShard = `${uriShard}&${key}=${value}`
						})
						return uriShard.substr(1)
					} else {
						return [key, "" + tempObj[key]].join("=")
					}
				})
				.filter(param => param)
				.join("&")
		)
	}

	_genericBtoA(b) {
		if (typeof process === "object" && Object.prototype.toString.call(process) === "[object process]") {
			//If running in node, use Buffer
			return Buffer.from(b).toString("base64")
		} else {
			//If running in browser, use btoa()
			return btoa(b)
		}
	}
}
