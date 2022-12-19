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

	it.skip("generateUUID(count) [/entity/generateid]", async () => {
		try {
			const response = await entityAPI.generateEntity("AsInstance", 1, "578A446C-E919-2353-DDB9-AF6300F5695F")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.skip("getEntity(...) [/entity/{type}/{id}]", async () => {
		try {
			const response = await entityAPI.getEntity("AsInstance", "6265F793-D396-12D4-C2C1-AF6300F6BC6D", true, true)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})
	it.skip("getInstances(...) [/entity/{type}/{id}/instances]", async () => {
		try {
			const response = await entityAPI.getInstances("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F", ["Name"], 1, 10)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("partners(...) [/entity/{type}/{id}/partners]", async () => {
		// try {
		// 	const response = await entityAPI.partners()
		// 	// console.dir(response.data)
		// 	expect(response.status).equals(200)
		// } catch (error) {
		// 	console.warn(error)
		// }
	})

	it.todo("getModelPartners(...) [/entity/{type}/{id}/model/partners]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("query(...) [/entity/query]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("search(...) [/entity/search]", async () => {
		try {
			const options = {
				dataTypes: ["AsInstance"],
				definitionType: "Company",
				definitionID: "578A446C-E919-2353-DDB9-AF6300F5695F",
				extendedMetadata: true,
				includeIcons: true,
				caseSensitive: true,
				fullScan: true,
				positionRelevant: true,
				contextSizeRelevant: true,
				maxErrors: 0
			}

			const response = await entityAPI.search("Boeing", options)
			// console.dir(response)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.skip("getDefinitions(...) [/entity/{type}/{id}/definitions]", async () => {
		try {
			const response = await entityAPI.getDefinitions("AsInstance", "7092ECD0-6319-4DFC-E770-AF6300F6BC6B", false, ["presentation"], 1, 10)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("getSuperClasses(...) [/entity/{type}/{id}/superclasses]", async () => {
		// check with Joakim C what data to send in call
	})

	it.todo("getSubClasses(...) [/entity/{type}/{id}/subclasses]", async () => {
		// check with Joakim C what data to send in call
	})

	it.todo("getReferents(...) [/entity/{type}/{id}/referents]", async () => {
		// check with Joakim C what data to send in call
	})

	it.todo("getRelations(...) [/entity/{type}/{id}/relations]", async () => {
		// check with Joakim C what data to send in call
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

	it.skip("getSimplifiedInstances(...) [/entity/{type}/{id}/instances]", async () => {
		// Fetch an entities instances. Only useful for definition types (AsDefinition, etc)
		try {
			const response = await entityAPI.getSimplifiedInstances("C697BD4D-33F5-88C3-8136-ABF100CF08ED")
			// console.dir(response)
			expect(response.length).toBeGreaterThan(0)
		} catch (error) {
			console.warn(error)
		}
	})

	it.only("getSimplifiedEntity(...) [/entity/{type}/{id}]", async () => {
		// is missing parameters info, icons, presentations
		// try {
		// 	const response = await entityAPI.getSimplifiedEntity("AsInstance", "F38679E3-7FEE-36F6-DC37-AC3E007808CE")
		// 	console.dir(response)
		// 	// expect(response.status).equals(200)
		// } catch (error) {
		// 	console.warn(error)
		// }
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

	it.skip("getPresentation(...) [/entity/{type}/{id}/presentation]", async () => {
		try {
			const response = await entityAPI.getPresentation("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F", "")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("getDependencyEdges(...) [/entity/{type}/{id}/dependencies/edges]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getAttribute(...) [/entity/{type}/{entityId}/attribute/{attributeId}]", async () => {
		try {
			const response = await entityAPI.getAttribute("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F", "F0ECDF4A-4754-1740-062E-AF6300F57465")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.skip("getUserAuthorization(...) [/entity/{type}/{entityId}/authorizations/{userId}]", async () => {
		try {
			const response = await entityAPI.getUserAuthorization("AsInstance", "635e7cf7-78dd-48c5-ae0a-aca698e1d67b", "423111ec-aed6-6e84-c740-a66500636f86")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("getCollateralDependants(...) [/entity/{type}/{id}/collateral/dependants]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getEntityIcon(...) [/entity/{type}/{id}/icon/id]", async () => {
		try {
			const response = await entityAPI.getEntityIcon("AsInstance", "635e7cf7-78dd-48c5-ae0a-aca698e1d67b", 24, "")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.skip("getEntityIconID(...) [/entity/{type}/{id}/icon/id]", async () => {
		const response = await entityAPI.getEntityIconID("AsInstance", "635e7cf7-78dd-48c5-ae0a-aca698e1d67b", "")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it.skip("getValueset(uuid) [/entity/valueset/{id}]", async () => {
		const response = await entityAPI.getValueset("C406570B-17EA-5E54-84FE-A49D00B25D0C")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it.skip("getPresentations(entityArray) [/entity/presentations]", async () => {
		const payload = [
			{
				id: "7C7770FF-2E52-0A14-011B-AF6300F6BC6B",
				dataType: "AsInstance"
			},
			{
				id: "69770D9B-2D26-ADA8-433A-AF6300F6BC6D",
				dataType: "AsInstance"
			},
			{
				id: "F6036AFA-6349-1EBD-C1E8-AF6300F6BC6E",
				dataType: "AsInstance"
			},
			{
				id: "6265F793-D396-12D4-C2C1-AF6300F6BC6D",
				dataType: "AsInstance"
			},
			{
				id: "C2DA37AA-1503-1EB7-C06A-AF6300F6BC6E",
				dataType: "AsInstance"
			}
		]

		try {
			const response = await entityAPI.getPresentations(JSON.stringify(payload))
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
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
