import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import pkg from "./package.json"
import { terser } from "rollup-plugin-terser"

const DIST_FOLDER = "bundle"
const LIBRARY_NAME = "inorigojs"
const VERSION = pkg.version
const AUTHOR = pkg.author
const HOMEPAGE = pkg.homepage
const DESCRIPTION = pkg.description
const BANNER = `/** @preserve
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
				file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.cjs.js`,
				format: "cjs",
				banner: BANNER,
				exports: "auto"
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.esm.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.umd.js`,
				format: "umd",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.iife.js`,
				format: "iife",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			}
		],
		external: ["axios"],
		plugins: [
			resolve(),
			commonjs(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js", ".ts"],
				babelHelpers: "bundled"
			})
		]
	},
	{
		input: "./src/index.js",
		output: [
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.cjs.min.js`,
				format: "cjs",
				banner: BANNER,
				exports: "auto"
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.esm.min.js`,
				format: "esm",
				banner: BANNER
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.umd.min.js`,
				format: "umd",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			},
			{
				file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.iife.min.js`,
				format: "iife",
				banner: BANNER,
				name: LIBRARY_NAME,
				globals: {
					axios: "axios"
				}
			}
		],
		external: ["axios"],
		plugins: [
			resolve(),
			commonjs(),
			babel({
				exclude: "node_modules/**",
				extensions: [".js", ".ts"],
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
	}
]
