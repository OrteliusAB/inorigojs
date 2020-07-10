const path = require("path")

module.exports = {
    mode: "production",
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "inorigojs.js",
        path: path.resolve(__dirname, "bundle"),
        libraryTarget: "umd",
        library: "inorigojs",
        libraryExport: "default",
        globalObject: `(() => {
          if(typeof self !== "undefined") {
              return self
          }
          else if(typeof window !== "undefined") {
              return window
          }
          else if(typeof global !== "undefined") {
              return global
          }
          else {
              return Function('return this')()
          }
        })`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}
