import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { CoreAPI } from "../API/CoreAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const coreAPI: CoreAPI = inorigoAPI.getCoreAPI()

describe("resource...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("assert coreAPI", () => {
		assert.exists(coreAPI)
	})

	it.skip("getEntityPresentation(...) [/core/presentation/{type}/{uuid}]", async () => {
		try {
			const response = await coreAPI.getEntityPresentation("AsInstance", "578A446C-E919-2353-DDB9-AF6300F5695F")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.skip("getFilter(uuid) [/core/filter/definition/{uuid}]", async () => {
		try {
			const response = await coreAPI.getFilter("6e29d6be-85d0-1a63-d680-a3b500df3adb")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.skip("runFilter(...) [/core/filter/run]", async () => {
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
	})

	it.skip("getAttributeDefinition( [/core/attribute/definition]", async () => {
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

	it.skip("getPossibleAttributeValues(...) [/core/attribute/value/list]", async () => {
		try {
			const response = await coreAPI.getPossibleAttributeValues("6A9E4AEB-B873-0AE2-9ACC-AF6300F74001")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.skip("getPossibleAttributeValuesCount(...)[/core/attribute/value/count]", async () => {
		try {
			const response = await coreAPI.getPossibleAttributeValuesCount("6A9E4AEB-B873-0AE2-9ACC-AF6300F74001")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("getEntityTypeCount(...) [/core/count/entity/{entityType}]", async () => {
		// what kind of entityType uuid should be provided?
		try {
			const response = await coreAPI.getEntityTypeCount("6A9E4AEB-B873-0AE2-9ACC-AF6300F74001")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("getRelationSpecifierName(...) [/core/relation/specifier/name]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getEntityConfigByRequest(...) [/core/get/entity/config]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getEntityConfigTreeByRequest(...) [/core/get/entity/config/tree]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getCriterionOptions(...) [/core/criterion/options/list]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getCriterionOptionsCount(...) [/core/criterion/options/count]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getEntityIconUrl(...) [/core/icon/url/{type}/{uuid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getTypeIconUrl(...) [/core/type/icon/{type}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
	it.todo("getCategoryIconUrl(...) [/core/type/icon/{category}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
	it.todo("getInorigoDataTypes(...) [/core/datatypes]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
	it.todo("getExpressionFunctions() [/core/expression/functions]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getAttributeReferenceName(...) [/core/attribute/reference/name/{attributeID}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getHardcodes() NEW FUNCTION [/core/hardcodes]", async () => {
		// Get the system hardcoded ids
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
