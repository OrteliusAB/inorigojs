/*
 * The entity factory is responsible for generating transactions containing multiple entity values.
 * The entity factory was originally meant to do what Entity.js now does, and some of these functions have been kept for compatibility reasons.
 */

export class EntityFactory {
	/* DEPRECATED */
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

	/* DEPRECATED */
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

	/* DEPRECATED */
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

	/* DEPRECATED */
	setObjectUUID(entityJSON, uuid) {
		const newEntityJSON = { ...entityJSON }
		newEntityJSON.id = uuid
		return newEntityJSON
	}

	/* DEPRECATED */
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

	/* DEPRECATED */
	clearAllAttributeValues(entityJSON) {
		const newEntityJSON = { ...entityJSON }
		newEntityJSON.attributeValues = []
		return newEntityJSON
	}

	/* DEPRECATED */
	clearAttributeValue(entityJSON, attributeUUID) {
		const newEntityJSON = { ...entityJSON }
		if (newEntityJSON.attributeValues === undefined) {
			newEntityJSON.attributeValues = []
		}
		const newAttributeArray = newEntityJSON.attributeValues.filter(attributeValue => attributeValue.key !== attributeUUID)
		newEntityJSON.attributevalues = newAttributeArray
		return newEntityJSON
	}

	/**
	 * Creates a new transaction object.
	 * @param {boolean} ignoreWarnings - Should warnings from Inorigo be ignored?
	 * @return {EntityFactory} - this
	 */
	createNewTransaction(ignoreWarnings) {
		const transaction = {
			ignoreWarnings,
			operations: []
		}
		return transaction
	}

	/**
	 * Adds a create operation to the transaction.
	 * @param {string} transaction - The transaction object
	 * @param {string} data - Entity to be added
	 * @return {EntityFactory} - this
	 */
	addCreateToTransaction(transaction, data) {
		const action = {
			action: "Create",
			target: data
		}
		transaction.operations.push(action)
		return transaction
	}

	/**
	 * Adds a delete operation to the transaction.
	 * @param {string} transaction - The transaction object
	 * @param {string} data - Entity to be deleted
	 * @return {EntityFactory} - this
	 */
	addDeleteToTransaction(transaction, data) {
		const action = {
			action: "Delete",
			target: data
		}
		transaction.operations.push(action)
		return transaction
	}

	/**
	 * Adds an update operation to the transaction.
	 * @param {string} transaction - The transaction object
	 * @param {string} data - Entity to be updated
	 * @return {EntityFactory} - this
	 */
	addUpdateToTransaction(transaction, data) {
		const action = {
			action: "Update",
			target: data
		}
		transaction.operations.push(action)
		return transaction
	}
}
