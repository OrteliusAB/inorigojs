"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * The parser is used to transform data from Inorigo in different ways, as well as extract meta data.
*/
var Parser = /*#__PURE__*/function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }

  _createClass(Parser, [{
    key: "parseRawKSToJSON",
    value: function parseRawKSToJSON(dataSetOriginal) {
      var dataSet = _objectSpread({}, dataSetOriginal);

      var columns = dataSet.dataSets[0].metadata.columns;
      var rows = dataSet.dataSets[0].rows;
      return this.parseKSToTree(columns, rows);
    }
  }, {
    key: "groupColumns",
    value: function groupColumns(columns) {
      var colsArray = [];
      var groupedPaths = [];
      var prevPath = [];
      var prevParentPath = "";
      var group = 0;
      columns.forEach(function (column) {
        var currentPath = column.path.slice(0, column.path.length - 1);
        var pathIsEqual = JSON.stringify(prevPath) === JSON.stringify(currentPath);
        var parentPath = column.path[column.path.length - 2];
        var parentIsEqual = parentPath === prevParentPath;

        if (!parentIsEqual) {
          group++;
          var parentObj = {};
          parentObj.title = parentPath;
          parentObj.path = currentPath;
          parentObj.isParent = true;
          parentObj.group = group;
          colsArray.push(parentObj);
        }

        if (!pathIsEqual) {
          group++;
        }

        var colObj = {};
        colObj.title = column.title;
        colObj.path = currentPath;
        colObj.group = group;
        colObj.isParent = false;
        colsArray.push(colObj);
        prevPath = currentPath;
        prevParentPath = parentPath;
      });
      var grouped = this.groupBy(colsArray, "group");
      groupedPaths = Object.values(grouped);
      return groupedPaths;
    }
  }, {
    key: "parseKSToTree",
    value: function parseKSToTree(column, row) {
      var _this = this;

      var columns = this.copyObject(column);
      var rows = this.copyObject(row); //Loop through all columns and determine the object breakpoints, metadata, and relationships

      var objectIndex = [];
      var relationIndex = {};
      var lastIndex = 0;
      var keyMap = {};
      columns.forEach(function (column) {
        //If we find "ID" it means this is a new object definition
        //Store the path (minus the last object, since that is an attribute) with the index where the object begins
        if (column.path.includes("ID")) {
          keyMap[JSON.stringify(column.path).replace(',"ID"]', "]")] = column.index;
        } //If it is a new object definition (and not the origin), or if it is the last index in the table


        if (column.path.includes("ID") && column.index !== 0 || column.index === columns.length - 1) {
          //Set the names of the definition columns
          var columnTitles = []; //If it's the final item then we have to make sure to push the last column too..

          var lessThan = column.index === columns.length - 1 ? column.index + 1 : column.index;

          for (var i = lastIndex; i < lessThan; i++) {
            columnTitles.push(columns[i].title);
          } //Where does the definition start, and end. What are the column titles, etc.


          objectIndex.push({
            start: lastIndex,
            end: lessThan,
            columns: columnTitles,
            title: columns[lastIndex].path[columns[lastIndex].path.length - 2]
          }); //There could be a gap if the closest parent is not included in the actual data. Find the closest existing parent.

          var isFound = false;
          var hierarchySteps = 2;

          while (!isFound) {
            if (keyMap[JSON.stringify(columns[lastIndex].path.slice().splice(0, columns[lastIndex].path.length - hierarchySteps))] !== undefined) {
              isFound = true;
            } else if (columns[lastIndex].path.slice().splice(0, columns[lastIndex].path.length - hierarchySteps).length === 0) {
              isFound = true;
            } else {
              hierarchySteps++;
            }
          } //What previous definition owns this definition?
          //Remove the last two objects from the path and lookup the startindex of the parent object


          var parent = keyMap[JSON.stringify(columns[lastIndex].path.slice().splice(0, columns[lastIndex].path.length - hierarchySteps))];

          if (parent !== undefined) {
            if (relationIndex[parent] === undefined) {
              relationIndex[parent] = [];
            }

            relationIndex[parent].push(lastIndex);
          } //Prepare for next column


          lastIndex = column.index;
        }
      }); //Split the input row array into arrays per object definitions identified
      //Store them by definition start index

      var rowObjects = {};
      objectIndex.forEach(function (objIndex) {
        var processedIDs = [];
        var values = rows.map(function (row) {
          return row.cells.slice(objIndex.start, objIndex.end);
        }) //Clear duplicates
        .filter(function (row) {
          if (processedIDs.includes(row[0])) return false;else processedIDs.push(row[0]);
          return true;
        }) //Convert to objects using the definition data
        .map(function (row) {
          var object = {};

          for (var i = 0; i < objIndex.columns.length; i++) {
            object[objIndex.columns[i]] = row[i];
          }

          return object;
        });
        rowObjects[objIndex.start] = values;
      }); //Build the result set by connecting all the dots

      rows.forEach(function (row) {
        _this.buildResultSetRecursive(0, row, rowObjects, relationIndex, objectIndex);
      });
      var result = rowObjects[0];
      return result;
    }
  }, {
    key: "buildResultSetRecursive",
    value: function buildResultSetRecursive(currentIndex, row, rowObjects, relationIndex, objectIndex) {
      var _this2 = this;

      var currentObject = rowObjects[currentIndex].filter(function (rowObj) {
        return rowObj.ID === row.cells[currentIndex];
      })[0];

      if (relationIndex[currentIndex] !== undefined) {
        relationIndex[currentIndex].forEach(function (childIndex) {
          if (row.cells[childIndex] !== undefined) {
            var attrName = objectIndex.filter(function (objIndex) {
              return objIndex.start === childIndex;
            })[0].title;
            var objValue = rowObjects[childIndex].filter(function (childObj) {
              return childObj.ID === row.cells[childIndex];
            });

            if (currentObject[attrName] === undefined) {
              currentObject[attrName] = [];
            }

            if (currentObject[attrName].filter(function (item) {
              return item.ID === objValue[0].ID;
            }).length === 0 && objValue[0].ID !== null) {
              currentObject[attrName].push(objValue[0]);
            } //Now go recursively down!


            _this2.buildResultSetRecursive(childIndex, row, rowObjects, relationIndex, objectIndex);
          }
        });
      }
    } // *** HELPERS *** //

  }, {
    key: "copyObject",
    value: function copyObject(o) {
      var out, v, key;
      out = Array.isArray(o) ? [] : {};

      for (key in o) {
        v = o[key];
        out[key] = _typeof(v) === "object" && v !== null ? this.copyObject(v) : v;
      }

      return out;
    }
  }, {
    key: "groupBy",
    value: function groupBy(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
  }]);

  return Parser;
}();

exports.default = Parser;