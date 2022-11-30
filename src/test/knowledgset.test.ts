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

	it.skip("check connection [/knowledgeset/list]", async () => {
		const list = await knowledgesetAPI.getAvailable()
		expect(list.status).equals(200)
	})

	it.skip("countRows(...) [/knowledgeset/{id}/count]", async () => {
		KSAPI = inorigoAPI.getKnowledgesetAPI()
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getResult(...) [/knowledgeset/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getResultAsObjects(...) [/knowledgeset/objects/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getResultAsObjects(...) [/knowledgeset/objects/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getTreeResult(...) [/knowledgeset/tree/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("exportToFile(...) [/knowledgeset/file/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getDefinition(...) [/knowledgeset/{id}/definition]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getSchedulingStatus() [/knowledgeset/scheduling/status]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getAvailable() [/knowledgeset/list]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("query(...)  [/knowledgeset/{id}/query]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getResult(...)  [/knowledgeset/{id}/cache/read]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("searchResult(...) [/knowledgeset/{id}/search/text]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("searchResultAsObjects(...) [/knowledgeset/{id}/objects/search/text]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("searchTreeResult(...) [/knowledgeset/{id}/tree/search/text]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
