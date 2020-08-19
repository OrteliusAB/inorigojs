"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * InorigoEnums is a class to help map up some commonly used keys found in Inorigos system objects.
*/
var InorigoEnums = /*#__PURE__*/function () {
  function InorigoEnums() {
    _classCallCheck(this, InorigoEnums);
  }

  _createClass(InorigoEnums, [{
    key: "relationDirections",
    value: function relationDirections() {
      return {
        UP: "UP",
        DOWN: "DOWN",
        BOTH: "BOTH"
      };
    }
  }, {
    key: "relationCategories",
    value: function relationCategories() {
      return {
        ASDEF_TO_PARENT: "AsDefinition",
        ASDEF_TO_ASDEF: "AsDefinitionRel",
        ASINS_TO_PARENT: "definitionGID",
        ASINS_TO_ASINS: "AsInstanceRel",
        SPECUN_TO_SPECUN: "CoNode",
        SPECUN_TO_PARENT: "sourceGID",
        GENUN_TO_GENUN: "CoNode",
        GENUN_TO_PARENT: "CoConceptTypeConcept",
        GENTYP_TO_PARENT: "CoConceptTypeRel",
        PROC_TO_PROC: "ChClassRel",
        GENERIC: "CoNode"
      };
    }
  }, {
    key: "relationTypes",
    value: function relationTypes() {
      return {
        CLASSIFIES_IS_A_KIND_OF: "2B718A48-8516-44B6-BE89-5F33C39E300B",
        CONTAINS_INCLUDED_IN: "4E8288FC-2B90-4810-B33C-C5F673E8E839",
        CONSIST_OF_IS_A_PART_OF: "71866D57-18A7-48D5-AC96-8BFCCB7F5FD3",
        IMPLEMENTS_IMPLEMENTED_BY: "4AE64F99-A83A-4A42-82A1-BD158D11DAB8",
        UTILIZES_UTILIZED_BY: "3906C5B4-8CAA-4B5C-8964-A43FF3268631"
      };
    }
  }, {
    key: "entityTypes",
    value: function entityTypes() {
      return {
        PROCESS_DEFINITION: "ChClass",
        USER: "UnUser",
        AUTH_RECORD: "UnUserAuth",
        ASSOCIATION_DEFINITION: "AsDefinition",
        ASSOCIATION: "AsInstance",
        GENERIC_TYPE: "CoConceptType",
        GENERIC_UNIT: "CoConcept",
        SPECIFIC_UNIT: "CoProduct",
        VERSO_VIEW: "GsCube",
        GEOGRAPHY_DEFINITION: "GeGeopType",
        GEOGRAPHY_AREA: "GeGeopArea",
        RESOURCE: "UnResource"
      };
    }
  }, {
    key: "entityInformationTypes",
    value: function entityInformationTypes() {
      return {
        ATTRIBUTES: 'Attributes',
        VALUES: 'Values',
        PRESENTATION: 'Presentation'
      };
    }
  }]);

  return InorigoEnums;
}();

exports.default = InorigoEnums;