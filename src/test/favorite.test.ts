import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { FavoriteAPI } from "../API/FavoriteAPI"
import { KnowledgeSetAPI } from "../API/KnowledgeSetAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const favoriteAPI: FavoriteAPI = inorigoAPI.getFavoriteAPI()
const knowledgesetAPI: KnowledgeSetAPI = inorigoAPI.getKnowledgesetAPI()

describe.skip("resource...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("assert favortieAPI", async () => {
		assert.exists(favoriteAPI)
	})

	it("deleteFavorite(uuid) [/favorite/{id}]", async () => {
		const knowledgesetList = await knowledgesetAPI.getAvailable()
		expect(knowledgesetList.status).equals(200)

		// console.log(knowledgesetList.data.entities[0].id)
		const ksId = knowledgesetList.data.entities[0].id
		// console.log(ksId)

		const response = await favoriteAPI.createFavorite(ksId, "GsKnowledgeSet")
		// console.log(response.data)
		// console.log(response.data.id)

		expect(response.status).equals(200)
		const id: string = response.data.id

		// delete created favorite
		if (response.status === 200) {
			const deleted = await favoriteAPI.deleteFavorite(id)
			expect(deleted.status).equals(200)
		}
	})

	it("getFavorites(targetType) [/favorite]", async () => {
		const response = await favoriteAPI.getFavorites("")
		// console.log(response.data)
		expect(response.status).equals(200)
	})

	it("getFavorite(uuid) [/favorite/{id}]", async () => {
		const favorites = await favoriteAPI.getFavorites("GsCube")
		const id = favorites.data[0].id

		const response = await favoriteAPI.getFavorite(id)
		// console.log(response.data)
		expect(response.status).equals(200)
	})

	it("createFavorite(...) [/favorite]", async () => {
		const knowledgesetList = await knowledgesetAPI.getAvailable()
		expect(knowledgesetList.status).equals(200)

		// console.log(knowledgesetList.data.entities[0].id)
		const ksId = knowledgesetList.data.entities[0].id
		// console.log(ksId)

		const response = await favoriteAPI.createFavorite(ksId, "GsKnowledgeSet")
		// console.log(response.data)
		// console.log(response.data.id)

		expect(response.status).equals(200)
		const id: string = response.data.id

		// delete created favorite
		if (response.status === 200) {
			const deleted = await favoriteAPI.deleteFavorite(id)
			expect(deleted.status).equals(200)
		}
	})
})
