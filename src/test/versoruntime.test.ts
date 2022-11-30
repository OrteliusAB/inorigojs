import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { VersoRuntimeAPI } from "../API/VersoRuntimeAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const versoRuntimeAPI: VersoRuntimeAPI = inorigoAPI.getVersoRuntimeAPI()

describe("resource...", () => {
	it("Utilities test, verify config read", () => {
		// utilities = new Utilities()
		assert.exists(utilities)
		expect("2").equals("2")
	})

	it("initialize IniorigoAPI to endpoint", () => {
		// inorigoAPI = utilities.getInorigoAPI()
		// console.log(inorigoAPI)
		assert.exists(inorigoAPI)
	})

	it.skip("check connection [??]", async () => {
		assert.exists(versoRuntimeAPI)
		// const response = await versoRuntimeAPI.
		// expect(list.status).equals(200)
	})

	it.skip("refresh(vrid) [/application/runtime/{id}/refresh]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("calculate(vrid) [/application/runtime/{id}/calculate]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
	it.skip("clear(...) [/application/runtime/{id}/select/clear]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getValue(...) [/application/runtime/{id}/variable/value]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("selectOne(...) [/application/runtime/{id}/select/one]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("selectMany(...) [/application/runtime/{id}/select/many]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("countAll(...) [/application/runtime/{id}/items/count/all]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	// =====
	it.skip("countSelected(...) [/application/runtime/{id}/items/count/selected]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("countExplicit(...) [/application/runtime/{id}/items/count/explicit]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("countImplicit(..) [/application/runtime/{id}/items/count/implicit]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getScript(...) [/application/runtime/{id}/script]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getTooltip(...) [/application/runtime/{id}/cell/tooltip]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("evaluateExpression(..) [/application/runtime/{id}/evaluate]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("setRuntimeVariable(...) [/application/runtime/{id}/set/runtime/value]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("lockSelection(...) [/application/runtime/{id}/lock/selection]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("unlockSelection(...) [/application/runtime/{id}/unlock/selection]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("focusComponent(...) [/application/runtime/{id}/component/focus/{component}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("setComponentReadOnly(...) [/application/runtime/{id}/component/readonly/{component}/{readonly}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("triggerAction(...) [/application/runtime/{id}/entity/action/{action}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("setComponentVisible(...) [/application/runtime/{id}/component/visible/{component}/{visible}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("setComponentEnabled(...) [/application/runtime/{id}/component/enabled/{component}/{enabled}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getCommands(vrid) [/application/runtime/{id}/commands]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("setCommandEnabled(..)  [/application/runtime/{id}/component/command/enabled/{enabled}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("executeCommand(..)  [/application/runtime/{id}/component/command/execute]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("setCommandVisible(..)  [/application/runtime/{id}/component/command/visible/{visible}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("executePredefinedCommand(..)  [/application/runtime/{id}/exec/command/{command}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("exportComponent(..)  [/application/runtime/{id}/export/{component}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
