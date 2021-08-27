import axios from "axios"

/*
 * Core API class.
 * This class contains APIs for miscellaneous functions in Inorigo.
 * Note! The server side of this API is only available as of the Inorigo Sakura release
 */
export class CoreAPI {
	/**
	 * Core API
	 * @param {InorigoAPI} parentAPI - The parent API class.
	 */
	constructor(parentAPI) {
		this.parentAPI = parentAPI
	}

	_attributeDefinitionParam(attributeKey, definitionID, definitionType, entityType, presentations, icons) {
		return this.parentAPI._buildURIParams({
			attributeKey,
			definitionID,
			definitionType,
			entityType,
			presentations: presentations ? true : undefined,
			icons: icons ? true : undefined
		})
	}

	/**
	 * Retrieves the entity presentation from inorigo
	 * @param {string} type - Inorigo Type
	 * @param {string} uuid - Inorigo ID
	 * @return {object} - Response
	 */
	getEntityPresentation(type, uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}core/presentation/${type}/${uuid}`, this.parentAPI._textInOutConfig())
	}

	/**
	 * Retrieves a Filter definition from inorigo
	 * @param {string} uuid - Inorigo ID
	 * @return {object} - Response
	 */
	getFilter(uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}core/filter/definition/${uuid}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Runs a Filter in inorigo
	 * @param {object} filterDefinition - Inorigo Filter
	 * @param {string} presentations - Add presentations to the output
	 * @param {string} icons - Add icon URLs to the output
	 * @return {object} - Response
	 */
	runFilter(filterDefinition, presentations, icons) {
		const param = this.parentAPI._buildURIParams({
			presentations: presentations ? true : undefined,
			icons: icons ? true : undefined
		})

		return axios.post(`${this.parentAPI.BASE_URL_API}core/filter/run${param}`, filterDefinition, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves a Translation from inorigo
	 * @param {string} text - The text to be translated
	 * @return {object} - Response
	 */
	getTranslation(text) {
		return axios.post(`${this.parentAPI.BASE_URL_API}core/translate`, text, this.parentAPI._textInOutConfig())
	}

	/**
	 * Retrieves an Attribute Definition from inorigo
	 * @param {string} attributeKey - The attribute key (required). May be a uuid or a fixed attribute name
	 * @param {string} definitionID - Inorigo ID of an explicit definition where the attribute is defined or inherrited
	 * @param {string} definitionType - Inorigo Type of a definition (applicable when the attributeKey is a fixed attribute)
	 * @param {string} entityType - Inorigo Type of an entity (applicable when the attributeKey is a fixed attribute)
	 * @return {object} - Response
	 */
	getAttributeDefinition(attributeKey, definitionID, definitionType, entityType) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}core/attribute/definition${this._attributeDefinitionParam(attributeKey, definitionID, definitionType, entityType)}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves possible known values for an Inorigo attribute
	 * @param {string} attributeKey - The attribute key (required). May be a uuid or a fixed attribute name
	 * @param {string} definitionID - Inorigo ID of an explicit definition where the attribute is defined or inherrited
	 * @param {string} definitionType - Inorigo Type of a definition (applicable when the attributeKey is a fixed attribute)
	 * @param {string} entityType - Inorigo Type of an entity (applicable when the attributeKey is a fixed attribute)
	 * @param {string} presentations - Add presentations to the output (applicable only when the attribute refer an entity)
	 * @param {string} icons - Add icon URLs to the output (applicable only when the attribute refer an entity)
	 * @return {object} - Response
	 */
	getPossibleAttributeValues(attributeKey, definitionID, definitionType, entityType, presentations, icons) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}core/attribute/value/list${this._attributeDefinitionParam(
				attributeKey,
				definitionID,
				definitionType,
				entityType,
				presentations,
				icons
			)}`,
			this.parentAPI.DEFAULTCONFIG
		)
	}

	/**
	 * Retrieves possible known values for an Inorigo attribute
	 * @param {string} attributeKey - The attribute key (required). May be a uuid or a fixed attribute name
	 * @param {string} definitionID - Inorigo ID of an explicit definition where the attribute is defined or inherrited
	 * @param {string} definitionType - Inorigo Type of a definition (applicable when the attributeKey is a fixed attribute)
	 * @param {string} entityType - Inorigo Type of an entity (applicable when the attributeKey is a fixed attribute)
	 * @param {string} presentations - Add presentations to the output (applicable only when the attribute refer an entity)
	 * @param {string} icons - Add icon URLs to the output (applicable only when the attribute refer an entity)
	 * @return {object} - Response
	 */
	getPossibleAttributeValuesCount(attributeKey, definitionID, definitionType, entityType, presentations, icons) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}core/attribute/value/count${this._attributeDefinitionParam(
				attributeKey,
				definitionID,
				definitionType,
				entityType,
				presentations,
				icons
			)}`,
			this.parentAPI._textOutConfig()
		)
	}
}
