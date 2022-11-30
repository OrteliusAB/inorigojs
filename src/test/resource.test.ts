import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { ResourceAPI } from "../API/ResourceAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const resourceAPI: ResourceAPI = inorigoAPI.getResourceAPI()

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

	it.skip("check connection [/knowledgeset/list]", async () => {
		assert.exists(resourceAPI)
		// const list = await resourceAPI
		// expect(list.status).equals(200)
	})

	it.skip("getResource(uuid) [/resource/resource/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("deleteResource(uuid) [/resource/resource/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("createResource(...) [/resource/resource]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("updateResource(...) [/resource/resource]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getResourceData(...) [/resource/data/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getInvertOnDark(key) [/resource/invert/on/dark/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("setInvertOnDark(...) [/resource/invert/on/dark/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
