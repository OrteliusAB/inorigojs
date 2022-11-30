import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { ThemeAPI } from "../API/ThemeAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const themeAPI: ThemeAPI = inorigoAPI.getThemeAPI()

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
		assert.exists(themeAPI)
		// const list = await resourceAPI
		// expect(list.status).equals(200)
	})

	it.skip("getCssDefault(cssClass) [/theme/css/default]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getVariablesDefault() [/theme/variables/default]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getVariablesPortal() [/theme/variables/portal]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getCssPortal(cssClass) [/theme/css/portal]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getCssSession(cssClass) [/theme/css/session]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getVariablesSession() [/theme/variables/session]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getVariables(id) [/theme/variables/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getCss(id, cssClass) [/theme/css/{id}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getImage(...) [/theme/image/{key}]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getThemedImage(...) [/theme/timage]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getTheme() [/theme]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getWorkbenchTheme() [/theme/variables/workbench]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("getWorkbenchStylesheet() [/theme/css/workbench]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip("applyTheme(...) [/theme/apply]", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})

	it.skip(" []", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
