import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { VersoRuntimeAPI } from "../API/VersoRuntimeAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const versoRuntimeAPI: VersoRuntimeAPI = inorigoAPI.getVersoRuntimeAPI()

describe("resource...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
		expect("2").equals("2")
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it.todo("check connection [??]", async () => {
		assert.exists(versoRuntimeAPI)
		// const response = await versoRuntimeAPI.
		// expect(list.status).equals(200)
	})

	it.todo("refresh(vrid) [/application/runtime/{id}/refresh]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("calculate(vrid) [/application/runtime/{id}/calculate]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
	it.todo("clear(...) [/application/runtime/{id}/select/clear]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getValue(...) [/application/runtime/{id}/variable/value]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("selectOne(...) [/application/runtime/{id}/select/one]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("selectMany(...) [/application/runtime/{id}/select/many]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("countAll(...) [/application/runtime/{id}/items/count/all]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	// =====
	it.todo("countSelected(...) [/application/runtime/{id}/items/count/selected]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("countExplicit(...) [/application/runtime/{id}/items/count/explicit]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("countImplicit(..) [/application/runtime/{id}/items/count/implicit]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getScript(...) [/application/runtime/{id}/script]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getTooltip(...) [/application/runtime/{id}/cell/tooltip]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("evaluateExpression(..) [/application/runtime/{id}/evaluate]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("setRuntimeVariable(...) [/application/runtime/{id}/set/runtime/value]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("lockSelection(...) [/application/runtime/{id}/lock/selection]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("unlockSelection(...) [/application/runtime/{id}/unlock/selection]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("focusComponent(...) [/application/runtime/{id}/component/focus/{component}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("setComponentReadOnly(...) [/application/runtime/{id}/component/readonly/{component}/{readonly}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("triggerAction(...) [/application/runtime/{id}/entity/action/{action}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("setComponentVisible(...) [/application/runtime/{id}/component/visible/{component}/{visible}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("setComponentEnabled(...) [/application/runtime/{id}/component/enabled/{component}/{enabled}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("getCommands(vrid) [/application/runtime/{id}/commands]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("setCommandEnabled(..)  [/application/runtime/{id}/component/command/enabled/{enabled}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("executeCommand(..)  [/application/runtime/{id}/component/command/execute]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("setCommandVisible(..)  [/application/runtime/{id}/component/command/visible/{visible}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("executePredefinedCommand(..)  [/application/runtime/{id}/exec/command/{command}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.todo("exportComponent(..)  [/application/runtime/{id}/export/{component}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
