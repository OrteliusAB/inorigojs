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
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getResult(...) [/knowledgeset/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getResultAsObjects(...) [/knowledgeset/objects/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getResultAsObjects(...) [/knowledgeset/objects/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getTreeResult(...) [/knowledgeset/tree/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("exportToFile(...) [/knowledgeset/file/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getDefinition(...) [/knowledgeset/{id}/definition]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getSchedulingStatus() [/knowledgeset/scheduling/status]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getAvailable() [/knowledgeset/list]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("query(...)  [/knowledgeset/{id}/query]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getResult(...)  [/knowledgeset/{id}/cache/read]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("searchResult(...) [/knowledgeset/{id}/search/text]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("searchResultAsObjects(...) [/knowledgeset/{id}/objects/search/text]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("searchTreeResult(...) [/knowledgeset/{id}/tree/search/text]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
