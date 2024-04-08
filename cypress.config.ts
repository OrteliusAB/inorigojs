import { defineConfig } from "cypress"

export default defineConfig({
	// component: {
	// 	devServer(cypressConfig: CypressConfiguration) {
	// 		// return devServer instance or a promise that resolves to
	// 		// a dev server here
	// 		return {
	// 			port: 1234,
	// 			close: () => {}
	// 		}
	// 	}
	// },

	e2e: {
		baseUrl: "https://selenium2.ortelius.se/inorigo/"
		// setupNodeEvents(on, config) {
		// 	// implement node event listeners here
		// }
	}
})
