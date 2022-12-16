import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { KnowledgeSetAPI } from "../API/KnowledgeSetAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const knowledgesetAPI: KnowledgeSetAPI = inorigoAPI.getKnowledgesetAPI()

describe("Knowledgeset testsuit", () => {
	it("Utilities test, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("check connection [/knowledgeset/list]", async () => {
		const response = await knowledgesetAPI.getAvailable()
		expect(response.status).equals(200)
	})

	it("countRows(...) [/knowledgeset/{id}/count]", async () => {
		const response = await knowledgesetAPI.countRows("7e3af419-7188-8220-c75c-ab1800838602", false)
		// console.log(response.data)
		expect(response.status).equals(200)
	})

	it("getResult(...) [/knowledgeset/{id}]", async () => {
		try {
			const response = await knowledgesetAPI.getResult("7e3af419-7188-8220-c75c-ab1800838602", false, 1, 30, null, false)
			// console.log(response.data.dataSets[0].rows)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getResultAsObjects(...) [/knowledgeset/objects/{id}]", async () => {
		const response = await knowledgesetAPI.getResultAsObjects("7e3af419-7188-8220-c75c-ab1800838602", false, "", false, 1, 10, true, false, true)
		// console.dir(response.data.objectSets[0])
		expect(response.status).equals(200)
	})

	it("getTreeResult(...) [/knowledgeset/tree/{id}]", async () => {
		try {
			const response = await knowledgesetAPI.getTreeResult(
				"27a238ab-4a7c-c2fe-055a-af6d00e19431",
				false,
				true,
				{ parameters: [{ name: "PARA", value: "France" }]},
				false,
				true
			)
			// console.dir(response.data)
			// console.dir(response.data.result)

			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("exportToFile(...) [/knowledgeset/file/{id}]", async () => {
		const response = await knowledgesetAPI.exportToFile("7e3af419-7188-8220-c75c-ab1800838602", false, "", false, 1, 100, false, false, false, "text/csv")
		// console.log(response)
		expect(response.status).equals(200)
	})

	it("getDefinition(...) [/knowledgeset/{id}/definition]", async () => {
		const response = await knowledgesetAPI.getDefinition("7e3af419-7188-8220-c75c-ab1800838602")
		// console.log(response.data)
		expect(response.status).equals(200)
	})

	it("getSchedulingStatus() [/knowledgeset/scheduling/status]", async () => {
		const response = await knowledgesetAPI.getSchedulingStatus()
		// console.log(response.data)
		expect(response.status).equals(200)
	})

	it("getAvailable() [/knowledgeset/list]", async () => {
		const response = await knowledgesetAPI.getAvailable()
		// console.log(response.data)
		expect(response.status).equals(200)
	})

	it("query(...)  [/knowledgeset/{id}/query]", async () => {
		try {
			const response = await knowledgesetAPI.query(
				"7e3af419-7188-8220-c75c-ab1800838602",
				"select * from $ks where [Continent.Name] like '%Europe%';",
				true,
				"",
				null,
				false,
				true
			)
			// console.log(response.data.dataSets[0].metadata.columns)

			// console.log(response.data.dataSets[0].rows)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	}, 50000)

	it("getResult(...)  [/knowledgeset/{id}/cache/read]", async () => {
		try {
			const response = await knowledgesetAPI.getResult("7e3af419-7188-8220-c75c-ab1800838602", false, 1, 30, null, false)
			// console.log(response.data.dataSets[0].rows)
			expect(response.status).equals(200) // const response = await KSAPI.countRows(uuid, isDistinct)
		} catch (error) {
			console.warn(error)
		}
	})

	it("searchResult(...) [/knowledgeset/{id}/search/text]", async () => {
		const response = await knowledgesetAPI.searchResult("7e3af419-7188-8220-c75c-ab1800838602", "Sweden", false, false, true, false, false, [""], [""])
		// console.log(response.data.dataSets[0].rows[0])
		expect(response.status).equals(200)
	})

	it("searchResultAsObjects(...) [/knowledgeset/{id}/objects/search/text]", async () => {
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

	it("searchTreeResult(...) [/knowledgeset/{id}/tree/search/text]", async () => {
		const response = await knowledgesetAPI.searchTreeResult("7e3af419-7188-8220-c75c-ab1800838602", "Sweden", false, false, true, false, false, [""], [""])
		// console.log(response.data.result)
		expect(response.status).equals(200)
	})
})
