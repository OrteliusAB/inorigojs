import axios from "axios"

/*
 * Verso Runtime API class.
 * This class contains APIs for doing operations with regards to verso runtimes.
 */
export class VersoRuntimeAPI {
	/**
	 * Verso Runtime API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	/**
	 * Refreshes a given verso runtime
	 * @param {string} vrid - Runtime ID
	 * @return {object} - Response
	 */
	refresh(vrid) {
		return axios.post(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/refresh`, {}, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Executes a calcualte in a given verso runtime.
	 * @param {string} vrid - Runtime ID
	 * @return {object} - Response
	 */
	calculate(vrid) {
		return axios.post(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/calculate`, {}, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Clears selections in a given filter box in a given verso runtime.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	clear(vrid, where) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/select/clear${this.parentAPI._buildURIParams({
				where
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves values from a given verso runtime. Compatible with both expression variables, filter boxes and data sets.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	getValue(vrid, where) {
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/variable/value?key=${where}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Selects one entity in a given filterbox.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @param {string} what - Value to select
	 * @param {boolean} isClearFirst - Should box first be cleared?
	 * @return {object} - Response
	 */
	selectOne(vrid, where, what, isClearFirst) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/select/one${this.parentAPI._buildURIParams({
				where,
				what,
				clear: isClearFirst
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Selects Many entities in a given filterbox.
	 * @param {string} vrid - Runtime ID
	 * @param {string} selectionJSON - Array of values to be selected
	 * @return {object} - Response
	 */
	selectMany(vrid, selectionJSON) {
		return axios.post(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/select/many`, selectionJSON, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Counts all entities in a given filterbox.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	countAll(vrid, where) {
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/items/count/all?where=${where}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Counts all selected entities in a given filterbox.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	countSelected(vrid, where) {
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/items/count/selected?where=${where}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Counts all explicitly selected entities in a given filterbox.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	countExplicit(vrid, where) {
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/items/count/explicit?where=${where}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Counts all implicitly selected entities in a given filterbox.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	countImplicit(vrid, where) {
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/items/count/implicit?where=${where}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves the built in Verso runtime API script.
	 * @param {string} vrid - Runtime ID
	 * @return {object} - Response
	 */
	getScript(vrid) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "text/javascript"
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/script`, customConfig)
	}

	/**
	 * Retrieves the tooltip text of a given component.
	 * @param {string} vrid - Runtime ID
	 * @param {string} componentID - Component name (Usually p(x))
	 * @param {string} row - Row where the tooltip should be found
	 * @param {string} column - Column where the tooltip should be found
	 * @return {object} - Response
	 */
	getTooltip(vrid, componentID, row, column) {
		const customConfig = { ...this.parentAPI.DEFAULTCONFIG }
		customConfig.headers = { ...this.parentAPI.DEFAULTCONFIG.headers }
		customConfig.headers["Accept"] = "text/html"
		return axios.get(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/cell/tooltip${this.parentAPI._buildURIParams({
				componentID,
				row,
				column
			})}`,
			customConfig
		)
	}

	/**
	 * Evaluates a given expression inside of a given verso runtime.
	 * @param {string} vrid - Runtime ID
	 * @param {string} expression - Expression to be evaluated
	 * @return {object} - Response
	 */
	evaluateExpression(vrid, expression) {
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/evaluate?expression=${expression}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Sets a runtime variable inside of a given verso runtime.
	 * @param {string} vrid - Runtime ID
	 * @param {string} name - Name of variable
	 * @param {string} type - Data type of variable
	 * @param {string} element - Element
	 * @param {string} value - Value to be set
	 * @return {object} - Response
	 */
	setRuntimeVariable(vrid, name, type, element, value) {
		const payload = {
			name,
			type,
			element,
			value
		}
		return axios.post(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/set/runtime/value`, payload, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Locks the selection in a given filterbox in a given verso runtime.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	lockSelection(vrid, where) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/lock/selection${this.parentAPI._buildURIParams({
				where
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Unlocks the selection in a given filterbox in a given verso runtime.
	 * @param {string} vrid - Runtime ID
	 * @param {string} where - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	unlockSelection(vrid, where) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/unlock/selection${this.parentAPI._buildURIParams({
				where
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Focuses a component in a given verso runtime. This.parentAPI can be used to programatically switch tabs.
	 * @param {string} vrid - Runtime ID
	 * @param {string} component - Component name (Usually p(x))
	 * @return {object} - Response
	 */
	focusComponent(vrid, component) {
		return axios.post(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/component/focus/${component}`, {}, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Set a component read only
	 * @param {string} vrid - The application runtime id.
	 * @param {string} component - component
	 * @param {boolean} readonly - readonly
	 * @returns {object} - Response
	 */
	setComponentReadOnly(vrid, component, readonly) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/component/readonly/${component}/${readonly}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Trigger an interactive action to be performed for an entity
	 * @param {string} vrid - The application runtime id.
	 * @param {string} action - The type of action to perform.
	 * @param {string} entityType - The entity type.
	 * @param {string} entityUUID - The entity UUID
	 * @param {string} where - The component responsible for the action.(required)
	 * @returns {object} - Response
	 */
	triggerAction(vrid, action, entityType, entityUUID, where) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/entity/action/${action}${this.parentAPI._buildURIParams({
				entityType,
				entityUUID,
				where
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Set the visibility of a component
	 * @param {srting} vrid - The application runtime id.
	 * @param {string} component - component
	 * @param {boolean} visible - visible
	 * @returns {object} - Response
	 */
	setComponentVisible(vrid, component, visible) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/component/visible/${component}/${visible}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Set a component enabled
	 * @param {string} vrid - The application runtime id.
	 * @param {string} component - component
	 * @param {boolean} enabled - enabled
	 * @returns {object} - Response
	 */
	setComponentEnabled(vrid, component, enabled) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/component/enabled/${component}/${enabled}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Get a list of predefined commands and their states and details
	 * @param {string} vrid -  The application runtime id
	 * @returns {object} - Response
	 */
	getCommands(vrid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/commands`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 *
	 * @param {string} vrid - The application runtime id
	 * @param {boolean} enabled - Enabled ?
	 * @param {string} command - The command
	 * @param {string} where - The component
	 * @returns {object}
	 */
	setCommandEnabled(vrid, enabled, command, where) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/component/command/enabled/${enabled}${this.parentAPI._buildURIParams({
				command,
				where
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	executeCommand(vrid, command, where) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/component/command/execute${this.parentAPI._buildURIParams({
				command,
				where
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	setCommandVisible(vrid, command, where, visible) {
		return axios.post(
			`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/component/command/visible/${visible}${this.parentAPI._buildURIParams({
				command,
				where
			})}`,
			{},
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Execute one of the predefined commands, by ID
	 * @param {string} vrid - The application id
	 * @param {string} command - The command ID to perform
	 * @returns {object} - Response
	 */
	executePredefinedCommand(vrid, command) {
		return axios.post(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/exec/command/${command}`, {}, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Export component
	 * @param {string} vrid - The application runtime id
	 * @param {string} component - component
	 * @returns {object} - Response
	 */
	exportComponent(vrid, component) {
		return axios.get(`${this.parentAPI.BASE_URL_API}application/runtime/${vrid}/export/${component}`, this.parentAPI.DEFAULTCONFIG)
	}
}
