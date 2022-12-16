import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { EntityAPI } from "../API/EntityAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const entityAPI: EntityAPI = inorigoAPI.getEntityAPI()

describe("entity...", () => {
	it("Utilities test, verify config read", () => {
		// utilities = new Utilities()
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
		assert.exists(entityAPI)
	})

	it("check connection [/entity/{type}/{id}/presentation]", async () => {
		const response = await entityAPI.getPresentation("GsCube", "BFBEAF8A-A2F7-273B-C8F1-AEB30064C93A", "")
		expect(response.status).equals(200)
	})

	it.todo("generateUUID(count) [/entity/generateid]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getEntity(...) [/entity/{type}/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
	it.todo("getInstances(...) [/entity/{type}/{id}/instances]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("partners(...) [/entity/{type}/{id}/partners]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getModelPartners(...) [/entity/{type}/{id}/model/partners]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("query(...) [/entity/query]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("search(...) [/entity/search]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getDefinitions(...) [/entity/{type}/{id}/definitions]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getSuperClasses(...) [/entity/{type}/{id}/superclasses]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getSubClasses(...) [/entity/{type}/{id}/subclasses]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getReferents(...) [/entity/{type}/{id}/referents]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getRelations(...) [/entity/{type}/{id}/relations]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("updateEntity(...) [/entity]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("createEntity(...) [/entity]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("transaction() [/entity/commit/transaction]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("deleteEntity(...) [/entity/{type}/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getSimplifiedInstances(...) [/entity/{type}/{id}/instances]", async () => {
		// Fetch an entities instances. Only useful for definition types (AsDefinition, etc)
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getSimplifiedEntity(...) [/entity/{type}/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getGraphDependencies(...) [/entity/{type}/{id}/dependencies/graph]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getPossibleEntityReferences(...) [/entity/possible/references]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getPossibleInstanceReferences(...) [/entity/possible/instance/references]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getPresentation(...) [/entity/{type}/{id}/presentation]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getDependencyEdges(...) [/entity/{type}/{id}/dependencies/edges]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getAttribute(...) [/entity/{type}/{entityId}/attribute/{attributeId}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getUserAuthorization(...) [/entity/{type}/{entityId}/authorizations/{userId}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getCollateralDependants(...) [/entity/{type}/{id}/collateral/dependants]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getEntityIcon(...) [/entity/{type}/{id}/icon/id]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getEntityIconID(...) [/entity/{type}/{id}/icon/id]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getValueset(uuid) [/entity/valueset/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getPresentations(entityArray) [/entity/presentations]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getGranted(...) [/entity/granted/{type}]", async () => {
		const response = await entityAPI.getGranted("AsDefinition", "1800F333-2231-29D5-2E09-AC61013D95E0", "", "", "", "")
		// console.log(response.data)
		expect(response.status).equals(200)
	})

	it.skip("generateEntity(...) [/entity/{type}/generate]", async () => {
		const response = await entityAPI.generateEntity("AsDefinition", 1, "065D3E1F-DF4E-2C8C-31DB-AB180089CA3E")
		// console.log(response)
		expect(response.status).equals(200)
	})
})
