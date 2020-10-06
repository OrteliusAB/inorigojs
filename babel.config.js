module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    ie: "11"
                },
                useBuiltIns: "usage",
                corejs: 3
            }
        ]
    ],
    plugins: ["transform-class-properties"]
}