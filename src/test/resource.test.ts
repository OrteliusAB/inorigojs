import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { ResourceAPI } from "../API/ResourceAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const resourceAPI: ResourceAPI = inorigoAPI.getResourceAPI()

describe("resource...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
		expect("2").equals("2")
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("check connection [/knowledgeset/list]", async () => {
		assert.exists(resourceAPI)
		// const list = await resourceAPI
		// expect(list.status).equals(200)
	})

	it.todo("getResource(uuid) [/resource/resource/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("deleteResource(uuid) [/resource/resource/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it("createResource(...) [/resource/resource]", async () => {
		const stringData =
			"<?xml version='1.0' encoding='UTF-8'?><svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><title>Icon/24px/Datatype/Generic Model/ic_association @3x</title><g id='Icon/24px/Datatype/Generic-Model/ic_association-' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='16to24px_converter' transform='translate(2.000000, 2.000000)' fill='#000000'><path d='M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10,2.5 C5.85786438,2.5 2.5,5.85786438 2.5,10 C2.5,14.1421356 5.85786438,17.5 10,17.5 C14.1421356,17.5 17.5,14.1421356 17.5,10 C17.5,5.85786438 14.1421356,2.5 10,2.5 Z M10,11.25 C11.2379141,12.3169938 11.8568712,13.7613743 11.8568712,14.4450554 C11.8568712,15.4705771 11.0255216,16.3019266 10,16.3019266 C8.97447837,16.3019266 8.14312883,15.4705771 8.14312883,14.4450554 C8.14312883,13.7613743 8.76208589,12.3169938 10,11.25 Z M5.55494458,8.14312883 C6.23862566,8.14312883 7.68300616,8.76208589 8.75,10 C7.68300616,11.2379141 6.23862566,11.8568712 5.55494458,11.8568712 C4.52942295,11.8568712 3.69807341,11.0255216 3.69807341,10 C3.69807341,8.97447837 4.52942295,8.14312883 5.55494458,8.14312883 Z M14.4450554,8.14312883 C15.4705771,8.14312883 16.3019266,8.97447837 16.3019266,10 C16.3019266,11.0255216 15.4705771,11.8568712 14.4450554,11.8568712 C13.7613743,11.8568712 12.3169938,11.2379141 11.25,10 C12.3169938,8.76208589 13.7613743,8.14312883 14.4450554,8.14312883 Z M10,3.69807341 C11.0255216,3.69807341 11.8568712,4.52942295 11.8568712,5.55494458 C11.8568712,6.23862566 11.2379141,7.68300616 10,8.75 C8.76208589,7.68300616 8.14312883,6.23862566 8.14312883,5.55494458 C8.14312883,4.52942295 8.97447837,3.69807341 10,3.69807341 Z' id='Combined-Shape'></path></g></g></svg>"
		const data = []
		const byteData = Buffer.from(stringData).toString("base64")
		const timestamp = utilities.getISOTimestamp()

		const payload = {
			presentation: "vitest",
			name: timestamp + "_vitest.svg",
			extension: "svg",
			size: "large",
			data: byteData
		}

		data.push(payload)

		const response = await resourceAPI.createResource(JSON.stringify(data), false)
		expect(response.status).equals(200)
		const id = response.data.ids[0]

		// delete resource
		const deleted = await resourceAPI.deleteResource(id)
		// console.dir(deleted)
		expect(deleted.status).equals(200)
	})

	it.todo("updateResource(...) [/resource/resource]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getResourceData(...) [/resource/data/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getInvertOnDark(key) [/resource/invert/on/dark/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("setInvertOnDark(...) [/resource/invert/on/dark/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
