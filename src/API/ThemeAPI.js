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
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = null
		customConfig.headers["Content-Type"] = "text/css"
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/default${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
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
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = null
		customConfig.headers["Content-Type"] = "text/css"
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/portal${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
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
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = null
		customConfig.headers["Content-Type"] = "text/css"
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/session${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
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
	 * Get a theme as a stylesheet
	 * @param {string} id - Theme identifier
	 * @param {string} cssClass - Optional class name
	 * @returns {object} - Response
	 */
	getCss(id, cssClass) {
		const uriParams = {
			class: cssClass
		}
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = null
		customConfig.headers["Content-Type"] = "text/css"
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/${id}${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
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
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "image/svg+xml"
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/image/${key}${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
	}

	/**
	 * Get themed image
	 * @param {string} image - Image Name.
	 * @param {string} [mainColor] - Main Color.
	 * @param {string} [accentColor] - Accent Color.
	 * @param {string} [highlightColor] - Highlight Color.
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
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "image/svg+xml"
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/timage${this.parentAPI._buildURIParams(uriParams)}`, customConfig)
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
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = null
		customConfig.headers["Content-Type"] = "text/css"
		return axios.get(`${this.parentAPI.BASE_URL_API}theme/css/workbench`, customConfig)
	}

	/**
	 * Apply theme on any text. Like svg, html etc
	 * @param {string} [mainColor] - Main Color.
	 * @param {string} [accentColor] - Accent Color.
	 * @param {string} [highlightColor] - Highlight Color.
	 * @param {object} requestBody - Request Body
	 * @param {object} contentType - Type of media in input param requestBody, options: 'image/svg+xml' (default) OR 'text/html'
	 * @returns {object} - Response
	 */
	applyTheme(mainColor, accentColor, highlightColor, requestBody, contentType = "image/svg+xml") {
		const uriParams = {
			mainColor,
			accentColor,
			highlightColor
		}
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = null
		customConfig.headers["Content-Type"] = contentType
		return axios.post(`${this.parentAPI.BASE_URL_API}theme/apply${this.parentAPI._buildURIParams(uriParams)}`, requestBody, customConfig)
	}
}
