"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class to create a payload for relations
 */
var EntityRelation = /*#__PURE__*/function () {
  function EntityRelation(type, uuid) {
    _classCallCheck(this, EntityRelation);

    this.state = {
      kind: "EntityDTO",
      dataType: type,
      id: uuid,
      applicableAttributes: [],
      attributeValues: []
    };
  }
  /**
   * Sets the definition of this entity
   * @param {type of the definition} type 
   * @param {UUID of the definition} uuid 
   */


  _createClass(EntityRelation, [{
    key: "setDefinition",
    value: function setDefinition(type, uuid) {
      this.state.definitions = [{
        kind: "EntityDTO",
        dataType: type,
        id: uuid
      }];
      return this;
    }
    /**
     * Sets the UUID (Universal Unique Identifier)
     * @param {UUID to set} uuid 
     */

  }, {
    key: "setUUID",
    value: function setUUID(uuid) {
      this.state.id = uuid;
      return this;
    }
    /**
     * Sets the definition of this entity
     * @param {type of the definition} type 
     */

  }, {
    key: "setType",
    value: function setType(type) {
      this.state.dataType = type;
      return this;
    }
    /**
     * Sets the relations on this
     * @param {UUID of the relation specifier} relationSpecifierID 
     * @param {UUID of the left associated object} leftID
     * @param {UUID of the right associated object} rightID
     * @param {UUID of the left associated object} leftDefinitionType
     * @param {UUID of the right associated object} rightDefinitionType
     */

  }, {
    key: "setRelations",
    value: function setRelations(relationSpecifierID, leftID, rightID, leftDefinitionType, rightDefinitionType) {
      this.state.applicableAttributes = [{
        key: "objectOneID",
        name: "objectOneID",
        dataType: leftDefinitionType ? leftDefinitionType : "AsDefinition",
        sequence: 0,
        multiplicity: "1",
        disabled: false
      }, {
        key: "objectTwoID",
        name: "objectTwoID",
        dataType: rightDefinitionType ? rightDefinitionType : "AsDefinition",
        sequence: 0,
        multiplicity: "1",
        disabled: false
      }, {
        key: "parentSeq",
        name: "parentSeq",
        dataType: "Integer",
        sequence: 0,
        multiplicity: "1",
        disabled: false
      }, {
        key: "relationSpecifierID",
        name: "relationSpecifierID",
        dataType: "UnRel",
        sequence: 0,
        multiplicity: "1",
        disabled: false
      }, {
        key: "seq",
        name: "seq",
        dataType: "Integer",
        sequence: 0,
        multiplicity: "1",
        disabled: false
      }];
      this.state.attributeValues = [{
        key: "objectOneID",
        name: "objectOneID",
        dataType: leftDefinitionType ? leftDefinitionType : "AsDefinition",
        value: leftID
      }, {
        key: "objectTwoID",
        name: "objectTwoID",
        dataType: rightDefinitionType ? rightDefinitionType : "AsDefinition",
        value: rightID
      }, {
        key: "parentSeq",
        name: "parentSeq",
        dataType: "Integer",
        value: 0
      }, {
        key: "relationSpecifierID",
        name: "relationSpecifierID",
        dataType: "UnRel",
        value: relationSpecifierID
      }, {
        key: "seq",
        name: "seq",
        dataType: "Integer",
        value: 1
      }];
      return this;
    }
    /**
     * Returns the json presentation of this object
     */

  }, {
    key: "print",
    value: function print() {
      return this.state;
    }
  }]);

  return EntityRelation;
}();

exports.default = EntityRelation;