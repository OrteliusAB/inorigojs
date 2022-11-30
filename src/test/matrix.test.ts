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

	it.skip("check connection [??]", async () => {
		assert.exists(matrixAPI)
		// const response = await matrixAPI.
		// expect(list.status).equals(200)
	})

	it.skip("getMetaAndDataForApplicationComponent(...) [/matrix/meta/and/data/for/application/component/{applicationid}/{componentid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getMetaAndDataForDefinition(...) [/matrix/meta/and/data/for/definition/{definitiontype}/{definitionuuid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getMetaForApplicationComponent(...) [/matrix/meta/for/application/component/{applicationid}/{componentid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getMetaForDefinition(...) [/matrix/meta/for/definition/{definitiontype}/{definitionuuid}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getDataForRequest(...) [/matrix/data/for/request]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getDataForRow(...) [/matrix/data/for/row]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getMetaForFilter(...) [/matrix/meta/for/filter]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("populate(requestBody) [/matrix/populate]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("commit(requestBody) [/matrix/commit]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("attributeOptionsCount(requestBody) [/matrix/attribute/options/count]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("attributeOptionsList(requestBody) [/matrix/attribute/options/list]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("attributeParseValues(requestBody) [/matrix/attribute/parse/values]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
