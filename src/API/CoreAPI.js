import axios from "axios"
import * as GlobalID from "../Utils/GlobalID"

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
	 * @param {boolean} presentations - Add presentations to the output
	 * @param {boolean} icons - Add icon URLs to the output
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
	 * @param {string=} definitionID - Inorigo ID of an explicit definition where the attribute is defined or inherrited
	 * @param {string=} definitionType - Inorigo Type of a definition (applicable when the attributeKey is a fixed attribute)
	 * @param {string=} entityType - Inorigo Type of an entity (applicable when the attributeKey is a fixed attribute)
	 * @param {boolean=} presentations - Add presentations to the output (applicable only when the attribute refer an entity)
	 * @param {boolean=} icons - Add icon URLs to the output (applicable only when the attribute refer an entity)
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
	 * @param {boolean} presentations - Add presentations to the output (applicable only when the attribute refer an entity)
	 * @param {boolean} icons - Add icon URLs to the output (applicable only when the attribute refer an entity)
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

	/**
	 * Retrieves number of entities for an Inorigo Type
	 * @param {string} entityType - Inorigo Type of an entity (applicable when the attributeKey is a fixed attribute)
	 * @return {object} - Response
	 */
	getEntityTypeCount(entityType) {
		return axios.get(`${this.parentAPI.BASE_URL_API}core/count/entity/${entityType}`, this.parentAPI._textOutConfig())
	}

	/**
	 * Retrieves the name of a relation specifier in the specified direction
	 * @param {string} relationSpecifierID - Inorigo ID of a Relation Specifier
	 * @param {"Downwards" | "Upwards" | "Both"} direction - Direction of relation
	 * @return {object} - Response
	 */
	getRelationSpecifierName(relationSpecifierID, direction) {
		return axios.get(
			`${this.parentAPI.BASE_URL_API}core/relation/specifier/name${this.parentAPI._buildURIParams({ relationSpecifierID, direction })}`,
			this.parentAPI._textOutConfig()
		)
	}

	/**
	 * Retrieves attributes, relations and references for a Config Request object
	 * @param {object} request - Inorigo Config Request as an object literal
	 * @return {object} - Response
	 */
	getEntityConfigByRequest(request) {
		return axios.post(`${this.parentAPI.BASE_URL_API}core/get/entity/config`, request, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves Tree structure for attributes, relations and references for a Config Request object
	 * @param {object} request - Inorigo Config Request
	 * @return {object} - Response
	 */
	getEntityConfigTreeByRequest(request) {
		return axios.post(`${this.parentAPI.BASE_URL_API}core/get/entity/config/tree`, request, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrives a list of possible values for a criterion
	 * @param {object} criterion - Inorigo Qualified Criterion
	 * @param {string} filter - Filter string
	 * @param {boolean} presentations - Add presentations to the output
	 * @param {boolean} icons - Add icon URLs to the output
	 * @param {number} page - Optional page
	 * @param {number} pageSize - Optional page size
	 * @return {object} - Response
	 */
	getCriterionOptions(criterion, filter, presentations, icons, page, pageSize) {
		const data = {
			criterion,
			filter,
			presentations: !!presentations,
			icons: !!icons,
			page: page ? page : -1,
			pageSize: pageSize ? pageSize : -1
		}

		return axios.post(`${this.parentAPI.BASE_URL_API}core/criterion/options/list`, data, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrives the number of possible values for a criterion
	 * @param {object} criterion - Inorigo Qualified Criterion
	 * @return {object} - Response
	 */
	getCriterionOptionsCount(criterion) {
		const data = {
			criterion
		}

		return axios.post(`${this.parentAPI.BASE_URL_API}core/criterion/options/count`, data, this.parentAPI._textOutConfig())
	}

	/**
	 * Retrives the Icon URL for a given entity
	 * @param {object} type - Inorigo Entity Type
	 * @param {object} uuid - Inorigo Unique identifier
	 * @return {object} - Response
	 */
	getEntityIconUrl(type, uuid) {
		return axios.get(`${this.parentAPI.BASE_URL_API}core/icon/url/${type}/${uuid}`, this.parentAPI._textOutConfig())
	}

	/**
	 * Retrives the Icon URL for a given entity type
	 * @param {string} type - Inorigo Entity Type
	 * @param {number} size - Optional Size param
	 * @return {string} - URL
	 */
	getTypeIconUrl(type, size) {
		if (size) {
			return `${this.parentAPI.BASE_URL_API}core/type/icon/${type}?size=${size}`
		} else {
			return `${this.parentAPI.BASE_URL_API}core/type/icon/${type}`
		}
	}

	/**
	 * Retrives the Icon URL for a given category
	 * @param {"Relation"|"RelationUp"|"RelationDown"|"Relations"|"Attribute"|"Attributes"|"Reference"|"References"|"Definition"|"Definitions"} category - Icon category
	 * @param {number} size - Optional Size param
	 * @return {string} - URL
	 */
	getCategoryIconUrl(category, size) {
		if (size) {
			return `${this.parentAPI.BASE_URL_API}core/type/icon/${category}?size=${size}`
		} else {
			return `${this.parentAPI.BASE_URL_API}core/type/icon/${category}`
		}
	}

	/**
	 * Retrives the known data types from Inorigo
	 * @param {boolean} primitives - Optional flag to include primitive data types
	 * @return {object} - Response
	 */
	getInorigoDataTypes(primitives = false) {
		const p = !!primitives
		return axios.get(`${this.parentAPI.BASE_URL_API}core/datatypes?primitives=${p}`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrives the known Expression Functions from Inorigo
	 * @return {object} - Response
	 */
	getExpressionFunctions() {
		return axios.get(`${this.parentAPI.BASE_URL_API}core/expression/functions`, this.parentAPI.DEFAULTCONFIG)
	}

	/**
	 * Retrieves the reference name for an Inorigo attribute
	 * @param {string} attributeKey - The attribute key (required uuid).
	 * @param {string} definitionID - Inorigo ID of an explicit definition where the attribute is defined or inherrited
	 * @param {boolean} detailed - Flag to trigger a more detailed name to be returned, including the definition name.
	 * @return {object} - Response
	 */
	getAttributeReferenceName(attributeKey, definitionID, detailed = false) {
		if (GlobalID.isUUID(definitionID)) {
			return axios.get(
				`${this.parentAPI.BASE_URL_API}core/attribute/reference/name/${attributeKey}?detailed=${!!detailed}&definitionID=${definitionID}`,
				this.parentAPI._textOutConfig()
			)
		} else if (GlobalID.isGlobalID(definitionID)) {
			return axios.get(
				`${this.parentAPI.BASE_URL_API}core/attribute/reference/name/${attributeKey}?detailed=${!!detailed}&definitionID=${definitionID.uuid}`,
				this.parentAPI._textOutConfig()
			)
		} else {
			return axios.get(
				`${this.parentAPI.BASE_URL_API}core/attribute/reference/name/${attributeKey}?detailed=${!!detailed}`,
				this.parentAPI._textOutConfig()
			)
		}
	}

	/**
	 * Get the system hardcoded ids
	 * @return {object} - Response
	 */
	getHardcodes() {
		return axios.get(`${this.parentAPI.BASE_URL_API}core/hardcodes`, this.parentAPI.DEFAULTCONFIG)
	}
}
