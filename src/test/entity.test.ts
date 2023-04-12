import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { EntityAPI } from "../API/EntityAPI"
import { Utilities } from "../test-utils/utilities"
import { Entity } from "../Entity/Entity"
import { InorigoEnums } from "../Utils/Enums"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const entityAPI: EntityAPI = inorigoAPI.getEntityAPI()

describe("entity...", () => {
	it("Utilities test, verify config read", () => {
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

	it("generateUUID(count) [/entity/generateid]", async () => {
		try {
			const response = await entityAPI.generateEntity("AsInstance", 1, "578A446C-E919-2353-DDB9-AF6300F5695F")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getEntity(...) [/entity/{type}/{id}]", async () => {
		try {
			const response = await entityAPI.getEntity("AsInstance", "6265F793-D396-12D4-C2C1-AF6300F6BC6D", true, true, false)
			// const response = await entityAPI.getEntity("AsInstance", "6265F793-D396-12D4-C2C1-AF6300F6BC6D", true, true, false)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})
	it("getInstances(...) [/entity/{type}/{id}/instances]", async () => {
		try {
			const response = await entityAPI.getInstances("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F", ["Name"], 1, 10)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("partners(...) [/entity/{type}/{id}/partners]", async () => {
		try {
			const response = await entityAPI.partners(
				"AsDefinition",
				"37F28315-525E-04C5-A84B-ABF0011DC8BA",
				undefined,
				"",
				false,
				false,
				undefined,
				1,
				10,
				true,
				true
			)
			// console.dir(response.data.entities)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getModelPartners(...) [/entity/{type}/{id}/model/partners]", async () => {
		try {
			const response = await entityAPI.getModelPartners("AsDefinition", "37F28315-525E-04C5-A84B-ABF0011DC8BA")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("query(...) [/entity/query]", async () => {
		const query = {
			kind: "Filter",
			dataType: "AsInstance",
			operator: "AND",
			criteria: [
				{
					kind: "Definition",
					qualifier: "KIND_OF",
					dataType: "AsDefinition",
					value: {
						kind: "GlobalID",
						uuid: "c2ed6335-c1a0-c115-fd2c-af6300eb2477",
						type: "AsDefinition"
					}
				},
				{
					kind: "Reference",
					qualifier: "IN",
					dataType: "AsInstance",
					value: {
						kind: "Filter",
						dataType: "AsInstance",
						operator: "AND",
						criteria: [
							{
								kind: "Definition",
								qualifier: "KIND_OF",
								dataType: "AsDefinition",
								value: {
									kind: "GlobalID",
									uuid: "fe37f8f5-5344-d7bf-4b8f-af6300f713bf",
									type: "AsDefinition"
								}
							},
							{
								kind: "Attribute",
								qualifier: "IN",
								dataType: "AsInstance",
								value: {
									kind: "Filter",
									dataType: "AsInstance",
									operator: "AND",
									criteria: [
										{
											kind: "Definition",
											qualifier: "KIND_OF",
											dataType: "AsDefinition",
											value: {
												kind: "GlobalID",
												uuid: "578a446c-e919-2353-ddb9-af6300f5695f",
												type: "AsDefinition"
											}
										},
										{
											kind: "Attribute",
											qualifier: "EQ",
											dataType: "GeGeopArea",
											value: {
												kind: "GlobalID",
												uuid: "9864cbde-1d23-4ff5-91ef-40a982c946db",
												type: "GeGeopArea"
											},
											key: "b2617504-119b-c209-2592-af6300f657d5",
											name: "Location",
											definitionID: {
												uuid: "578a446c-e919-2353-ddb9-af6300f5695f",
												type: "AsDefinition"
											}
										}
									]
								},
								key: "a3f376e0-da2f-d0ee-030b-af6300f76506",
								name: "Company",
								definitionID: {
									uuid: "fe37f8f5-5344-d7bf-4b8f-af6300f713bf",
									type: "AsDefinition"
								}
							}
						]
					},
					attributeKey: "04d99258-973d-a19b-4306-af6300f72376",
					attributeName: "Person",
					definitionID: {
						uuid: "fe37f8f5-5344-d7bf-4b8f-af6300f713bf",
						type: "AsDefinition"
					}
				}
			]
		}

		try {
			const response = await entityAPI.query(query, true, 1, 10)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("search(...) [/entity/search]", async () => {
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

	it("getDefinitions(...) [/entity/{type}/{id}/definitions]", async () => {
		try {
			const response = await entityAPI.getDefinitions("AsInstance", "7092ECD0-6319-4DFC-E770-AF6300F6BC6B", false, ["presentation"], 1, 10)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getSuperClasses(...) [/entity/{type}/{id}/superclasses]", async () => {
		// Allowed values for parameter info: Attributes, Values, Presentation, Icons
		try {
			const response = await entityAPI.getSuperClasses("AsDefinition", "C6886D83-4444-1B1E-7EEE-AC1C0097925F", true, undefined, 1, 10, true, true)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getSubClasses(...) [/entity/{type}/{id}/subclasses]", async () => {
		// Allowed values for parameter info: Attributes, Values, Presentation, Icons
		try {
			const response = await entityAPI.getSubClasses("AsDefinition", "37F28315-525E-04C5-A84B-ABF0011DC8BA", true, undefined, 1, 10, true, true)
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("getReferents(...) [/entity/{type}/{id}/referents]", async () => {
		// check with Joakim C/Måns what data to send in call
	})

	it("getRelations(...) [/entity/{type}/{id}/relations]", async () => {
		try {
			const response = await entityAPI.getRelations("AsDefinition", "37F28315-525E-04C5-A84B-ABF0011DC8BA")
			// console.dir(response.data.relations)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("updateEntity(...) [/entity]", async () => {
		const entityTypes = new InorigoEnums().entityTypes()
		const data: object[] = []
		const payload = new Entity()
			.setType(entityTypes.ASSOCIATION)
			.setDefinition(entityTypes.ASSOCIATION_DEFINITION, "C2ED6335-C1A0-C115-FD2C-AF6300EB2477")
			.setValues({
				"4F7B6B18-B8B9-D7F7-479E-AF6300EEDC08": "VITEST Entity create autotest",
				"6630E548-8E42-1206-8B2B-AF6300EEE420": "2001-09-13",
				"DEF8268D-1CDD-3F61-932D-AF6300EEF587": 40,
				"83C626C4-68B8-541E-0C64-AF6300EF0AF4": 50
			})
			.print()

		data.push(payload)
		try {
			const response = await entityAPI.createEntity(JSON.stringify(data))
			// console.dir(response.data)
			// console.dir(response.data.ids[0])

			expect(response.status).equals(200)
			const updatePayload = new Entity(entityTypes.ASSOCIATION, response.data.ids[0]).setValues({ "DEF8268D-1CDD-3F61-932D-AF6300EEF587": 45 }).print()
			const updateData: object[] = []
			updateData.push(updatePayload)
			const responseUpdate = await entityAPI.updateEntity(JSON.stringify(updateData))
			// console.log(responseUpdate)
			expect(responseUpdate.status).equals(200)

			const responseDelete = await entityAPI.deleteEntity(entityTypes.ASSOCIATION, response.data.ids[0])
			// console.dir(responseDelete)
			expect(responseDelete.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("createEntity(...) [/entity]", async () => {
		const entityTypes = new InorigoEnums().entityTypes()
		const data: object[] = []
		const payload = new Entity()
			.setType(entityTypes.ASSOCIATION)
			.setDefinition(entityTypes.ASSOCIATION_DEFINITION, "C2ED6335-C1A0-C115-FD2C-AF6300EB2477")
			.setValues({
				"4F7B6B18-B8B9-D7F7-479E-AF6300EEDC08": "VITEST Entity create autotest",
				"6630E548-8E42-1206-8B2B-AF6300EEE420": "2001-09-13",
				"DEF8268D-1CDD-3F61-932D-AF6300EEF587": 40,
				"83C626C4-68B8-541E-0C64-AF6300EF0AF4": 50
			})
			.print()

		data.push(payload)
		try {
			const response = await entityAPI.createEntity(JSON.stringify(data))
			// console.dir(response.data)
			// console.dir(response.data.ids[0])

			expect(response.status).equals(200)
			const responseDelete = await entityAPI.deleteEntity(entityTypes.ASSOCIATION, response.data.ids[0])
			// console.dir(responseDelete)
			expect(responseDelete.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it.todo("transaction() [/entity/commit/transaction]", async () => {
		// expect(list.status).equals(200)
	})

	it("deleteEntity(...) [/entity/{type}/{id}]", async () => {
		const entityTypes = new InorigoEnums().entityTypes()
		const data: object[] = []
		const payload = new Entity()
			.setType(entityTypes.ASSOCIATION)
			.setDefinition(entityTypes.ASSOCIATION_DEFINITION, "C2ED6335-C1A0-C115-FD2C-AF6300EB2477")
			.setValues({
				"4F7B6B18-B8B9-D7F7-479E-AF6300EEDC08": "VITEST Entity delete autotest",
				"6630E548-8E42-1206-8B2B-AF6300EEE420": "2001-09-13",
				"DEF8268D-1CDD-3F61-932D-AF6300EEF587": 41,
				"83C626C4-68B8-541E-0C64-AF6300EF0AF4": 51
			})
			.print()

		data.push(payload)
		try {
			const response = await entityAPI.createEntity(JSON.stringify(data))
			// console.dir(response.data)
			// console.dir(response.data.ids[0])

			expect(response.status).equals(200)
			const responseDelete = await entityAPI.deleteEntity(entityTypes.ASSOCIATION, response.data.ids[0])
			// console.dir(responseDelete)
			expect(responseDelete.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getSimplifiedInstances(...) [/entity/{type}/{id}/instances]", async () => {
		// Fetch an entities instances. Only useful for definition types (AsDefinition, etc)
		try {
			const response = await entityAPI.getSimplifiedInstances("C697BD4D-33F5-88C3-8136-ABF100CF08ED")
			// console.dir(response)
			expect(response.length).toBeGreaterThan(0)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getSimplifiedEntity(...) [/entity/{type}/{id}]", async () => {
		// is missing parameters icons, presentations
		try {
			const response = await entityAPI.getSimplifiedEntity("AsInstance", "F38679E3-7FEE-36F6-DC37-AC3E007808CE")
			// console.dir(response)
			expect(response)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getGraphDependencies(...) [/entity/{type}/{id}/dependencies/graph]", async () => {
		try {
			const response = await entityAPI.getGraphDependencies("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F")
			// console.dir(response.data.edges)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getPossibleEntityReferences(...) [/entity/possible/references]", async () => {
		try {
			const response = await entityAPI.getPossibleEntityReferences("AsDefinition", "37F28315-525E-04C5-A84B-ABF0011DC8BA")
			// console.dir(response.data.attributes)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getPossibleInstanceReferences(...) [/entity/possible/instance/references]", async () => {
		try {
			const response = await entityAPI.getPossibleInstanceReferences("AsDefinition", "37F28315-525E-04C5-A84B-ABF0011DC8BA")
			// console.dir(response.data.attributes)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getPresentation(...) [/entity/{type}/{id}/presentation]", async () => {
		try {
			const response = await entityAPI.getPresentation("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F", "")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getDependencyEdges(...) [/entity/{type}/{id}/dependencies/edges]", async () => {
		try {
			const response = await entityAPI.getDependencyEdges("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F")
			// console.dir(response.data.edges)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getAttribute(...) [/entity/{type}/{entityId}/attribute/{attributeId}]", async () => {
		try {
			const response = await entityAPI.getAttribute("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F", "F0ECDF4A-4754-1740-062E-AF6300F57465")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getUserAuthorization(...) [/entity/{type}/{entityId}/authorizations/{userId}]", async () => {
		try {
			const response = await entityAPI.getUserAuthorization("AsInstance", "635e7cf7-78dd-48c5-ae0a-aca698e1d67b", "423111ec-aed6-6e84-c740-a66500636f86")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getCollateralDependants(...) [/entity/{type}/{id}/collateral/dependants]", async () => {
		try {
			const response = await entityAPI.getCollateralDependants("AsDefinition", "578A446C-E919-2353-DDB9-AF6300F5695F")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getEntityIcon(...) [/entity/{type}/{id}/icon/id]", async () => {
		try {
			const response = await entityAPI.getEntityIcon("AsInstance", "635e7cf7-78dd-48c5-ae0a-aca698e1d67b", 24, "")
			// console.dir(response.data)
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getEntityIconID(...) [/entity/{type}/{id}/icon/id]", async () => {
		const response = await entityAPI.getEntityIconID("AsInstance", "635e7cf7-78dd-48c5-ae0a-aca698e1d67b", "")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getValueset(uuid) [/entity/valueset/{id}]", async () => {
		const response = await entityAPI.getValueset("C406570B-17EA-5E54-84FE-A49D00B25D0C")
		// console.dir(response.data)
		expect(response.status).equals(200)
	})

	it("getPresentations(entityArray) [/entity/presentations]", async () => {
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

	it("getGranted(...) [/entity/granted/{type}]", async () => {
		const response = await entityAPI.getGranted("GsKnowledgeSet", "7E3AF419-7188-8220-C75C-AB1800838602", "", "create,read,update,delete", "", "")
		// console.log(response.data)
		expect(response.status).equals(200)
	})

	it.skip("generateEntity(...) [/entity/{type}/generate]", async () => {
		const response = await entityAPI.generateEntity("AsInstance", 1, "578A446C-E919-2353-DDB9-AF6300F5695F")
		// console.log(response.data)
		expect(response.status).equals(200)
	})
})
