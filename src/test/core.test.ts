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

	it.todo("getTranslation(...) [/core/translate]", async () => {
		// what do I send in payload/Request body
		//  check with JC one what to send in the payload
	})

	it("getAttributeDefinition( [/core/attribute/definition]", async () => {
		try {
			const response = await coreAPI.getAttributeDefinition(
				"6630E548-8E42-1206-8B2B-AF6300EEE420",
				"C2ED6335-C1A0-C115-FD2C-AF6300EB2477",
				"AsDefinition",
				"AsInstance"
			)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getPossibleAttributeValues(...) [/core/attribute/value/list]", async () => {
		try {
			const response = await coreAPI.getPossibleAttributeValues("6A9E4AEB-B873-0AE2-9ACC-AF6300F74001")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getPossibleAttributeValuesCount(...)[/core/attribute/value/count]", async () => {
		try {
			const response = await coreAPI.getPossibleAttributeValuesCount("", "", "AsInstance", "", true, true)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getEntityTypeCount(...) [/core/count/entity/{entityType}]", async () => {
		try {
			const response = await coreAPI.getEntityTypeCount("UnResource")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("getRelationSpecifierName(...) [/core/relation/specifier/name]", async () => {
		//  check with JC one what to send in the payload
	})

	it.todo("getEntityConfigByRequest(...) [/core/get/entity/config]", async () => {
		//  check with JC one what to send in the payload
	})

	it.todo("getEntityConfigTreeByRequest(...) [/core/get/entity/config/tree]", async () => {
		//  check with JC one what to send in the payload
	})

	it.todo("getCriterionOptions(...) [/core/criterion/options/list]", async () => {
		//  check with JC one what to send in the payload
		try {
			const response = await coreAPI.getCriterionOptions({}, "", true, true, 1, 10)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("getCriterionOptionsCount(...) [/core/criterion/options/count]", async () => {
		//  check with JC one what to send in the payload
		try {
			const response = await coreAPI.getCriterionOptionsCount("")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getEntityIconUrl(...) [/core/icon/url/{type}/{uuid}]", async () => {
		// UnResource:03B72771-D791-4B7F-A186-BD0634CC41A3
		try {
			const response = await coreAPI.getEntityIconUrl("UnResource", "03B72771-D791-4B7F-A186-BD0634CC41A3")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getTypeIconUrl(...) [/core/type/icon/{type}]", async () => {
		try {
			const response = await coreAPI.getTypeIconUrl("UnResource", 24)
			// console.dir(response)
			expect(response).toBeTruthy
		} catch (error) {
			console.warn(error)
		}
	})
	it("getCategoryIconUrl(...) [/core/type/icon/{category}]", async () => {
		try {
			const response = await coreAPI.getCategoryIconUrl("Relation", 24)
			// console.dir(response)
			expect(response).toBeTruthy
		} catch (error) {
			console.warn(error)
		}
	})
	it("getInorigoDataTypes(...) [/core/datatypes]", async () => {
		try {
			const response = await coreAPI.getInorigoDataTypes(true)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})
	it("getExpressionFunctions() [/core/expression/functions]", async () => {
		try {
			const response = await coreAPI.getExpressionFunctions()
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getAttributeReferenceName(...) [/core/attribute/reference/name/{attributeID}]", async () => {
		try {
			const response = await coreAPI.getAttributeReferenceName("A17F8D36-A4DC-ABC6-3E37-AC1500CFA5F6", "2162F09C-AE7E-A11D-5CCE-AC1C00C66701", true)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getHardcodes() NEW FUNCTION [/core/hardcodes]", async () => {
		try {
			const response = await coreAPI.getHardcodes()
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})
})
