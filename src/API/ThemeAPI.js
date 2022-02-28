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

	/**
	 * Get the default stylesheet
	 * @param {string} cssClass - Optional class name
	 * @returns {object} - Response
	 */
	getCssDefault(cssClass) {
		const uriParams = {
			class: cssClass
		}
		this.parentAPI.setDefaultRequestHeader("Accept", null)
		this.parentAPI.setDefaultRequestHeader("Content-Type", "text/csv")
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/default${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the default theme
	 * @returns {object} - Response
	 */
	getVariablesDefault() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/default`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the configured portal theme. The default theme is returned if no portal theme is configured
	 * @returns {object} - Response
	 */
	getVariablesPortal() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/portal`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the configured portal stylesheet. The default stylesheet is returned if no portal theme is configured
	 * @param {string} cssClass
	 * @returns {object} - Response
	 */
	getCssPortal(cssClass) {
		const uriParams = {
			class: cssClass
		}
		this.parentAPI.setDefaultRequestHeader("Accept", null)
		this.parentAPI.setDefaultRequestHeader("Content-Type", "text/csv")
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/portal${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the session stylesheet
	 * @param {string} cssClass - Optional class name
	 * @returns {object} - Response
	 */
	getCssSession(cssClass) {
		const uriParams = {
			class: cssClass
		}
		this.parentAPI.setDefaultRequestHeader("Accept", null)
		this.parentAPI.setDefaultRequestHeader("Content-Type", "text/csv")
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/session${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get the session theme
	 * @returns {object} - Response
	 */
	getVariablesSession() {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/session`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get a theme
	 * @param {string} id - Theme identifer
	 * @returns {object} - Response
	 */
	getVariables(id) {
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/variables/${id}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Get a theme
	 * @param {string} id
	 * @param {string} cssClass
	 * @returns {object} - Response
	 */
	getCss(id, cssClass) {
		const uriParams = {
			class: cssClass
		}
		this.parentAPI.setDefaultRequestHeader("Accept", null)
		this.parentAPI.setDefaultRequestHeader("Content-Type", "text/csv")
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/${id}${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 *
	 * @param {string} key
	 * @param {strting} mainColor
	 * @param {string} accentColor
	 * @param {string} highlightColor
	 * @param {string} theme
	 * @returns {object} - Response
	 */
	getImage(key, mainColor, accentColor, highlightColor, theme) {
		const uriParams = {
			mainColor,
			accentColor,
			highlightColor,
			theme
		}
		this.parentAPI.setDefaultRequestHeader("Accept", "image/svg+xml")
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
			image,
			mainColor,
			accentColor,
			highlightColor,
			theme
		}
		this.parentAPI.setDefaultRequestHeader("Accept", "image/svg+xml")
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/timage${this.parentAPI._buildURIParams(uriParams)}`, this.parentAPI.DEFAULTCONFIG)
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
		this.parentAPI.setDefaultRequestHeader("Accept", null)
		this.parentAPI.setDefaultRequestHeader("Content-Type", "text/css")
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/workbench`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Apply theme on any text. Like svg, html etc
	 * @param {string} mainColor - Optional Main Color.
	 * @param {string} accentColor - Optional Accent Color.
	 * @param {string} highlightColor - Optional Highlight Color.
	 * @param {object} requestBody - Required Request Body
	 * @param {object} contentType - Type of media in input param requestBody, options: 'image/svg+xml' (default) OR 'text/html'
	 * @returns {object} - Response
	 */
	applyTheme(mainColor, accentColor, highlightColor, requestBody, contentType = "image/svg+xml") {
		const uriParams = {
			mainColor,
			accentColor,
			highlightColor
		}
		this.parentAPI.setDefaultRequestHeader("Accept", null)
		this.parentAPI.setDefaultRequestHeader("Content-Type", contentType)
		return axios.post(`${this.parentAPI.BASE_URL_API}theme/apply${this.parentAPI._buildURIParams(uriParams)}`, requestBody, this.parentAPI.DEFAULTCONFIG)
	}
}
