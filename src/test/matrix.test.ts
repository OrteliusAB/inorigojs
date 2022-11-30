import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { MatrixAPI } from "../API/MatrixAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const matrixAPI: MatrixAPI = inorigoAPI.getMatrixAPI()

describe("resource...", () => {
	it("Utilities test, verify config read", () => {
		// utilities = new Utilities()
		assert.exists(utilities)
		expect("2").equals("2")
	})

	it("initialize IniorigoAPI to endpoint", () => {
		// inorigoAPI = utilities.getInorigoAPI()
		// console.log(inorigoAPI)
		assert.exists(inorigoAPI)
	})

	it.todo("check connection [??]", async () => {
		assert.exists(matrixAPI)
		// const response = await matrixAPI.
		// expect(list.status).equals(200)
	})

	it.todo("getMetaAndDataForApplicationComponent(...) [/matrix/meta/and/data/for/application/component/{applicationid}/{componentid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getMetaAndDataForDefinition(...) [/matrix/meta/and/data/for/definition/{definitiontype}/{definitionuuid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getMetaForApplicationComponent(...) [/matrix/meta/for/application/component/{applicationid}/{componentid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getMetaForDefinition(...) [/matrix/meta/for/definition/{definitiontype}/{definitionuuid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getDataForRequest(...) [/matrix/data/for/request]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getDataForRow(...) [/matrix/data/for/row]", async () => {
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
