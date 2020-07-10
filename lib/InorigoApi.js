"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var https = _interopRequireWildcard(require("https"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * This is the main API communication class.
 * This class contains functions that return communication instances of each respective API of Inorigo, but with one shared API class instance.
 * The class uses Axios under the hood to do the heavy lifting.
*/
var InorigoAPI = /*#__PURE__*/function () {
  function InorigoAPI(url, _ref) {
    var rejectUnauthorized = _ref.rejectUnauthorized,
        authorization = _ref.authorization,
        apiEndpoint = _ref.apiEndpoint;

    _classCallCheck(this, InorigoAPI);

    this.IS_SECURE = true;
    this.BASE_URL = url;
    this.BASE_URL_API = url += "services/api/v1/";
    this.DEFAULTCONFIG = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json",
        "Access-Control-Max-Age": 1728000
      },
      data: {},
      withCredentials: true
    };

    if (apiEndpoint) {
      this.BASE_URL_API = this.BASE_URL + apiEndpoint;
    }

    if (rejectUnauthorized !== undefined) {
      this.IS_SECURE = rejectUnauthorized;
      var agent = new https.Agent({
        rejectUnauthorized: rejectUnauthorized
      });
      this.DEFAULTCONFIG = _objectSpread(_objectSpread({}, this.DEFAULTCONFIG), {}, {
        httpsAgent: agent
      });
    }

    if (authorization) {
      if (authorization.username && authorization.password) {
        this.DEFAULTCONFIG.headers.Authorization = "Basic " + this.genericBtoA(authorization.username + ":" + authorization.password);
      }
    }
  }
  /* Security, Global Settings */


  _createClass(InorigoAPI, [{
    key: "injectCookies",
    value: function injectCookies(cookies) {
      this.DEFAULTCONFIG.headers.Cookie = cookies;
    }
    /* Account, Session */

  }, {
    key: "login",
    value: function login(username, password) {
      var CONFIG = {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Accept: "application/json",
          Authorization: "Basic " + this.genericBtoA(username + ":" + password)
        },
        data: {},
        withCredentials: true
      };

      if (!this.IS_SECURE) {
        CONFIG.httpsAgent = this.DEFAULTCONFIG.httpsAgent;
      }

      return _axios.default.post("".concat(this.BASE_URL, "services/open/login"), {}, CONFIG);
    }
  }, {
    key: "logout",
    value: function logout() {
      return _axios.default.post("".concat(this.BASE_URL, "services/open/logout"), {}, this.DEFAULTCONFIG);
    }
  }, {
    key: "getSession",
    value: function getSession() {
      return _axios.default.get("".concat(this.BASE_URL, "services/open/session/user"), this.DEFAULTCONFIG);
    }
    /* API Shortcuts (Common inorigo helper functions) */

  }, {
    key: "shortcuts",
    value: function shortcuts() {
      var _this = this;

      return {
        getClassifiedValuesList: function getClassifiedValuesList(definitionUUID, isDeep) {
          return new Promise(function (resolve, reject) {
            _this.entity().getSubClasses("AsDefinition", definitionUUID, isDeep).then(function (response) {
              var promises = response.data.entities.map(function (entity) {
                return _this.entity().getEntity("AsDefinition", entity.id);
              });
              Promise.all(promises).then(function (result) {
                var options = result.map(function (genderOption) {
                  return {
                    presentation: genderOption.data.presentation,
                    id: genderOption.data.id,
                    abstract: genderOption.data.attributeValues.filter(function (item) {
                      return item.name === "abstract";
                    })[0].value
                  };
                });
                resolve(options);
              });
            });
          });
        }
      };
    }
    /* Verso (Application Builder) */

  }, {
    key: "versoRuntime",
    value: function versoRuntime() {
      var _this2 = this;

      return {
        refresh: function refresh(vrid) {
          return _axios.default.post("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/refresh"), {}, _this2.DEFAULTCONFIG);
        },
        calculate: function calculate(vrid) {
          return _axios.default.post("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/calculate"), {}, _this2.DEFAULTCONFIG);
        },
        clear: function clear(vrid, where) {
          return _axios.default.post("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/select/clear").concat(_this2.buildURIParams({
            where: where
          })), {}, _this2.DEFAULTCONFIG);
        },
        getValue: function getValue(vrid, where) {
          return _axios.default.get("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/variable/value?key=").concat(where), _this2.DEFAULTCONFIG);
        },
        selectOne: function selectOne(vrid, where, what, isClearFirst) {
          return _axios.default.post("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/select/one").concat(_this2.buildURIParams({
            where: where,
            what: what,
            clear: isClearFirst
          })), {}, _this2.DEFAULTCONFIG);
        },
        selectMany: function selectMany(vrid, selectionJSON) {
          return _axios.default.post("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/select/many"), selectionJSON, _this2.DEFAULTCONFIG);
        },
        countAll: function countAll(vrid, where) {
          return _axios.default.get("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/items/count/all?where=").concat(where), _this2.DEFAULTCONFIG);
        },
        countSelected: function countSelected(vrid, where) {
          return _axios.default.get("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/items/count/selected?where=").concat(where), _this2.DEFAULTCONFIG);
        },
        countExplicit: function countExplicit(vrid, where) {
          return _axios.default.get("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/items/count/explicit?where=").concat(where), _this2.DEFAULTCONFIG);
        },
        countImplicit: function countImplicit(vrid, where) {
          return _axios.default.get("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/items/count/implicit?where=").concat(where), _this2.DEFAULTCONFIG);
        },
        getScript: function getScript(vrid) {
          return _axios.default.get("".concat(_this2.BASE_URL_API, "application/runtime/").concat(vrid, "/script"), _this2.DEFAULTCONFIG);
        }
      };
    }
    /* Knowledgeset (Flattened Structure) */

  }, {
    key: "knowledgeset",
    value: function knowledgeset() {
      var _this3 = this;

      return {
        getMetaData: function getMetaData(uuid) {
          return _axios.default.post("".concat(_this3.BASE_URL_API, "knowledgeset/").concat(uuid, "?metadata=true&page=1&pagesize=0"), {}, _this3.DEFAULTCONFIG);
        },
        getResult: function getResult(uuid, isDistinct, page, pagesize, parameters, allowCache) {
          var uriParams = {
            metadata: true,
            distinct: isDistinct,
            page: page,
            pagesize: pagesize
          };

          if (allowCache !== undefined && allowCache !== null) {
            uriParams.allowcache = "" + allowCache;
          }

          return _axios.default.post("".concat(_this3.BASE_URL_API, "knowledgeset/").concat(uuid).concat(_this3.buildURIParams(uriParams)), parameters !== undefined && parameters !== null ? {
            parameters: parameters
          } : {}, _this3.DEFAULTCONFIG);
        },
        getTreeResult: function getTreeResult(uuid, metaData, compactLeafs, parameters, allowCache) {
          var uriParams = {
            metadata: metaData,
            compactleafs: compactLeafs
          };

          if (allowCache !== undefined && allowCache !== null) {
            uriParams.allowcache = "" + allowCache;
          }

          return _axios.default.post("".concat(_this3.BASE_URL_API, "knowledgeset/tree/").concat(uuid).concat(_this3.buildURIParams(uriParams)), parameters !== undefined && parameters !== null ? {
            parameters: parameters
          } : {}, _this3.DEFAULTCONFIG);
        },
        getAvailable: function getAvailable() {
          return _axios.default.get("".concat(_this3.BASE_URL_API, "knowledgeset/list"), _this3.DEFAULTCONFIG);
        },
        query: function query(uuid, _query) {
          return _axios.default.post("".concat(_this3.BASE_URL_API, "knowledgeset/").concat(uuid, "/query?sql=").concat(_query), {}, _this3.DEFAULTCONFIG);
        },
        countRows: function countRows(uuid, isDistinct) {
          return _axios.default.post("".concat(_this3.BASE_URL_API, "knowledgeset/").concat(uuid, "/count").concat(_this3.buildURIParams({
            distinct: isDistinct
          })), {}, _this3.DEFAULTCONFIG);
        }
      };
    }
    /* Entity (Data Objects) */

  }, {
    key: "entity",
    value: function entity() {
      var _this4 = this;

      return {
        generateUUID: function generateUUID(count) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/generateid").concat(_this4.buildURIParams({
            count: count
          })), _this4.DEFAULTCONFIG);
        },
        getEntity: function getEntity(entityType, uuid) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid, "/"), _this4.DEFAULTCONFIG);
        },
        getinstances: function getinstances(entityType, uuid, informationType, page, pagesize) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid, "/instances").concat(_this4.buildURIParams({
            info: informationType,
            page: page,
            pagesize: pagesize
          })), _this4.DEFAULTCONFIG);
        },
        partners: function partners(entityType, uuid, relationUuid, direction, isRecursive, isLeafsOnly, informationType, page, pagesize) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid, "/partners").concat(_this4.buildURIParams({
            relation: relationUuid,
            direction: direction,
            recursive: isRecursive,
            leafsonly: isLeafsOnly,
            info: informationType,
            page: page,
            pagesize: pagesize
          })), _this4.DEFAULTCONFIG);
        },
        getDefinitions: function getDefinitions(entityType, uuid, isDeep, informationType, page, pagesize) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid, "/definitions").concat(_this4.buildURIParams({
            deep: isDeep,
            info: informationType,
            page: page,
            pagesize: pagesize
          })), _this4.DEFAULTCONFIG);
        },
        getSuperClasses: function getSuperClasses(entityType, uuid, isDeep, informationType, page, pagesize) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid, "/superclasses?deep=").concat(_this4.buildURIParams({
            deep: isDeep,
            info: informationType,
            page: page,
            pagesize: pagesize
          })), _this4.DEFAULTCONFIG);
        },
        getSubClasses: function getSubClasses(entityType, uuid, isDeep, informationType, page, pagesize) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid, "/subclasses").concat(_this4.buildURIParams({
            deep: isDeep,
            info: informationType,
            page: page,
            pagesize: pagesize
          })), _this4.DEFAULTCONFIG);
        },
        getReferents: function getReferents(entityType, uuid, page, pagesize) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid, "/referents").concat(_this4.buildURIParams({
            page: page,
            pagesize: pagesize
          })), _this4.DEFAULTCONFIG);
        },
        getRelations: function getRelations(entityType, uuid, relationUuid, direction, page, pagesize) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid, "/relations").concat(_this4.buildURIParams({
            specifier: relationUuid,
            direction: direction,
            page: page,
            pagesize: pagesize
          })), _this4.DEFAULTCONFIG);
        },
        updateEntity: function updateEntity(entityJSON) {
          return _axios.default.put("".concat(_this4.BASE_URL_API, "entity"), entityJSON, _this4.DEFAULTCONFIG);
        },
        createEntity: function createEntity(entityJSONArray) {
          return _axios.default.post("".concat(_this4.BASE_URL_API, "entity"), entityJSONArray, _this4.DEFAULTCONFIG);
        },
        transaction: function transaction(transactionData) {
          return _axios.default.post("".concat(_this4.BASE_URL_API, "entity/commit/transaction"), transactionData, _this4.DEFAULTCONFIG);
        },
        deleteEntity: function deleteEntity(entityType, uuid) {
          return _axios.default.delete("".concat(_this4.BASE_URL_API, "entity/").concat(entityType, "/").concat(uuid), _this4.DEFAULTCONFIG);
        },
        getSimplifiedInstances: function getSimplifiedInstances(definitionUUID) {
          return _axios.default.get("".concat(_this4.BASE_URL_API, "entity/AsDefinition/").concat(definitionUUID, "/instances?info=values"), _this4.DEFAULTCONFIG).then(function (result) {
            var simplifiedJSON = result.data.entities.map(function (entity) {
              var newEntity = {
                id: entity.id,
                type: entity.dataType
              };
              newEntity.values = entity.attributeValues.reduce(function (simplifiedOilEntity, attributeValue) {
                simplifiedOilEntity[attributeValue.name] = attributeValue.value;
                return simplifiedOilEntity;
              }, {});
              return newEntity;
            });
            return new Promise(function (resolve, reject) {
              resolve(simplifiedJSON);
            });
          });
        }
      };
    }
    /* Resource (Files) */

  }, {
    key: "resource",
    value: function resource() {
      var _this5 = this;

      return {
        getResource: function getResource(uuid) {
          return _axios.default.get("".concat(_this5.BASE_URL_API, "resource/resource/").concat(uuid, "/"), _this5.DEFAULTCONFIG);
        },
        deleteResource: function deleteResource(uuid) {
          return _axios.default.delete("".concat(_this5.BASE_URL_API, "resource/resource/").concat(uuid), _this5.DEFAULTCONFIG);
        },
        createResource: function createResource(resourceJSONArray) {
          return _axios.default.post("".concat(_this5.BASE_URL_API, "resource/resource"), resourceJSONArray, _this5.DEFAULTCONFIG);
        },
        updateResource: function updateResource(resourceJSONArray) {
          return _axios.default.put("".concat(_this5.BASE_URL_API, "resource/resource"), resourceJSONArray, _this5.DEFAULTCONFIG);
        }
      };
    }
    /* Utility Functions */

  }, {
    key: "buildURIParams",
    value: function buildURIParams(object) {
      var returnString = ""; //Stringify removes the undefined values

      var tempObj = JSON.stringify(object);

      if (tempObj !== JSON.stringify({})) {
        returnString = "?";
      }

      tempObj = JSON.parse(tempObj);
      return returnString + Object.keys(tempObj).map(function (key) {
        return [key, tempObj[key]].map(encodeURIComponent).join("=");
      }).join("&");
    }
  }, {
    key: "genericBtoA",
    value: function genericBtoA(b) {
      if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && Object.prototype.toString.call(process) === '[object process]') {
        //If running in node, use Buffer
        return Buffer.from(b).toString("base64");
      } else {
        //If running in browser, use btoa()
        return btoa(b);
      }
    }
  }]);

  return InorigoAPI;
}();

exports.default = InorigoAPI;