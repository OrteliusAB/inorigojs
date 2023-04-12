import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { MiscellaneousAPI } from "../API/MiscellaneousAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const miscellandeousAPI: MiscellaneousAPI = inorigoAPI.getMiscellaneousAPI()

describe("miscellaneous...", () => {
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

	it("getUser() [/user]", async () => {
		const response = await miscellandeousAPI.getUser()
		expect(response.status).equals(200)
	})

	it("excecute(requestBody) [/execute]", async () => {
		const payload = {
			target: "4FF7ED7A-97BF-83C5-DEAA-A43D00C393FF",
			commit: false,
			dataContextID: "64C3DCC8-DE9B-408C-3299-A38D008C8FC7",
			arguments: [{}]
		}

		try {
			const response = await miscellandeousAPI.execute(JSON.stringify(payload))
			// console.dir(response.data)
			expect(response.status).equals(200)
			expect(response.data.success).equals(true)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("registerActivity(...) [/activity]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it("getDynamicImage(...) [/dynamic/image/{key}]", async () => {
		try {
			// const response = await miscellandeousAPI.getDynamicImage("5C65937C-90C8-48DA-8B8E-7A02495C01EF") // png
			// const response = await miscellandeousAPI.getDynamicImage("E2B192F6-1048-7DA2-9A4B-A9FF01150F81") //jpg
			const response = await miscellandeousAPI.getDynamicImage("03B72771-D791-4B7F-A186-BD0634CC41A3", "64C3DCC8-DE9B-408C-3299-A38D008C8FC7", "")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getRelationDirectionIcon(...) [/relation/direction/icon]", async () => {
		try {
			const response = await miscellandeousAPI.getRelationDirectionIcon("DOWN")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getRelationIcon(...) [/relation/id/icon]", async () => {
		try {
			const response = await miscellandeousAPI.getRelationIcon("DOWN", "UnRel", "71866D57-18A7-48D5-AC96-8BFCCB7F5FD3")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getRelationSpecifierIcon( [/relation/specifier/icon]", async () => {
		try {
			const response = await miscellandeousAPI.getRelationSpecifierIcon("LEFT", "71866D57-18A7-48D5-AC96-8BFCCB7F5FD3")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getStaticImage(...) [/static/image/{key}]", async () => {
		try {
			const response = await miscellandeousAPI.getStaticImage("ic-appbuilder.svg", "")
			// console.dir(response.data)

			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})
})
