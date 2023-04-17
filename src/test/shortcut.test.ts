import { assert, describe, expect, it, expectTypeOf } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { ShortcutAPI } from "../API/ShortcutAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const shortcutAPI: ShortcutAPI = inorigoAPI.getShortcutAPI()

describe.skip("shortcut...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
	})

	it("assert InorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("assert shortcutAPI", () => {
		assert.exists(shortcutAPI)
	})

	it("getClassifiedValuesList(definitionUUID, isDeep)", async () => {
		try {
			const response = await shortcutAPI.getClassifiedValuesList("37F28315-525E-04C5-A84B-ABF0011DC8BA", true)
			// console.dir(response)
			await expect(response.length).toEqual(6)
			await expectTypeOf(response).toBeArray()
		} catch (error) {
			console.warn(error)
		}
	})
})
