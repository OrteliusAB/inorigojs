import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { MatrixAPI } from "../API/MatrixAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const matrixAPI: MatrixAPI = inorigoAPI.getMatrixAPI()

describe.skip("resource...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("assert matrixAPI", () => {
		assert.exists(matrixAPI)
	})

	it.todo("getMetaAndDataForApplicationComponent(...) [/matrix/meta/and/data/for/application/component/{runtimeid}/{componentid}]", async () => {
		// need to fetch runtimeID for the Edit Matrix application.
		const response = await matrixAPI.getMetaAndDataForApplicationComponent(
			"4500f13f-4a13-a26f-2a41-af6b008dfe2f",
			"D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8",
			"All"
		)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it.skip("getMetaAndDataForDefinition(...) [/matrix/meta/and/data/for/definition/{definitiontype}/{definitionuuid}]", async () => {
		const response = await matrixAPI.getMetaAndDataForDefinition("AsDefinition", "C2ED6335-C1A0-C115-FD2C-AF6300EB2477", false)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it.skip("getMetaForApplicationComponent(...) [/matrix/meta/for/application/component/{applicationid}/{componentid}]", async () => {
		const response = await matrixAPI.getMetaForApplicationComponent("BFBEAF8A-A2F7-273B-C8F1-AEB30064C93A", "D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it.skip("getMetaForDefinition(...) [/matrix/meta/for/definition/{definitiontype}/{definitionuuid}]", async () => {
		const response = await matrixAPI.getMetaForDefinition("AsDefinition", "C2ED6335-C1A0-C115-FD2C-AF6300EB2477", false)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it.todo("getDataForRequest(...) [/matrix/data/for/request]", async () => {
		// need a relevant payload to be able to execute the test
		const payload = {}
		const response = await matrixAPI.getDataForRequest(payload)
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it.todo("getDataForRow(...) [/matrix/data/for/row]", async () => {
		// REMOVE THIS, DOES NOT SEEM TO EXIST ANY LONGER
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getMetaForFilter(...) [/matrix/meta/for/filter]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("populate(requestBody) [/matrix/populate]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("commit(requestBody) [/matrix/commit]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("attributeOptionsCount(requestBody) [/matrix/attribute/options/count]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("attributeOptionsList(requestBody) [/matrix/attribute/options/list]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("attributeParseValues(requestBody) [/matrix/attribute/parse/values]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
