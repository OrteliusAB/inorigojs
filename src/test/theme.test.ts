import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { ThemeAPI } from "../API/ThemeAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const themeAPI: ThemeAPI = inorigoAPI.getThemeAPI()

describe("Theme suit", () => {
	it("Utilities test, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("assert themeAPI", async () => {
		assert.exists(themeAPI)
	})

	it("getCssDefault(cssClass) [/theme/css/default]", async () => {
		const response = await themeAPI.getCssDefault("")
		expect(response.status).equals(200)
	})

	it("getVariablesDefault() [/theme/variables/default]", async () => {
		const response = await themeAPI.getVariablesDefault()
		expect(response.status).equals(200)
	})

	// needs a theme created for portal system-setting ui.theme.portal
	it("getVariablesPortal() [/theme/variables/portal]", async () => {
		try {
			const response = await themeAPI.getVariablesPortal()
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	// needs a theme created for portal system-setting ui.theme.portal
	it("getCssPortal(cssClass) [/theme/css/portal]", async () => {
		try {
			const response = await themeAPI.getCssPortal()
			expect(response.status).equals(200)
		} catch (error) {
			console.warn(error)
		}
	})

	it("getCssSession(cssClass) [/theme/css/session]", async () => {
		const response = await themeAPI.getCssSession("")
		expect(response.status).equals(200)
	})

	it("getVariablesSession() [/theme/variables/session]", async () => {
		const response = await themeAPI.getVariablesSession()
		expect(response.status).equals(200)
	})

	it("getVariables(id) [/theme/variables/{id}]", async () => {
		const responseSession = await themeAPI.getVariablesSession()

		const response = await themeAPI.getVariables(responseSession.data.id)
		expect(response.status).equals(200)
	})

	it("getCss(id, cssClass) [/theme/css/{id}]", async () => {
		const responseSession = await themeAPI.getVariablesSession()

		const response = await themeAPI.getCss(responseSession.data.id)
		expect(response.status).equals(200)
	})

	it("getImage(...) [/theme/image/{key}]", async () => {
		const response = await themeAPI.getImage("ic-appbuilder.svg")
		expect(response.status).equals(200)
	})

	it("getThemedImage(...) [/theme/timage]", async () => {
		const response = await themeAPI.getThemedImage("ic-appbuilder.svg")
		expect(response.status).equals(200)
	})

	it("getTheme() [/theme]", async () => {
		const response = await themeAPI.getTheme()
		expect(response.status).equals(200)
	})

	it("getWorkbenchTheme() [/theme/variables/workbench]", async () => {
		const response = await themeAPI.getWorkbenchTheme()
		expect(response.status).equals(200)
	})

	it("getWorkbenchStylesheet() [/theme/css/workbench]", async () => {
		const response = await themeAPI.getWorkbenchStylesheet()
		expect(response.status).equals(200)
	})

	it("applyTheme(...) [/theme/apply]", async () => {
		const svg =
			"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#F7F7F7\" d=\"M4 2h24a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v24h24V4H4z\"/><rect width=\"12\" height=\"2\" x=\"10\" y=\"13\" fill=\"#80B7C4\" rx=\"1\"/><rect width=\"12\" height=\"2\" x=\"10\" y=\"17\" fill=\"#80B7C4\" rx=\"1\"/></g></svg>"

		const response = await themeAPI.applyTheme("#f7f7f7", "#80b7c4", "#ccdde2", svg)
		// console.log(response)
		expect(response.status).equals(200)
	})
})
