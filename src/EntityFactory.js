/*
 * The entity factory is responsible for generating transactions containing multiple entity values.
 * The entity factory was originally meant to do what Entity.js now does, and some of these functions have been kept for compatibility
 * These function will however be removed in the future, so it is recommended to stay away from them.
 */

export default class EntityFactory {
	/* TO BE DEPRECATED */
	createNewEntityJSON(entityType, definitionType, definitionUUID, values, initUUID) {
		let newObject = {
			kind: "EntityDTO",
			dataType: entityType,
			definitions: [
				{
					kind: "EntityDTO",
					dataType: definitionType,
					id: definitionUUID
				}
			]
		}

		if (values !== undefined) {
			Object.keys(values).forEach(key => {
				newObject = this.setAttributeValue(newObject, key, values[key])
			})
		}

		if (initUUID !== undefined) {
			newObject = this.setObjectUUID(newObject, initUUID)
		}

		return newObject
	}

	/* TO BE DEPRECATED */
	createExistingEntityJSON(entityType, entityUUID, values) {
		let existingObject = {
			kind: "EntityDTO",
			dataType: entityType,
			id: entityUUID
		}

		if (values !== undefined) {
			Object.keys(values).forEach(key => {
				existingObject = this.setAttributeValue(existingObject, key, values[key])
			})
		}

		return existingObject
	}

	/* TO BE DEPRECATED */
	addDefinition(entityJSON, definitionType, definitionUUID) {
		const newEntityJSON = { ...entityJSON }
		if (newEntityJSON.definitions === undefined) {
			newEntityJSON.definitions = []
		}
		newEntityJSON.definitions.push({
			kind: "EntityDTO",
			dataType: definitionType,
			id: definitionUUID
		})
		return newEntityJSON
	}

	/* TO BE DEPRECATED */
	setObjectUUID(entityJSON, uuid) {
		const newEntityJSON = { ...entityJSON }
		newEntityJSON.id = uuid
		return newEntityJSON
	}

	/* TO BE DEPRECATED */
	setAttributeValue(entityJSON, attributeUUID, value) {
		const newEntityJSON = { ...entityJSON }
		if (newEntityJSON.attributeValues === undefined) {
			newEntityJSON.attributeValues = []
		}
		newEntityJSON.attributeValues.push({
			key: attributeUUID,
			value
		})
		return newEntityJSON
	}

	/* TO BE DEPRECATED */
	clearAllAttributeValues(entityJSON) {
		const newEntityJSON = { ...entityJSON }
		newEntityJSON.attributeValues = []
		return newEntityJSON
	}

	/* TO BE DEPRECATED */
	clearAttributeValue(entityJSON, attributeUUID) {
		const newEntityJSON = { ...entityJSON }
		if (newEntityJSON.attributeValues === undefined) {
			newEntityJSON.attributeValues = []
		}
		const newAttributeArray = newEntityJSON.attributeValues.filter(attributeValue => attributeValue.key !== attributeUUID)
		newEntityJSON.attributevalues = newAttributeArray
		return newEntityJSON
	}

	createNewTransaction(ignoreWarnings) {
		const transaction = {
			ignoreWarnings,
			operations: []
		}
		return transaction
	}

	addCreateToTransaction(transaction, data) {
		const action = {
			action: "Create",
			target: data
		}
		transaction.operations.push(action)
		return transaction
	}

	addDeleteToTransaction(transaction, data) {
		const action = {
			action: "Delete",
			target: data
		}
		transaction.operations.push(action)
		return transaction
	}

	addUpdateToTransaction(transaction, data) {
		const action = {
			action: "Update",
			target: data
		}
		transaction.operations.push(action)
		return transaction
	}
}
