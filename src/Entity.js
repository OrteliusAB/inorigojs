/*
 * This class is used to generate payloads for Inorigo's entity API.
 * The class is built with function chaining in mind, where a developer can quickly build an Inorigo entity.
 */

export default class Entity {
	constructor(type, uuid) {
		this.state = {
			kind: "EntityDTO",
			dataType: type,
			id: uuid,
			attributeValues: [],
			superClasses: []
		}
	}

	setDefinition(definitionType, definitionUUID) {
		this.state.definitions = [
			{
				kind: "EntityDTO",
				dataType: definitionType,
				id: definitionUUID
			}
		]
		return this
	}

	addDefinition(definitionType, definitionUUID) {
		this.state.definitions || (this.state.definitions = [])
		this.state.definitions.push({
			kind: "EntityDTO",
			dataType: definitionType,
			id: definitionUUID
		})
		return this
	}

	removeDefinition(definitionType, definitionUUID) {
		this.state.definitions = this.state.definitions.filter(definition => {
			return definition.dataType !== definitionType && definition.id !== definitionUUID
		})
		if (this.state.definitions.length === 0) {
			delete this.state.definitions
		}
		return this
	}

	setValues(attributevalues) {
		this.state.attributeValues = Object.keys(attributevalues).map(key => {
			return { key, value: attributevalues[key] }
		})
		return this
	}

	addValue(attributeUUID, value) {
		this.state.attributeValues.push({
			key: attributeUUID,
			value
		})
		return this
	}

	removeValue(attributeUUID) {
		this.state.attributeValues = this.state.attributeValues.filter(attributeValue => {
			return attributeValue.key !== attributeUUID
		})
		return this
	}

	clearAllAttributeValues() {
		this.state.attributevalues = []
		return this
	}

	setUUID(uuid) {
		this.state.id = uuid
		return this
	}

	setType(type) {
		this.state.dataType = type
		return this
	}

	addSuperClass(type, uuid) {
		this.state.superClasses.push({
			id: uuid,
			dataType: type
		})
		return this
	}

	setSuperClasses(arr) {
		this.state.superClasses = arr
	}

	print() {
		return this.state
	}
}
