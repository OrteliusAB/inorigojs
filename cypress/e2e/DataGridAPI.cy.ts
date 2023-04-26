import { InorigoAPI } from "../../src/API/InorigoApi"
import { MatrixAPI } from "../../src/API/MatrixAPI"
import https from "https"

const options = {
	authorization: {
		username: "",
		password: ""
	},
	customHttpsAgent: new https.Agent({
		rejectUnauthorized: false
	})
}

const inorigoAPI = new InorigoAPI("https://selenium2.ortelius.se/inorigo/", options)
const matrixAPI: MatrixAPI = inorigoAPI.getMatrixAPI()

describe("template spec", () => {
	let id
	it("login and start application", () => {
		cy.visit("https://selenium2.ortelius.se/inorigo/ui/application/04b207a5-842f-3b26-54c9-af6900c86ad9")
		cy.get("input[id='username']").type("")
		cy.get("input[id='password']").type("")
		cy.get("input[id='Submit1']").click()

		cy.get("[id=b332cf85-f55a-5974-622f-aeb4009defbc]")
			.get(".i-scrollable-content")
			.then($id => {
				id = $id.text()
				cy.log("ID: ", id)
			})
	})

	it("getMetaAndDataForApplicationComponent(...) [/matrix/meta/and/data/for/application/component/{runtimeid}/{componentid}]", async () => {
		const response = await matrixAPI.getMetaAndDataForApplicationComponent(id, "D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8", "All")
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("getMetaAndDataForDefinition(...) [/matrix/meta/and/data/for/definition/{definitiontype}/{definitionuuid}]", async () => {
		const response = await matrixAPI.getMetaAndDataForDefinition("AsDefinition", "C2ED6335-C1A0-C115-FD2C-AF6300EB2477", false)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("getMetaForApplicationComponent(...) [/matrix/meta/for/application/component/{applicationid}/{componentid}]", async () => {
		const response = await matrixAPI.getMetaForApplicationComponent("BFBEAF8A-A2F7-273B-C8F1-AEB30064C93A", "D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8")
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("getMetaForDefinition(...) [/matrix/meta/for/definition/{definitiontype}/{definitionuuid}]", async () => {
		const response = await matrixAPI.getMetaForDefinition("AsDefinition", "C2ED6335-C1A0-C115-FD2C-AF6300EB2477", false)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("getDataForRequest(...) [/matrix/data/for/request]", async () => {
		const payload = {
			applicationRuntimeID: id,
			applicationComponentID: "D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8",
			applicationSelection: "All"
		}
		const response = await matrixAPI.getDataForRequest(payload)
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("getMetaForFilter(...) [/matrix/meta/for/filter]", async () => {
		const payload = {
			kind: "FilterQuery",
			id: "6e29d6be-85d0-1a63-d680-a3b500df3adb",
			name: "Countries",
			dataType: "GeGeopArea",
			dataContextID: "64c3dcc8-de9b-408c-3299-a38d008c8fc7",
			operator: "AND",
			criteria: [
				{
					kind: "Definition",
					qualifier: "KIND_OF",
					dataType: "GeGeopType",
					value: {
						kind: "GlobalID",
						uuid: "7fa79d62-33fa-4fd0-b2a5-91e868e27636",
						type: "GeGeopType"
					}
				}
			]
		}
		const response = await matrixAPI.getMetaForFilter(payload)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("attributeOptionsCount(requestBody) [/matrix/attribute/options/count]", async () => {
		const payload = {
			applicationRuntimeID: id,
			applicationComponentID: "6859b04b-a871-61bf-5277-af4e00dfc442",
			attribute: {
				attrData: {
					metaID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
					key: "definitionID",
					seq: 0,
					name: "Definition",
					dataType: "AsDefinition",
					enabled: true,
					readOnly: false,
					visible: true,
					editable: true,
					multiplicity: "1",
					limited: false
				},
				metaID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
				name: "Definition",
				key: "definitionID",
				dataType: "AsDefinition",
				seq: 0,
				editable: true,
				enabled: true,
				multiplicity: "1",
				readOnly: false,
				visible: true,
				parentID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
				limited: false,
				formMeta: null
			},
			resources: null,
			collateralEntities: []
		}
		const response = await matrixAPI.attributeOptionsCount(payload)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("attributeOptionsList(requestBody) [/matrix/attribute/options/list]", async () => {
		const payload = {
			applicationRuntimeID: id,
			applicationComponentID: "6859b04b-a871-61bf-5277-af4e00dfc442",
			attribute: {
				attrData: {
					metaID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
					key: "definitionID",
					seq: 0,
					name: "Definition",
					dataType: "AsDefinition",
					enabled: true,
					readOnly: false,
					visible: true,
					editable: true,
					multiplicity: "1",
					limited: false
				},
				metaID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
				name: "Definition",
				key: "definitionID",
				dataType: "AsDefinition",
				seq: 0,
				editable: true,
				enabled: true,
				multiplicity: "1",
				readOnly: false,
				visible: true,
				parentID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
				limited: false,
				formMeta: null
			},
			valueFilter: "",
			page: 1,
			pageSize: 100,
			resources: null,
			collateralEntities: []
		}

		const response = await matrixAPI.attributeOptionsList(payload)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("populate(requestBody) [/matrix/populate]", async () => {
		const payload = {
			applicationRuntimeID: id,
			applicationComponentID: "6859b04b-a871-61bf-5277-af4e00dfc442",
			entities: [
				{
					metaID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
					entityID: {
						uuid: "13563d3b-6145-4fb2-bc63-508ffe341532",
						type: "AsInstance"
					},
					state: "Original",
					rights: ["Create", "Read", "Update", "Delete"],
					modifiedAttributeKeys: [],
					nestedEntities: [],
					propertyValues: [
						{
							index: 0,
							key: "definitionID",
							value: {
								kind: "GlobalID",
								uuid: "85db5050-9f78-cae0-3d3e-af4e00dad29b",
								type: "AsDefinition"
							},
							text: "AttributeTest",
							iconUrl: "/services/api/v1/dynamic/image/733cf1e8-5ebf-492a-994e-a009e1a9bddc?size=16"
						},
						{
							index: 0,
							key: "2be5e9d0-d59c-d32b-4929-af4e00debd94",
							value: "UnitTest Create",
							text: "UnitTest Create"
						},
						{
							index: 0,
							key: "4153c33e-d310-c3c7-4bb5-af4e00dee2d5",
							value: "UnitTest",
							text: "UnitTest"
						},
						{
							index: 0,
							key: "88a0b5b8-559d-77f4-6118-af4e00def25d",
							value: ["GlobalDate", "2023-04-26T00:00:00.000+02:00"],
							text: "2023-04-26"
						}
					]
				}
			],
			resources: [],
			collateralEntities: []
		}
		const response = await matrixAPI.populate(payload)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("commit(requestBody) [/matrix/commit]", async () => {
		const payload = {
			applicationRuntimeID: id,
			applicationComponentID: "6859b04b-a871-61bf-5277-af4e00dfc442",
			entities: [
				{
					metaID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
					entityID: {
						uuid: "13563d3b-6145-4fb2-bc63-508ffe341532",
						type: "AsInstance"
					},
					state: "Original",
					rights: ["Create", "Read", "Update", "Delete"],
					modifiedAttributeKeys: [],
					nestedEntities: [],
					propertyValues: [
						{
							index: 0,
							key: "definitionID",
							value: {
								kind: "GlobalID",
								uuid: "85db5050-9f78-cae0-3d3e-af4e00dad29b",
								type: "AsDefinition"
							},
							text: "AttributeTest",
							iconUrl: "/services/api/v1/dynamic/image/733cf1e8-5ebf-492a-994e-a009e1a9bddc?size=16"
						},
						{
							index: 0,
							key: "2be5e9d0-d59c-d32b-4929-af4e00debd94",
							value: "UnitTest Create",
							text: "UnitTest Create"
						},
						{
							index: 0,
							key: "4153c33e-d310-c3c7-4bb5-af4e00dee2d5",
							value: "UnitTest",
							text: "UnitTest"
						},
						{
							index: 0,
							key: "88a0b5b8-559d-77f4-6118-af4e00def25d",
							value: ["GlobalDate", "2023-04-26T00:00:00.000+02:00"],
							text: "2023-04-26"
						}
					]
				}
			],
			resources: [],
			collateralEntities: []
		}
		const response = await matrixAPI.commit(payload)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("attributeParseValues(requestBody) [/matrix/attribute/parse/values]", async () => {
		const payload = {
			applicationRuntimeID: id,
			applicationComponentID: "6859b04b-a871-61bf-5277-af4e00dfc442",
			attribute: {
				attrData: {
					metaID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
					key: "2be5e9d0-d59c-d32b-4929-af4e00debd94",
					seq: 10,
					name: "Name",
					dataType: "String",
					enabled: true,
					readOnly: false,
					definitionID: {
						uuid: "85db5050-9f78-cae0-3d3e-af4e00dad29b",
						type: "AsDefinition"
					},
					ownerID: {
						uuid: "85db5050-9f78-cae0-3d3e-af4e00dad29b",
						type: "AsDefinition"
					},
					visible: true,
					editable: true,
					multiplicity: "1",
					limited: false
				},
				metaID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
				name: "Name",
				key: "2be5e9d0-d59c-d32b-4929-af4e00debd94",
				dataType: "String",
				seq: 10,
				editable: true,
				enabled: true,
				multiplicity: "1",
				readOnly: false,
				visible: true,
				parentID: "20e9e041-a6e7-4c24-bf4d-e63483bc77f4",
				ownerID: {
					uuid: "85db5050-9f78-cae0-3d3e-af4e00dad29b",
					type: "AsDefinition"
				},
				definitionID: {
					uuid: "85db5050-9f78-cae0-3d3e-af4e00dad29b",
					type: "AsDefinition"
				},
				limited: false,
				formMeta: null
			},
			texts: ["Data"],
			resources: null,
			collateralEntities: []
		}
		const response = await matrixAPI.attributeParseValues(payload)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})
})
