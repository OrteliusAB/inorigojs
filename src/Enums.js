/*
 * InorigoEnums is a class to help map up some commonly used keys found in Inorigos system objects.
*/
export default class InorigoEnums {

    relationDirections() {
        return {
            UP: "UP",
            DOWN: "DOWN",
            BOTH: "BOTH"
        }
    }

    relationCategories() {
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
        }
    }

    relationTypes() {
        return {
            CLASSIFIES_IS_A_KIND_OF: "2B718A48-8516-44B6-BE89-5F33C39E300B",
            CONTAINS_INCLUDED_IN: "4E8288FC-2B90-4810-B33C-C5F673E8E839",
            CONSIST_OF_IS_A_PART_OF: "71866D57-18A7-48D5-AC96-8BFCCB7F5FD3",
            IMPLEMENTS_IMPLEMENTED_BY: "4AE64F99-A83A-4A42-82A1-BD158D11DAB8",
            UTILIZES_UTILIZED_BY: "3906C5B4-8CAA-4B5C-8964-A43FF3268631"
        }
    }

    entityTypes() {
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
        }
    }

    entityInformationTypes() {
        return {
            ATTRIBUTES: 'Attributes',
            VALUES: 'Values',
            PRESENTATION: 'Presentation'
        }
    }
}