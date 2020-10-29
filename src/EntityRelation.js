/**
 * Class to create a payload for relations
 */
export default class EntityRelation {
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
     * Sets the definition of this entity
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
     * Sets the UUID (Universal Unique Identifier)
     */
    setUUID(uuid) {
        this.state.payload.id = uuid
        return this
    }

    /**
     * Sets the definition of this entity (default value is AsDefinitionRel)
     */
    setType(type) {
        this.state.payload.dataType = type
        return this
    }
    /**
     * Sets the definition type of the left relation (default value is AsDefinition)
     */
    setLeftDefinitionType(leftDefinitionType) {
        this.state.leftDefinitionType = leftDefinitionType
        return this
    }
    /**
     * Sets the definition type of the right relation (default value is AsDefinition)
     */
    setRightDefinitionType(rightDefinitionType) {
        this.state.rightDefinitionType = rightDefinitionType
        return this
    }
    /**
     * Sets the relations on this
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
     * Returns the json presentation of this object
     */
    print() {
        return this.state.payload
    }
}
