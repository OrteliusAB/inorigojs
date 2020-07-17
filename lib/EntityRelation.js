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
      payload: {
        kind: "EntityDTO",
        dataType: type ? type : "AsDefinitionRel",
        id: uuid ? uuid : null,
        attributeValues: []
      },
      leftDefinitionType: "AsDefinition",
      rightDefinitionType: "AsDefinition"
    };
  }
  /**
   * Sets the definition of this entity
   */


  _createClass(EntityRelation, [{
    key: "setDefinition",
    value: function setDefinition(type, uuid) {
      this.state.payload.definitions = [{
        kind: "EntityDTO",
        dataType: type,
        id: uuid
      }];
      return this;
    }
    /**
     * Sets the UUID (Universal Unique Identifier)
     */

  }, {
    key: "setUUID",
    value: function setUUID(uuid) {
      this.state.payload.id = uuid;
      return this;
    }
    /**
     * Sets the definition of this entity (default value is AsDefinitionRel)
     */

  }, {
    key: "setType",
    value: function setType(type) {
      this.state.payload.dataType = type;
      return this;
    }
    /** 
     * Sets the definition type of the left relation (default value is AsDefinition)
     */

  }, {
    key: "setLeftDefinitionType",
    value: function setLeftDefinitionType(leftDefinitionType) {
      this.state.leftDefinitionType = leftDefinitionType;
      return this;
    }
    /** 
     * Sets the definition type of the right relation (default value is AsDefinition)
     */

  }, {
    key: "setRightDefinitionType",
    value: function setRightDefinitionType(rightDefinitionType) {
      this.state.rightDefinitionType = rightDefinitionType;
      return this;
    }
    /**
     * Sets the relations on this
     */

  }, {
    key: "setRelations",
    value: function setRelations(relationSpecifierID, leftID, rightID) {
      this.state.payload.attributeValues = [{
        key: "objectOneID",
        name: "objectOneID",
        dataType: this.state.leftDefinitionType,
        value: leftID
      }, {
        key: "objectTwoID",
        name: "objectTwoID",
        dataType: this.state.rightDefinitionType,
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
      return this.state.payload;
    }
  }]);

  return EntityRelation;
}();

exports.default = EntityRelation;