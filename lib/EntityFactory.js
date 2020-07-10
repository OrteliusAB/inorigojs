"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * The entity factory is responsible for generating transactions containing multiple entity values.
 * The entity factory was originally meant to do what Entity.js now does, and some of these functions have been kept for compatibility
 * These function will however be removed in the future, so it is recommended to stay away from them.
*/
var EntityFactory = /*#__PURE__*/function () {
  function EntityFactory() {
    _classCallCheck(this, EntityFactory);
  }

  _createClass(EntityFactory, [{
    key: "createNewEntityJSON",

    /* TO BE DEPRECATED */
    value: function createNewEntityJSON(entityType, definitionType, definitionUUID, values, initUUID) {
      var _this = this;

      var newObject = {
        kind: "EntityDTO",
        dataType: entityType,
        definitions: [{
          kind: "EntityDTO",
          dataType: definitionType,
          id: definitionUUID
        }]
      };

      if (values !== undefined) {
        Object.keys(values).forEach(function (key) {
          newObject = _this.setAttributeValue(newObject, key, values[key]);
        });
      }

      if (initUUID !== undefined) {
        newObject = this.setObjectUUID(newObject, initUUID);
      }

      return newObject;
    }
    /* TO BE DEPRECATED */

  }, {
    key: "createExistingEntityJSON",
    value: function createExistingEntityJSON(entityType, entityUUID, values) {
      var _this2 = this;

      var existingObject = {
        kind: "EntityDTO",
        dataType: entityType,
        id: entityUUID
      };

      if (values !== undefined) {
        Object.keys(values).forEach(function (key) {
          existingObject = _this2.setAttributeValue(existingObject, key, values[key]);
        });
      }

      return existingObject;
    }
    /* TO BE DEPRECATED */

  }, {
    key: "addDefinition",
    value: function addDefinition(entityJSON, definitionType, definitionUUID) {
      var newEntityJSON = _objectSpread({}, entityJSON);

      if (newEntityJSON.definitions === undefined) {
        newEntityJSON.definitions = [];
      }

      newEntityJSON.definitions.push({
        kind: "EntityDTO",
        dataType: definitionType,
        id: definitionUUID
      });
      return newEntityJSON;
    }
    /* TO BE DEPRECATED */

  }, {
    key: "setObjectUUID",
    value: function setObjectUUID(entityJSON, uuid) {
      var newEntityJSON = _objectSpread({}, entityJSON);

      newEntityJSON.id = uuid;
      return newEntityJSON;
    }
    /* TO BE DEPRECATED */

  }, {
    key: "setAttributeValue",
    value: function setAttributeValue(entityJSON, attributeUUID, value) {
      var newEntityJSON = _objectSpread({}, entityJSON);

      if (newEntityJSON.attributeValues === undefined) {
        newEntityJSON.attributeValues = [];
      }

      newEntityJSON.attributeValues.push({
        key: attributeUUID,
        value: value
      });
      return newEntityJSON;
    }
    /* TO BE DEPRECATED */

  }, {
    key: "clearAllAttributeValues",
    value: function clearAllAttributeValues(entityJSON) {
      var newEntityJSON = _objectSpread({}, entityJSON);

      newEntityJSON.attributeValues = [];
      return newEntityJSON;
    }
    /* TO BE DEPRECATED */

  }, {
    key: "clearAttributeValue",
    value: function clearAttributeValue(entityJSON, attributeUUID) {
      var newEntityJSON = _objectSpread({}, entityJSON);

      if (newEntityJSON.attributeValues === undefined) {
        newEntityJSON.attributeValues = [];
      }

      var newAttributeArray = newEntityJSON.attributeValues.filter(function (attributeValue) {
        return attributeValue.key !== attributeUUID;
      });
      newEntityJSON.attributevalues = newAttributeArray;
      return newEntityJSON;
    }
  }, {
    key: "createNewTransaction",
    value: function createNewTransaction(ignoreWarnings) {
      var transaction = {
        ignoreWarnings: ignoreWarnings,
        operations: []
      };
      return transaction;
    }
  }, {
    key: "addCreateToTransaction",
    value: function addCreateToTransaction(transaction, data) {
      var action = {
        action: 'Create',
        target: data
      };
      transaction.operations.push(action);
      return transaction;
    }
  }, {
    key: "addDeleteToTransaction",
    value: function addDeleteToTransaction(transaction, data) {
      var action = {
        action: 'Delete',
        target: data
      };
      transaction.operations.push(action);
      return transaction;
    }
  }, {
    key: "addUpdateToTransaction",
    value: function addUpdateToTransaction(transaction, data) {
      var action = {
        action: 'Update',
        target: data
      };
      transaction.operations.push(action);
      return transaction;
    }
  }]);

  return EntityFactory;
}();

exports.default = EntityFactory;