import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { EntityAPI } from "../API/EntityAPI"
import { Utilities } from "../test-utils/utilities"

let utilities: Utilities
let inorigoAPI: InorigoAPI
let entityAPI: EntityAPI

describe("resource...", () => {
	it("Utilities test, verify config read", () => {
		utilities = new Utilities()
		assert.exists(utilities)
	})

	it("initialize IniorigoAPI to endpoint", () => {
		inorigoAPI = utilities.getInorigoAPI()
		// console.log(inorigoAPI)
		assert.exists(inorigoAPI)
	})

	it("check connection [DUMMY]", async () => {
		entityAPI = inorigoAPI.getEntityAPI()
		const response = await entityAPI.getPresentation("GsCube", "1B92405E-7DBA-41B5-0653-AE8900A01E90")
		expect(response.status).equals(200)
		expect("2").equals("2")
	})

	it.skip("generateUUID(count) [/entity/generateid]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getEntity(...) [/entity/{type}/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
	it.skip("getInstances(...) [/entity/{type}/{id}/instances]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("partners(...) [/entity/{type}/{id}/partners]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getModelPartners(...) [/entity/{type}/{id}/model/partners]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("query(...) [/entity/query]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("search(...) [/entity/search]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getDefinitions(...) [/entity/{type}/{id}/definitions]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getSuperClasses(...) [/entity/{type}/{id}/superclasses]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getSubClasses(...) [/entity/{type}/{id}/subclasses]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getReferents(...) [/entity/{type}/{id}/referents]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getRelations(...) [/entity/{type}/{id}/relations]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("updateEntity(...) [/entity]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("createEntity(...) [/entity]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("transaction() [/entity/commit/transaction]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("deleteEntity(...) [/entity/{type}/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getSimplifiedInstances(...) [/entity/{type}/{id}/instances]", async () => {
		// Fetch an entities instances. Only useful for definition types (AsDefinition, etc)
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getSimplifiedEntity(...) [/entity/{type}/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getGraphDependencies(...) [/entity/{type}/{id}/dependencies/graph]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getPossibleEntityReferences(...) [/entity/possible/references]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getPossibleInstanceReferences(...) [/entity/possible/instance/references]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getPresentation(...) [/entity/{type}/{id}/presentation]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getDependencyEdges(...) [/entity/{type}/{id}/dependencies/edges]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getAttribute(...) [/entity/{type}/{entityId}/attribute/{attributeId}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getUserAuthorization(...) [/entity/{type}/{entityId}/authorizations/{userId}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getCollateralDependants(...) [/entity/{type}/{id}/collateral/dependants]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getEntityIcon(...) [/entity/{type}/{id}/icon/id]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getEntityIconID(...) [/entity/{type}/{id}/icon/id]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getValueset(uuid) [/entity/valueset/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getPresentations(entityArray) [/entity/presentations]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getGranted(...) [/entity/granted/{type}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("generateEntity(...) [/entity/{type}/generate]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
