import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { KnowledgeSetAPI } from "../API/KnowledgeSetAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const knowledgesetAPI: KnowledgeSetAPI = inorigoAPI.getKnowledgesetAPI()

describe("Knowledgeset Module", () => {
	it("Utilities test, verify config read", () => {
		// utilities = new Utilities()
		assert.exists(utilities)
	})

	it("initialize IniorigoAPI to endpoint", () => {
		// console.log(inorigoAPI)
		assert.exists(inorigoAPI)
	})

	it.todo("check connection [/knowledgeset/list]", async () => {
		const response = await knowledgesetAPI.getAvailable()
		expect(response.status).equals(200)
	})

	it.todo("countRows(...) [/knowledgeset/{id}/count]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.todo("getResult(...) [/knowledgeset/{id}]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.todo("getResultAsObjects(...) [/knowledgeset/objects/{id}]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.skip("getResultAsObjects(...) [/knowledgeset/objects/{id}]", async () => {
		const response = await knowledgesetAPI.getResultAsObjects("7e3af419-7188-8220-c75c-ab1800838602")
		// console.log(response)

		// selenium instance
		// const response = await knowledgesetAPI.getResultAsObjects("011C0BDA-62F7-BFD2-9855-A89500DC828C")
		expect(response.status).equals(200)
	})

	it.todo("getTreeResult(...) [/knowledgeset/tree/{id}]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.skip("exportToFile(...) [/knowledgeset/file/{id}]", async () => {
		const response = await knowledgesetAPI.exportToFile("7e3af419-7188-8220-c75c-ab1800838602", false, "", false, 1, 100, false, false, false, "text/csv")

		//  Selenium
		// const response = await knowledgesetAPI.exportToFile("011C0BDA-62F7-BFD2-9855-A89500DC828C", false, "", false, 1, 100, false, false, false, "text/csv")
		// console.log(response)
		expect(response.status).equals(200)
	})

	it.todo("getDefinition(...) [/knowledgeset/{id}/definition]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.todo("getSchedulingStatus() [/knowledgeset/scheduling/status]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.todo("getAvailable() [/knowledgeset/list]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.todo("query(...)  [/knowledgeset/{id}/query]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.todo("getResult(...)  [/knowledgeset/{id}/cache/read]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.todo("searchResult(...) [/knowledgeset/{id}/search/text]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})

	it.skip("searchResultAsObjects(...) [/knowledgeset/{id}/objects/search/text]", async () => {
		const response = await knowledgesetAPI.searchResultAsObjects(
			"7e3af419-7188-8220-c75c-ab1800838602",
			"Sweden",
			false,
			false,
			1,
			100,
			false,
			false,
			false,
			[""],
			[""],
			true
		)
		// console.log(response.data.objectSets[0].objects[0])
		expect(response.status).equals(200)
	})

	it.todo("searchTreeResult(...) [/knowledgeset/{id}/tree/search/text]", async () => {
		// const response = await KSAPI.countRows(uuid, isDistinct)
		// expect(response.status).equals(200)
	})
})
