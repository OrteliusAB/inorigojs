import axios from "axios"

/*
 * Theme Set API class.
 * This class contains APIs for interacting with theme API.
 */
export class ThemeAPI {
	/**
	 * Theme API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	getCssDefault(cssClass) {
		const uriParams = {
			class: cssClass
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	getVariablesDefault() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/default`, this.parentAPI.DEFAULTCONFIG)
	}

	getVariablesPortal() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/portal`, this.parentAPI.DEFAULTCONFIG)
	}

	getCssPortal(cssClass) {
		const uriParams = {
			class: cssClass
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/portal${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	getCssSession(cssClass) {
		const uriParams = {
			class: cssClass
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/session${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	getVariablesSession() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/session`, this.parentAPI.DEFAULTCONFIG)
	}

	getVariables(id) {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/${id}`, this.parentAPI.DEFAULTCONFIG)
	}

	getCss(id, cssClass) {
		const uriParams = {
			class: cssClass
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/${id}${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	getImage(key, mainColor, accentColor, highlightColor, theme) {
		const uriParams = {
			mainColor,
			accentColor,
			highlightColor,
			theme
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/image/${key}${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get themed image
	 * @param {string} image - Image Name.
	 * @param {string} mainColor - Optional Main Color.
	 * @param {string} accentColor - Optional Accent Color.
	 * @param {string} highlightColor - Optional Highlight Color.
	 * @param {string} theme - Theme.
	 * @returns
	 */
	getThemedImage(image, mainColor, accentColor, highlightColor, theme) {
		const uriParams = {
			mainColor,
			accentColor,
			highlightColor,
			theme
		}
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/image/${image}${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get id and presentation for the available themes
	 * @returns {object} - Response
	 */
	getTheme() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the configured workbench theme. The default stylesheet is returned if no workbench theme is configured
	 * @returns {object} - Response
	 */
	getWorkbenchTheme() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/workbench`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the configured workbench stylesheet. The default stylesheet is returned if no workbench theme is configured
	 * @returns {object} - Response
	 */
	getWorkbenchStylesheet() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/workbench`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Apply theme on any text. Like svg, html etc
	 * @param {string} mainColor - Optional Main Color.
	 * @param {string} accentColor - Optional Accent Color.
	 * @param {string} highlightColor - Optional Highlight Color.
	 * @param {object} requestBody - Required Request Body
	 * @returns {object} - Response
	 */
	applyTheme(mainColor, accentColor, highlightColor, requestBody) {
		const uriParams = {
			mainColor,
			accentColor,
			highlightColor
		}
		return axios.post(`${this.parentAPI.BASE_URL_API}theme/apply${this.parentAPI._buildURIParams(uriParams)}`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}
}
