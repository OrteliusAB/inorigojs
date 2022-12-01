import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { MiscellaneousAPI } from "../API/MiscellaneousAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const miscellandeousAPI: MiscellaneousAPI = inorigoAPI.getMiscellaneousAPI()

describe("resource...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("check connection [/user]", async () => {
		const response = await miscellandeousAPI.getUser()
		expect(response.status).equals(200)
	})

	it.skip("getUser() [/user]", async () => {
		const response = await miscellandeousAPI.getUser()
		expect(response.status).equals(200)
	})

	it.todo("excecute(requestBody) [/execute]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("registerActivity(...) [/activity]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getDynamicImage(...) [/dynamic/image/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getRelationDirectionIcon(...) [/relation/direction/icon]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getRelationIcon(...) [/relation/id/icon]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getRelationSpecifierIcon( [/relation/specifier/icon]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getStaticImage(...) [/static/image/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
