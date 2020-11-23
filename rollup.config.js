import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import builtins from "rollup-plugin-node-builtins"
import globals from "rollup-plugin-node-globals"
import json from "@rollup/plugin-json"
import pkg from "./package.json"
import { terser } from "rollup-plugin-terser"

const DIST_FOLDER = "bundle"
const LIBRARY_NAME = "inorigojs"
const VERSION = pkg.version
const AUTHOR = pkg.author
const HOMEPAGE = pkg.homepage
const DESCRIPTION = pkg.description
const BANNER = `/** @preserve @license @cc_on
 * ----------------------------------------------------------
 * ${LIBRARY_NAME} version ${VERSION}
 * ${DESCRIPTION}
 * ${HOMEPAGE}
 * Copyright (c) ${new Date().getFullYear()} ${AUTHOR}
 * All Rights Reserved. MIT License
 * https://mit-license.org/
 * ----------------------------------------------------------
 */\n`

export default [
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.cjs.js`,
				format: "cjs",
				banner: BANNER,
				exports: "auto"
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.esm.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.umd.js`,
				format: "umd",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.iife.js`,
				format: "iife",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			}
		],
		external: ["axios", "corejs"],
		plugins: [
			json(),
			resolve({
				preferBuiltins: true
			}),
			commonjs(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js"],
				babelHelpers: "bundled"
			})
		]
	},
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.cjs.min.js`,
				format: "cjs",
				banner: BANNER,
				exports: "auto"
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.esm.min.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.umd.min.js`,
				format: "umd",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.iife.min.js`,
				format: "iife",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			}
		],
		external: ["axios", "corejs"],
		plugins: [
			json(),
			resolve({
				preferBuiltins: true
			}),
			commonjs(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js"],
				babelHelpers: "bundled"
			}),
			terser({
				format: {
					comments(node, comment) {
						const text = comment.value
						const type = comment.type
						if (type == "comment2") {
							return /@preserve|@license|@cc_on/i.test(text)
						}
					}
				}
			})
		]
	},
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.cjs.full.min.js`,
				format: "cjs",
				banner: BANNER,
				exports: "auto"
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.esm.full.min.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.umd.full.min.js`,
				format: "umd",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.iife.full.min.js`,
				format: "iife",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			}
		],
		external: [],
		plugins: [
			json(),
			resolve({
				preferBuiltins: true
			}),
			commonjs({
				include: "node_modules/axios/**"
			}),
			globals(),
			builtins(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js"],
				babelHelpers: "bundled"
			}),
			terser({
				format: {
					comments(node, comment) {
						const text = comment.value
						const type = comment.type
						if (type == "comment2") {
							return /@preserve|@license|@cc_on/i.test(text)
						}
					}
				}
			})
		]
	},
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.cjs.legacy.min.js`,
				format: "cjs",
				banner: BANNER,
				exports: "auto"
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.esm.legacy.min.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.umd.legacy.min.js`,
				format: "umd",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME}.iife.legacy.min.js`,
				format: "iife",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			}
		],
		external: [],
		plugins: [
			json(),
			resolve({
				preferBuiltins: true
			}),
			commonjs(),
			globals(),
			builtins(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js"],
				babelHelpers: "bundled",
				presets: [
					[
						"@babel/env",
						{
							modules: false,
							targets: {
								browsers: "> 0.25%, ie 11, not op_mini all, not dead",
								node: 8
							},
							useBuiltIns: "usage",
							corejs: 3
						}
					]
				]
			}),
			terser({
				format: {
					comments(node, comment) {
						const text = comment.value
						const type = comment.type
						if (type == "comment2") {
							return /@preserve|@license|@cc_on/i.test(text)
						}
					}
				}
			})
		]
	}
]
