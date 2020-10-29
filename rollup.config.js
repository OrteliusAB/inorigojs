import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"

const DIST_FOLDER = "bundle"
const LIBRARY_NAME = "inorigojs"

export default [
    {
        input: "./src/index.js",
        output: [
            {
                file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.cjs.js`,
                format: "cjs",
                exports: "auto"
            },
            {
                file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.esm.js`,
                format: "esm"
            },
            {
                file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.umd.js`,
                format: "umd",
                name: LIBRARY_NAME,
                globals: {
                    axios: "axios"
                }
            },
            {
                file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.iife.js`,
                format: "iife",
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
                exports: "auto"
            },
            {
                file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.esm.min.js`,
                format: "esm"
            },
            {
                file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.umd.min.js`,
                format: "umd",
                name: LIBRARY_NAME,
                globals: {
                    axios: "axios"
                }
            },
            {
                file: `${DIST_FOLDER}/${LIBRARY_NAME.toLocaleLowerCase()}.iife.min.js`,
                format: "iife",
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
            terser()
        ]
    }
]
