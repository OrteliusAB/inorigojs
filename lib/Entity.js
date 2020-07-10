"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * This class is used to generate payloads for Inorigo's entity API.
 * The class is built with function chaining in mind, where a developer can quickly build an Inorigo entity.
*/
var Entity = /*#__PURE__*/function () {
  function Entity(type, uuid) {
    _classCallCheck(this, Entity);

    this.state = {
      kind: "EntityDTO",
      dataType: type,
      id: uuid,
      attributeValues: [],
      superClasses: []
    };
  }

  _createClass(Entity, [{
    key: "setDefinition",
    value: function setDefinition(definitionType, definitionUUID) {
      this.state.definitions = [{
        kind: "EntityDTO",
        dataType: definitionType,
        id: definitionUUID
      }];
      return this;
    }
  }, {
    key: "addDefinition",
    value: function addDefinition(definitionType, definitionUUID) {
      this.state.definitions || (this.state.definitions = []);
      this.state.definitions.push({
        kind: "EntityDTO",
        dataType: definitionType,
        id: definitionUUID
      });
      return this;
    }
  }, {
    key: "removeDefinition",
    value: function removeDefinition(definitionType, definitionUUID) {
      this.state.definitions = this.state.definitions.filter(function (definition) {
        return definition.dataType !== definitionType && definition.id !== definitionUUID;
      });

      if (this.state.definitions.length === 0) {
        delete this.state.definitions;
      }

      return this;
    }
  }, {
    key: "setValues",
    value: function setValues(attributevalues) {
      this.state.attributeValues = Object.keys(attributevalues).map(function (key) {
        return {
          key: key,
          value: attributevalues[key]
        };
      });
      return this;
    }
  }, {
    key: "addValue",
    value: function addValue(attributeUUID, value) {
      this.state.attributeValues.push({
        key: attributeUUID,
        value: value
      });
      return this;
    }
  }, {
    key: "removeValue",
    value: function removeValue(attributeUUID) {
      this.state.attributeValues = this.state.attributeValues.filter(function (attributeValue) {
        return attributeValue.key !== attributeUUID;
      });
      return this;
    }
  }, {
    key: "clearAllAttributeValues",
    value: function clearAllAttributeValues() {
      this.state.attributevalues = [];
      return this;
    }
  }, {
    key: "setUUID",
    value: function setUUID(uuid) {
      this.state.id = uuid;
      return this;
    }
  }, {
    key: "setType",
    value: function setType(type) {
      this.state.dataType = type;
      return this;
    }
  }, {
    key: "addSuperClass",
    value: function addSuperClass(type, uuid) {
      this.state.superClasses.push({
        id: uuid,
        dataType: type
      });
      return this;
    }
  }, {
    key: "setSuperClasses",
    value: function setSuperClasses(arr) {
      this.state.superClasses = arr;
    }
  }, {
    key: "print",
    value: function print() {
      return this.state;
    }
  }]);

  return Entity;
}();

exports.default = Entity;