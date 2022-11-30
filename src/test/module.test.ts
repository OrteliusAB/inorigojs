import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { ModuleAPI } from "../API/ModuleAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const moduleAPI: ModuleAPI = inorigoAPI.getModuleAPI()

describe("Module...", () => {
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
		assert.exists(moduleAPI)
		// const list = await moduleAPI
		// expect(list.status).equals(200)
	})

	it.skip("getComponentModifiers() [/module/application/component/modifiers]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getModule(...) [/module/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getModuleState(...) NEW [/module/state/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getModuleStates() [/module/states]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("isModuleActive(...) [/module/active/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("registerDependency(...) [/module/dependency]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("deleteDependency(...) [/module/dependency]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("deleteModule(...) [/module/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("registerModule(...) [/module]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getModule() [/module]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
