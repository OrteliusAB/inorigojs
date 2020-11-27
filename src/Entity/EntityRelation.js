/**
 * Helper class to create relation entities
 */
export class EntityRelation {
	/**
	 * The constructor can optionally take a type and a UUID. By default an Association Definition relation will be created. If this is not intended then a different type has to be set.
	 * @param {string} type - Inorigo type
	 * @param {string} uuid - Inorigo compatible UUID
	 */
	constructor(type, uuid) {
		this.state = {
			payload: {
				kind: "EntityDTO",
				dataType: type ? type : "AsDefinitionRel",
				id: uuid ? uuid : null,
				attributeValues: []
			},
			leftDefinitionType: "AsDefinition",
			rightDefinitionType: "AsDefinition"
		}
	}

	/**
	 * Sets the definition of the entity, overwriting any existing value(s).
	 * @param {string} definitionType - Inorigo type
	 * @param {string} definitionUUID - Inorigo compatible UUID
	 * @returns {EntityRelation} - This
	 */
	setDefinition(type, uuid) {
		this.state.payload.definitions = [
			{
				kind: "EntityDTO",
				dataType: type,
				id: uuid
			}
		]
		return this
	}

	/**
	 * Sets the UUID of the entity.
	 * @param {string} uuid - The uuid
	 * @returns {EntityRelation} - This
	 */
	setUUID(uuid) {
		this.state.payload.id = uuid
		return this
	}

	/**
	 * Sets the type of the entity.
	 * @param {string} type - The type
	 * @returns {EntityRelation} - This
	 */
	setType(type) {
		this.state.payload.dataType = type
		return this
	}

	/**
	 * Sets the type of the left entity (From direction).
	 * @param {string} leftDefinitionType - The type
	 * @returns {EntityRelation} - This
	 */
	setLeftDefinitionType(leftDefinitionType) {
		this.state.leftDefinitionType = leftDefinitionType
		return this
	}

	/**
	 * Sets the type of the left entity (To direction).
	 * @param {string} rightDefinitionType - The type
	 * @returns {EntityRelation} - This
	 */
	setRightDefinitionType(rightDefinitionType) {
		this.state.rightDefinitionType = rightDefinitionType
		return this
	}

	/**
	 * Sets the relation data of the entity.
	 * @param {string} relationSpecifierID - The UUID of the relation
	 * @param {string} leftID - The UUID of the left entity
	 * @param {string} rightID - The UUID of the right entity
	 * @returns {EntityRelation} - This
	 */
	setRelations(relationSpecifierID, leftID, rightID) {
		this.state.payload.attributeValues = [
			{
				key: "objectOneID",
				name: "objectOneID",
				dataType: this.state.leftDefinitionType,
				value: leftID
			},
			{
				key: "objectTwoID",
				name: "objectTwoID",
				dataType: this.state.rightDefinitionType,
				value: rightID
			},
			{
				key: "parentSeq",
				name: "parentSeq",
				dataType: "Integer",
				value: 0
			},
			{
				key: "relationSpecifierID",
				name: "relationSpecifierID",
				dataType: "UnRel",
				value: relationSpecifierID
			},
			{
				key: "seq",
				name: "seq",
				dataType: "Integer",
				value: 1
			}
		]
		return this
	}

	/**
	 * Returns the entity JSON in an inorigo compatible format.
	 * @returns {object} - The entity JSON
	 */
	print() {
		return this.state.payload
	}
}
