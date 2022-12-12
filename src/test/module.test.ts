import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { ModuleAPI } from "../API/ModuleAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const moduleAPI: ModuleAPI = inorigoAPI.getModuleAPI()

describe.skip("Module...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert IniorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("check connection [/knowledgeset/list]", async () => {
		assert.exists(moduleAPI)
	})

	it("getComponentModifiers() [/module/application/component/modifiers]", async () => {
		const payload = {
			componentID: "D2A9A29A-8EE4-A00A-59A1-AEB4006CD5B8",
			applicationID: "04b207a5-842f-3b26-54c9-af6900c86ad9"
		}
		const response = await moduleAPI.getModuleModifiers(payload)
		expect(response.status).equals(200)
	})

	it("getModule(...) [/module/{id}]", async () => {
		const response = await moduleAPI.getModule("0a2af80e-4528-4688-8031-55c114cbfba7")
		expect(response.status).equals(200)
	})

	it("getModuleState(...) [/module/state/{id}]", async () => {
		const responseAllStates = await moduleAPI.getAllModuleStates()

		let moduleId = ""
		for (const item of responseAllStates.data) {
			if (item.enabled && item.approved) {
				moduleId = item.moduleID
				break
			}
		}

		const responseState = await moduleAPI.getModuleState(moduleId)
		expect(responseState.status).equals(200)
	})

	it("getModuleStates() [/module/states]", async () => {
		const response = await moduleAPI.getAllModuleStates()
		expect(response.status).equals(200)
	})

	it("isModuleActive(...) [/module/active/{id}]", async () => {
		const response = await moduleAPI.isModuleActive("0a2af80e-4528-4688-8031-55c114cbfba7")
		expect(response.status).equals(200)
	})

	// does not work, get http status 401 for delete
	it.skip("registerDependency(...) [/module/dependency]", async () => {
		const payload = {
			requesterID: "8057210C-395E-4D0A-93EC-FA58F4743638",
			resourceDataType: "UnResource",
			resourceID: "F754A777-A73B-4B91-8FA4-673D2C6045EC"
		}
		const responseRegister = await moduleAPI.registerDependency(payload)

		expect(responseRegister.status).equals(204)

		const responseDelete = await moduleAPI.deleteDependency(payload)
		expect(responseDelete.status).equals(204)
	})

	// does not work, get http status 401 for delete
	it.skip("deleteDependency(...) [/module/dependency]", async () => {
		const payload = {
			requesterID: "8057210C-395E-4D0A-93EC-FA58F4743638",
			resourceDataType: "UnResource",
			resourceID: "F754A777-A73B-4B91-8FA4-673D2C6045EC"
		}
		const responseRegister = await moduleAPI.registerDependency(payload)

		expect(responseRegister.status).equals(204)

		const responseDelete = await moduleAPI.deleteDependency(payload)
		expect(responseDelete.status).equals(204)
	})

	it("deleteModule(...) [/module/{id}]", async () => {
		const requestBody: object = {
			name: "VITEST_DELETE_MODULE",
			description: "VITEST Delete Module",
			externalAddress: "http://test",
			iconData:
				"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACz0lEQVRYCcVXvWsUURCf2WxCCk/S2MQzxFwUO+EMasAIGo1GQbG3CZhW0DKgYqd/gwEbKxFF8VuTwiBRuRzYCeaSkDvT2ATPIiSXfc7vXfbY29vNvux9+GDZfe/NzG/em4+dYdpmfC8UkqV15zIpvqiYUqyoW5HatQ0LMfFfoV0R2hyxemV3WM8PJ5OFMB4O2sgu/+52Smt3ZW+MlGoLojFeY94U2oeW3Xkn3bNnxc9Xo0B24dclRzmPiFTCT1zfnIsWW1fTfXtfeOVY3klmMX9dkfOs8eBAUQnIBoYXs3IDODkIlFJVSnmJG/HNzA6TdcW9Ca2AtvnG2o/mnDxIbTFHe+ch+IQ+bdnhGm3zIGB3TSW2nJwYobaxrpbq9nZXtulboqO9g3utcpzXGWpboH9WV+nlk8d0c3wsWg0Jb2DbSDJi+2iGEIrNUonmvszS9Ls3lP06SyWZGw/BtpHh4uAvzv/UoDNTHwgnjzOAbZfTqxk7gD59fK+Bl3LzNUy7u7poaPgsDZ+/ULMXtABsOyq3u4z3bk0EXrFt23Tk+CCdGhnV7zaZmw5gG1N/+zxTJbc31U+nz43SyTMjhJPHHU3NeiZKcSa3bBQC929PaG/3ezlMkD42qG8DptiJCaCgsQIgNnVCmGZ//wGwRI4dKeCVhiiYevuawsLw6XS1z3h5vd+xFXCFhCUiUwWMo8AF9L9h86MnhvTjNZGfLmzOc7l80TQXhAmJu4760UIBGVdAvXzARirOSRwejBI2kOqJIqnal/CumgdNgG2hdA7abMmaYFuo26lcOrcEswIimMDWNWFmIf9AKqJrlc1WfDBPDvTtG9f/AjQNkhSLrcAtY0hRqjGJtAK6OpWmASVzs5UAhm5Qtrqkyt8QdbqExY1mKgHZwHB7Ahy20pi4J/+vrRmUgHZoGiQyJhsSHYgwkaUbEV9fCLyaG8CiO1rRnv8D8ZlIJkXNeegAAAAASUVORK5CYII=",
			mimeType: "image/png",
			integrations: [],
			dataTypes: [],
			variants: []
		}
		const response = await moduleAPI.registerModule(requestBody)

		expect(response.status).equals(200)

		const deleteResponse = await moduleAPI.deleteModule(response.data.uuid)
		expect(deleteResponse.status).equals(204)
	})

	it("registerModule(...) [/module]", async () => {
		const requestBody: object = {
			name: "VITEST_REGISTER_MODULE",
			description: "VITEST Register Module",
			externalAddress: "http://test",
			iconData:
				"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACz0lEQVRYCcVXvWsUURCf2WxCCk/S2MQzxFwUO+EMasAIGo1GQbG3CZhW0DKgYqd/gwEbKxFF8VuTwiBRuRzYCeaSkDvT2ATPIiSXfc7vXfbY29vNvux9+GDZfe/NzG/em4+dYdpmfC8UkqV15zIpvqiYUqyoW5HatQ0LMfFfoV0R2hyxemV3WM8PJ5OFMB4O2sgu/+52Smt3ZW+MlGoLojFeY94U2oeW3Xkn3bNnxc9Xo0B24dclRzmPiFTCT1zfnIsWW1fTfXtfeOVY3klmMX9dkfOs8eBAUQnIBoYXs3IDODkIlFJVSnmJG/HNzA6TdcW9Ca2AtvnG2o/mnDxIbTFHe+ch+IQ+bdnhGm3zIGB3TSW2nJwYobaxrpbq9nZXtulboqO9g3utcpzXGWpboH9WV+nlk8d0c3wsWg0Jb2DbSDJi+2iGEIrNUonmvszS9Ls3lP06SyWZGw/BtpHh4uAvzv/UoDNTHwgnjzOAbZfTqxk7gD59fK+Bl3LzNUy7u7poaPgsDZ+/ULMXtABsOyq3u4z3bk0EXrFt23Tk+CCdGhnV7zaZmw5gG1N/+zxTJbc31U+nz43SyTMjhJPHHU3NeiZKcSa3bBQC929PaG/3ezlMkD42qG8DptiJCaCgsQIgNnVCmGZ//wGwRI4dKeCVhiiYevuawsLw6XS1z3h5vd+xFXCFhCUiUwWMo8AF9L9h86MnhvTjNZGfLmzOc7l80TQXhAmJu4760UIBGVdAvXzARirOSRwejBI2kOqJIqnal/CumgdNgG2hdA7abMmaYFuo26lcOrcEswIimMDWNWFmIf9AKqJrlc1WfDBPDvTtG9f/AjQNkhSLrcAtY0hRqjGJtAK6OpWmASVzs5UAhm5Qtrqkyt8QdbqExY1mKgHZwHB7Ahy20pi4J/+vrRmUgHZoGiQyJhsSHYgwkaUbEV9fCLyaG8CiO1rRnv8D8ZlIJkXNeegAAAAASUVORK5CYII=",
			mimeType: "image/png",
			integrations: [],
			dataTypes: [],
			variants: []
		}
		const response = await moduleAPI.registerModule(requestBody)

		expect(response.status).equals(200)

		const deleteResponse = await moduleAPI.deleteModule(response.data.uuid)
		expect(deleteResponse.status).equals(204)
	})

	it("getModule() [/module]", async () => {
		const response = await moduleAPI.listModules(true)
		expect(response.status).equals(200)
	})
})
