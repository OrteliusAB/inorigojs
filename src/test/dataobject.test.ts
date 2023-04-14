import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { DataObjectAPI } from "../API/DataObjectAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const dataObjectAPI: DataObjectAPI = inorigoAPI.getDataObjectAPI()

describe("Dataobjects...", () => {
	it("Utilities test, verify config read", () => {
		assert.exists(utilities)
	})

	it("initialize IniorigoAPI to endpoint", () => {
		assert.exists(inorigoAPI)
	})

	it("assert dataObjectAPI", async () => {
		assert.exists(dataObjectAPI)
	})

	it("listDataObjects(type) [/dataobject]", async () => {
		const responseAll = await dataObjectAPI.listDataObjects("")
		// console.dir(responseAll.data)
		expect(responseAll.status).equals(200)

		const response = await dataObjectAPI.listDataObjects("GlobalTheme")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getDataObject(id) [/dataobject/{id}]", async () => {
		const response = await dataObjectAPI.getDataObject("bdd9d4dd-c629-89bb-f2bb-ace200a0e9ca")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getDataObjects(type) [/dataobject]", async () => {
		const response = await dataObjectAPI.getDataObjects("GlobalTheme")
		// console.dir(response)
		expect(response.length).toBeGreaterThan(0)
	})

	it("getDataVariant(id) [/dataobject/variant/{id}]", async () => {
		const response = await dataObjectAPI.getDataVariant("dfa17778-7a54-feec-23cc-ae5c0144f0b6")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("listDataVariants() [/dataobject/variant]", async () => {
		const response = await dataObjectAPI.listDataVariants()
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("createDataObject(...) [/dataobject]", async () => {
		/* eslint-disable quotes, no-alert, no-console */
		const response = await dataObjectAPI.createDataObject("GlobalTheme", '{"test": "VITEST-CREATE"}', "", "VITEST-CREATE", "application/json")
		// console.dir(response.data.id)
		expect(response.status).equals(200)
		/* eslint-enable no-alert */

		// DELETE DataObject
		const responseDelete = await dataObjectAPI.deleteDataObject(response.data.id)
		// console.dir(responseDelete)
		expect(responseDelete.status).equals(200)
	})

	it("updateDataObject(...) [/dataobject/{id}]", async () => {
		/* eslint-disable quotes, no-alert, no-console */
		const responseCreate = await dataObjectAPI.createDataObject("GlobalTheme", '{"test": "VITEST-CREATE"}', "", "VITEST-CREATE", "application/json")
		// console.dir(response.data.id)
		expect(responseCreate.status).equals(200)

		const response = await dataObjectAPI.updateDataObject(
			responseCreate.data.id,
			'{"test": "VITEST-UPDATE"}',
			"GlobalTheme",
			"VITEST-UPDATE",
			"application/json"
		)
		// console.dir(response.data.id)
		expect(response.status).equals(200)
		/* eslint-enable no-alert */

		// Remove test data, DELETE the created and updated DataObject
		const responseDelete = await dataObjectAPI.deleteDataObject(response.data.id)
		// console.dir(responseDelete)
		expect(responseDelete.status).equals(200)
	})

	it("deleteDataObject(id) [/dataobject/{id}]", async () => {
		/* eslint-disable quotes, no-alert, no-console */
		const response = await dataObjectAPI.createDataObject("GlobalTheme", '{"test": "VITEST-CREATE"}', "", "VITEST-CREATE", "application/json")
		// console.dir(response.data.id)
		expect(response.status).equals(200)
		/* eslint-enable no-alert */

		// DELETE DataObject
		const responseDelete = await dataObjectAPI.deleteDataObject(response.data.id)
		// console.dir(responseDelete)
		expect(responseDelete.status).equals(200)
	})

	it("registerDataVariant(...) [/dataobject/variant]", async () => {
		const responseCreate = await dataObjectAPI.registerDataVariant("VITEST-VARIANT-C", "vitest register variant test case", "", "application/json")
		// console.dir(responseCreate.data)
		expect(responseCreate.status).equals(200)

		const responseDelete = await dataObjectAPI.deleteDataVariant(responseCreate.data.id)
		// console.dir(responseDelete.data)
		expect(responseDelete.status).equals(200)
	})

	it("deleteDataVariant(id) [/dataobject/variant/{id}]", async () => {
		const responseCreate = await dataObjectAPI.registerDataVariant("VITEST-VARIANT-D", "vitest delete variant test case", "", "application/json")
		// console.dir(responseCreate.data)
		expect(responseCreate.status).equals(200)

		const responseDelete = await dataObjectAPI.deleteDataVariant(responseCreate.data.id)
		// console.dir(responseDelete.data)
		expect(responseDelete.status).equals(200)
	})

	it("getDataVariantName(id) [/dataobject/{id}/variant/name]", async () => {
		const responseAll = await dataObjectAPI.listDataObjects("")
		// console.dir(responseAll.data)
		expect(responseAll.status).equals(200)

		const response = await dataObjectAPI.getDataVariantName(responseAll.data.dataobjects[0].id)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})
})
