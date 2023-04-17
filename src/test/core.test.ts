import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { CoreAPI } from "../API/CoreAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const coreAPI: CoreAPI = inorigoAPI.getCoreAPI()

describe("core...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("assert coreAPI", () => {
		assert.exists(coreAPI)
	})

	it("getEntityPresentation(...) [/core/presentation/{type}/{uuid}]", async () => {
		try {
			const response = await coreAPI.getEntityPresentation("AsInstance", "578A446C-E919-2353-DDB9-AF6300F5695F")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getFilter(uuid) [/core/filter/definition/{uuid}]", async () => {
		try {
			const response = await coreAPI.getFilter("6e29d6be-85d0-1a63-d680-a3b500df3adb")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("runFilter(...) [/core/filter/run]", async () => {
		try {
			const payload = {
				kind: "FilterQuery",
				id: "6e29d6be-85d0-1a63-d680-a3b500df3adb",
				name: "Countries",
				dataType: "GeGeopArea",
				dataContextID: "64c3dcc8-de9b-408c-3299-a38d008c8fc7",
				operator: "AND",
				criteria: [
					{
						kind: "Definition",
						qualifier: "KIND_OF",
						dataType: "GeGeopType",
						value: {
							kind: "GlobalID",
							uuid: "7fa79d62-33fa-4fd0-b2a5-91e868e27636",
							type: "GeGeopType"
						}
					}
				]
			}
			const response = await coreAPI.runFilter(payload, true, true)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getTranslation(...) [/core/translate]", async () => {
		const response = await coreAPI.getTranslation("CONFIRM_DELETE_HEAD")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getAttributeDefinition( [/core/attribute/definition]", async () => {
		const response = await coreAPI.getAttributeDefinition(
			"6630E548-8E42-1206-8B2B-AF6300EEE420",
			"C2ED6335-C1A0-C115-FD2C-AF6300EB2477",
			"AsDefinition",
			"AsInstance"
		)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getPossibleAttributeValues(...) [/core/attribute/value/list]", async () => {
		const response = await coreAPI.getPossibleAttributeValues("6A9E4AEB-B873-0AE2-9ACC-AF6300F74001")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getPossibleAttributeValuesCount(...)[/core/attribute/value/count]", async () => {
		const response = await coreAPI.getPossibleAttributeValuesCount("6A9E4AEB-B873-0AE2-9ACC-AF6300F74001", "", "AsInstance", "", true, true)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getEntityTypeCount(...) [/core/count/entity/{entityType}]", async () => {
		const response = await coreAPI.getEntityTypeCount("UnResource")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getRelationSpecifierName(...) [/core/relation/specifier/name]", async () => {
		const response = await coreAPI.getRelationSpecifierName("2B718A48-8516-44B6-BE89-5F33C39E300B", "Both")
		expect(response.status).equal(200)
	})

	it("getEntityConfigByRequest(...) [/core/get/entity/config]", async () => {
		const data = {
			dataContextID: "64C3DCC8-DE9B-408C-3299-A38D008C8FC7",
			includeDefinitions: true,
			includeAttributes: false,
			includeRelations: false,
			includeReferences: false,
			includeDisabledAttributes: false,
			includeSystemAttributes: false,
			includeDisabledReferences: false,
			targetDataType: "string",
			targetID: {
				uuid: "8F7827E8-D3C4-A158-5BA0-A54F009EB2EF",
				type: "CoProduct"
			}
		}
		const response = await coreAPI.getEntityConfigByRequest(data)
		expect(response.status).equal(200)
	})

	it("getEntityConfigTreeByRequest(...) [/core/get/entity/config/tree]", async () => {
		const data = {
			dataContextID: "64C3DCC8-DE9B-408C-3299-A38D008C8FC7",
			includeDefinitions: false,
			includeAttributes: false,
			includeRelations: false,
			includeReferences: true,
			includeDisabledAttributes: false,
			includeSystemAttributes: false,
			includeDisabledReferences: false,
			targetDataType: "string",
			targetID: {
				uuid: "E569EA6D-6B88-140E-AAE4-A49E00C056DE",
				type: "CoConceptType"
			}
		}
		const response = await coreAPI.getEntityConfigTreeByRequest(data)
		expect(response.status).equal(200)
	})

	it("getCriterionOptions(...) [/core/criterion/options/list]", async () => {
		const data = {
			criterion: {
				kind: "Attribute",
				qualifier: "EQ",
				key: "8d7e52be-dbd1-862c-4a17-a3a1006cd626",
				name: "Person",
				definitionID: {
					uuid: "05d9cc9b-086d-5cf5-11bd-a3a1006c2bea",
					type: "AsDefinition"
				},
				dataType: "CoProduct"
			},
			filter: "",
			presentations: true,
			icons: true,
			page: 1,
			pageSize: 100
		}

		const response = await coreAPI.getCriterionOptions(data, "", true, true, 1, 10)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getCriterionOptionsCount(...) [/core/criterion/options/count]", async () => {
		const data = {
			criterion: {
				kind: "Attribute",
				qualifier: "EQ",
				key: "8d7e52be-dbd1-862c-4a17-a3a1006cd626",
				name: "Person",
				definitionID: {
					uuid: "05d9cc9b-086d-5cf5-11bd-a3a1006c2bea",
					type: "AsDefinition"
				},
				dataType: "CoProduct"
			},
			filter: "",
			presentations: true,
			icons: true,
			page: 1,
			pageSize: 100
		}
		const response = await coreAPI.getCriterionOptionsCount(data)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getEntityIconUrl(...) [/core/icon/url/{type}/{uuid}]", async () => {
		// UnResource:03B72771-D791-4B7F-A186-BD0634CC41A3
		const response = await coreAPI.getEntityIconUrl("UnResource", "03B72771-D791-4B7F-A186-BD0634CC41A3")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getTypeIconUrl(...) [/core/type/icon/{type}]", async () => {
		const response = await coreAPI.getTypeIconUrl("UnResource", 24)
		// console.dir(response)
		expect(response).toBeTruthy
	})

	it("getCategoryIconUrl(...) [/core/type/icon/{category}]", async () => {
		const response = await coreAPI.getCategoryIconUrl("Relation", 24)
		// console.dir(response)
		expect(response).toBeTruthy
	})
	it("getInorigoDataTypes(...) [/core/datatypes]", async () => {
		const response = await coreAPI.getInorigoDataTypes(true)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})
	it("getExpressionFunctions() [/core/expression/functions]", async () => {
		const response = await coreAPI.getExpressionFunctions()
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getAttributeReferenceName(...) [/core/attribute/reference/name/{attributeID}]", async () => {
		const response = await coreAPI.getAttributeReferenceName("A17F8D36-A4DC-ABC6-3E37-AC1500CFA5F6", "2162F09C-AE7E-A11D-5CCE-AC1C00C66701", true)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getHardcodes() [/core/hardcodes]", async () => {
		const response = await coreAPI.getHardcodes()
		// console.dir(response.data)
		expect(response.status).equals(200)
	})
})
