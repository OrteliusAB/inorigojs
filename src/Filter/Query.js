/*
 * The Query class is used to generate payloads for Inorigo's Query API.
 * The class is built with function chaining in mind, and the different functions will all return the owner instance.
 */
export class Query {
	/**
	 * The constructor should take a type.
	 * @param {string} type - Inorigo type
	 */
	constructor(type) {
		this.state = {
			kind: "Filter",
			dataType: type,
			criteria: []
		}
	}

    /**
	 * Appends a definition criteria to the query.
	 * @param {string} definitionUUID - Inorigo compatible UUID
	 * @returns {Query} - This
	 */
	addDefinition(definitionUUID) {
		this.state.definitions || (this.state.definitions = [])
		this.state.definitions.push({
			kind: "EntityDTO",
			dataType: definitionType,
			id: definitionUUID
		})
		return this
	}

	/**
	 * Removes a definition from the entity.
	 * @param {string} definitionType - Inorigo type
	 * @param {string} definitionUUID - Inorigo compatible UUID
	 * @returns {Query} - This
	 */
	removeDefinition(definitionType, definitionUUID) {
		this.state.definitions = this.state.definitions.filter(definition => {
			return definition.dataType !== definitionType && definition.id !== definitionUUID
		})
		if (this.state.definitions.length === 0) {
			delete this.state.definitions
		}
		return this
	}

	/**
	 * Sets the attribute values on the entity, overwriting any existing attribute value(s).
	 * @param {object} attributeValues - An entity literal where the keys are attribute UUIDs, and the values are attribute values
	 * @returns {Query} - This
	 */
	setValues(attributevalues) {
		this.state.attributeValues = Object.keys(attributevalues).map(key => {
			return { key, value: attributevalues[key] }
		})
		return this
	}

	/**
	 * Appends an attribute value to the entity.
	 * @param {string} attributeUUID - The attribute uuid
	 * @param {any} value - The attribute value
	 * @returns {Query} - This
	 */
	addValue(attributeUUID, value) {
		this.state.attributeValues.push({
			key: attributeUUID,
			value
		})
		return this
	}

	/**
	 * Removes an attribute value from the entity. Note that this will *not* cause a delete operation when sent to Inorigo.
	 * @param {string} attributeUUID - The attribute uuid to be removed
	 * @returns {Query} - This
	 */
	removeValue(attributeUUID) {
		this.state.attributeValues = this.state.attributeValues.filter(attributeValue => {
			return attributeValue.key !== attributeUUID
		})
		return this
	}

	/**
	 * Clears all attribute values from the entity. Note that this will *not* cause a delete operation when sent to Inorigo.
	 * @returns {Query} - This
	 */
	clearAllAttributeValues() {
		this.state.attributevalues = []
		return this
	}

	/**
	 * Sets the UUID of the entity.
	 * @param {string} uuid - The uuid
	 * @returns {Query} - This
	 */
	setUUID(uuid) {
		this.state.id = uuid
		return this
	}

	/**
	 * Sets the type of the entity.
	 * @param {string} type - The type
	 * @returns {Query} - This
	 */
	setType(type) {
		this.state.dataType = type
		return this
	}

	/**
	 * Appends a super class to the entity.
	 * @param {string} type - The super class entity uuid
	 * @param {string} uuid - The super class entity value
	 * @returns {Query} - This
	 */
	addSuperClass(type, uuid) {
		this.state.superClasses.push({
			id: uuid,
			dataType: type
		})
		return this
	}

	/**
	 * Sets the super classes on the entity, overwriting any existing super class entities.
	 * @param {string} type - The super class entity uuid
	 * @param {string} uuid - The super class entity value
	 * @returns {Query} - This
	 */
	setSuperClasses(arr) {
		this.state.superClasses = arr
	}

	/**
	 * Returns the entity JSON in an inorigo compatible format.
	 * @returns {object} - The entity JSON
	 */
	print() {
		return this.state
	}
}
