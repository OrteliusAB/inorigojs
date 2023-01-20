import { assert, describe, expect, it } from "vitest"
import { InorigoAPI } from "../API/InorigoApi"
import { ShortcutAPI } from "../API/ShortcutAPI"
import { Utilities } from "../test-utils/utilities"

const utilities: Utilities = new Utilities()
const inorigoAPI: InorigoAPI = utilities.getInorigoAPI()
const shortcutAPI: ShortcutAPI = inorigoAPI.getShortcutAPI()

describe("shortcut...", () => {
	it("assert utilities class, verify config read", () => {
		assert.exists(utilities)
		expect("2").equals("2")
	})

	it("assert InorigoAPI", () => {
		assert.exists(inorigoAPI)
	})

	it("assert shortcutAPI", async () => {
		assert.exists(shortcutAPI)
	})

	it.todo("getClassifiedValuesList(definitionUUID, isDeep)", async () => {
		// const list = await KSAPI.countRows(uuid, isDistinct)
		// expect(list.status).equals(200)
	})
})
