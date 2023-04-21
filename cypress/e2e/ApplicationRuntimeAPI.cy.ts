import { InorigoAPI } from "../../src/API/InorigoApi"
import { VersoRuntimeAPI } from "../../src/API/VersoRuntimeAPI"
import https from "https"

const options = {
	authorization: {
		username: "Selenium",
		password: "123"
	},
	customHttpsAgent: new https.Agent({
		rejectUnauthorized: false
	})
}

const inorigoAPI = new InorigoAPI("https://selenium2.ortelius.se/inorigo/", options)
const versoRuntimeAPI: VersoRuntimeAPI = inorigoAPI.getVersoRuntimeAPI()

describe("template spec", () => {
	let id
	it("login and start application", () => {
		cy.visit("https://selenium2.ortelius.se/inorigo/ui/application/04b207a5-842f-3b26-54c9-af6900c86ad9")
		cy.get("input[id='username']").type("Selenium")
		cy.get("input[id='password']").type("123")
		cy.get("input[id='Submit1']").click()

		cy.get("[id=b332cf85-f55a-5974-622f-aeb4009defbc]")
			.get(".i-scrollable-content")
			.then($id => {
				id = $id.text()
				cy.log("ID: ", id)
			})
	})

	it("setComponentEnabled(...) [/application/runtime/{id}/component/enabled/{component}/{enabled}]", async () => {
		const responseDisabled = await versoRuntimeAPI.setComponentEnabled(id, "2ebb38a8-c44e-1a5c-addc-afa300a9558d", false) // p3 in application
		cy.log(responseDisabled.data)
		expect(responseDisabled.status).equals(200)
		const responseEnabled = await versoRuntimeAPI.setComponentEnabled(id, "2ebb38a8-c44e-1a5c-addc-afa300a9558d", true) // p3 in application
		expect(responseEnabled.status).equals(200)
	})

	it("setComponentVisible(...) [/application/runtime/{id}/component/visible/{component}/{visible}]", async () => {
		const responseOff = await versoRuntimeAPI.setComponentVisible(id, "D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8", false) // p0 in application
		cy.log(responseOff.data)
		expect(responseOff.status).equals(200)
		const responseOn = await versoRuntimeAPI.setComponentVisible(id, "D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8", true) // p0 in application
		cy.log(responseOn.data)
		expect(responseOn.status).equals(200)
	})

	it("refresh(vrid) [/application/runtime/{id}/refresh]", async () => {
		const response = await versoRuntimeAPI.refresh(id)
		cy.log(response.data)
		expect(response.status).equals(200)
	})

	it("getCommands(vrid) [/application/runtime/{id}/commands]", async () => {
		const response = await versoRuntimeAPI.getCommands(id)
		const data = JSON.stringify(response.data)
		cy.log(data)
		expect(response.status).equals(200)
	})

	it("setCommandEnabled(..)  [/application/runtime/{id}/component/command/enabled/{enabled}]", async () => {
		const response = await versoRuntimeAPI.setCommandEnabled(id, false, "calculate", "2EBB38A8-C44E-1A5C-ADDC-AFA300A9558D")
		expect(response.status).equals(200)
	})

	it("calculate(vrid) [/application/runtime/{id}/calculate]", async () => {
		const response = await versoRuntimeAPI.calculate(id)
		expect(response.status).equals(200)
	})

	it("selectOne(...) [/application/runtime/{id}/select/one]", async () => {
		const response = await versoRuntimeAPI.selectOne(id, "p0", "Blue", false)
		cy.log(response.data)
		expect(response.status).equals(200)
	})

	it("getValue(...) [/application/runtime/{id}/variable/value]", async () => {
		const response = await versoRuntimeAPI.getValue(id, "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("lockSelection(...) [/application/runtime/{id}/lock/selection]", async () => {
		const response = await versoRuntimeAPI.lockSelection(id, "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("unlockSelection(...) [/application/runtime/{id}/unlock/selection]", async () => {
		const response = await versoRuntimeAPI.unlockSelection(id, "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("clear(...) [/application/runtime/{id}/select/clear]", async () => {
		const response = await versoRuntimeAPI.clear(id, "p0")
		expect(response.status).equals(200)
	})

	it("selectMany(...) [/application/runtime/{id}/select/many]", async () => {
		const payload = {
			clear: true,
			records: [
				{
					where: "p0",
					what: "Black"
				},
				{
					where: "p0",
					what: "Blue"
				},
				{
					where: "p3",
					what: "Application.png"
				}
			]
		}
		const response = await versoRuntimeAPI.selectMany(id, payload)
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("countSelected(...) [/application/runtime/{id}/items/count/selected]", async () => {
		const response = await versoRuntimeAPI.countSelected(id, "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("countAll(...) [/application/runtime/{id}/items/count/all]", async () => {
		const response = await versoRuntimeAPI.countAll(id, "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("countExplicit(...) [/application/runtime/{id}/items/count/explicit]", async () => {
		const response = await versoRuntimeAPI.countExplicit(id, "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("countImplicit(..) [/application/runtime/{id}/items/count/implicit]", async () => {
		const response = await versoRuntimeAPI.countImplicit(id, "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("getScript(...) [/application/runtime/{id}/script]", async () => {
		const response = await versoRuntimeAPI.getScript(id)
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("getTooltip(...) [/application/runtime/{id}/cell/tooltip]", async () => {
		const response = await versoRuntimeAPI.getTooltip(id, "D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8", "1", "1")
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("evaluateExpression(..) [/application/runtime/{id}/evaluate]", async () => {
		const response = await versoRuntimeAPI.evaluateExpression(id, "$DATETIME_LONG()")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("focusComponent(...) [/application/runtime/{id}/component/focus/{component}]", async () => {
		const response = await versoRuntimeAPI.focusComponent(id, "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("setComponentReadOnly(...) [/application/runtime/{id}/component/readonly/{component}/{readonly}]", async () => {
		const response = await versoRuntimeAPI.setComponentReadOnly(id, "p3", true)
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("setCommandVisible(..)  [/application/runtime/{id}/component/command/visible/{visible}]", async () => {
		const response = await versoRuntimeAPI.setCommandVisible(id, "open", "p1", false)
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
		await versoRuntimeAPI.setCommandVisible(id, "open", "p1")
	})

	it("executePredefinedCommand(..)  [/application/runtime/{id}/exec/command/{command}]", async () => {
		const payload = {
			clear: true,
			records: [
				{
					where: "p0",
					what: "Black"
				},
				{
					where: "p0",
					what: "Blue"
				},
				{
					where: "p3",
					what: "Application.png"
				}
			]
		}
		await versoRuntimeAPI.selectMany(id, payload)

		const response = await versoRuntimeAPI.executePredefinedCommand(id, "clear")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("exportComponent(..)  [/application/runtime/{id}/export/{component}]", async () => {
		const response = await versoRuntimeAPI.exportComponent(id, "p1")
		// cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("executeCommand(..)  [/application/runtime/{id}/component/command/execute]", async () => {
		const response = await versoRuntimeAPI.executeCommand(id, "Create", "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("setRuntimeVariable(...) [/application/runtime/{id}/set/runtime/value]", async () => {
		const response = await versoRuntimeAPI.setRuntimeVariable(id, "CY_TEST", "STRING", "element", "value")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})

	it("triggerAction(...) [/application/runtime/{id}/entity/action/{action}]", async () => {
		const response = await versoRuntimeAPI.triggerAction(id, "create", "", "", "p0")
		cy.log(JSON.stringify(response.data))
		expect(response.status).equals(200)
	})
})
