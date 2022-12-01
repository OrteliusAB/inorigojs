"use strict"
// Utility functions

// const fs = require("fs")
import fs from "fs"
import { InorigoAPI } from "../index.js"
import https from "https"
// const rootCas = require("ssl-root-cas").create()
import rootCas from "ssl-root-cas"
import path from "path"

class Utilities {
	constructor() {
		// console.log(process.cwd())
		this.config = this.getConfig()
		rootCas.addFile(path.resolve(process.cwd() + "/src/test-utils/ssl/", this.config.ssl.INTERMEDIATE_CERT))
		rootCas.addFile(path.resolve(process.cwd() + "/src/test-utils/ssl/", this.config.ssl.ROOT_CERT))
		this.inorigoAPI = this.init()
	}

	getInorigoAPI() {
		return this.inorigoAPI
	}

	fixPath(pathIn) {
		return pathIn.endsWith("/") ? pathIn : `${pathIn}/`
	}

	/**
	 * Helping methods
	 */
	init(endpoint) {
		let options = {
			authorization: {
				username: this.config.environment.INORIGO_USER,
				password: this.config.environment.INORIGO_PWD
			},
			// customHttpsAgent: httpsAgent
			customHttpsAgent: new https.Agent({
				rejectUnauthorized: false
			})
		}
		if (endpoint) {
			options = {
				authorization: {
					username: this.config.environment.INORIGO_USER,
					password: this.config.environment.INORIGO_PWD
				},
				// customHttpsAgent: httpsAgent
				customHttpsAgent: new https.Agent({
					rejectUnauthorized: false
				}),
				apiEndpoint: endpoint
			}
		}

		// return this.fixPath(config.environment.INORIGO_BASE_URL)
		return new InorigoAPI(this.fixPath(this.config.environment.INORIGO_BASE_URL), options)
	}

	/**
	 * Reads the config file and reaturns content as javascript object
	 * @param {string} path - Path to the config file
	 * @returns
	 */
	getConfig(path = process.cwd() + "/src/test-utils/config.json") {
		try {
			const config = fs.readFileSync(path)
			return JSON.parse(config)
		} catch (err) {
			console.error("Failed to read config file. " + err)
			throw err
		}
	}

	getTimestamp() {
		const date = new Date()

		// Results below assume UTC timezone - your results may vary
		const options = {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: false,
			timeZone: "UTC"
		}

		// Specify default date formatting for language (locale)
		return new Intl.DateTimeFormat("se-SE", options).format(date)
	}

	getISOTimestamp() {
		const date = new Date()
		return date.toISOString()
	}
}

export { Utilities }
