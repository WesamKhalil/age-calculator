const path = require("path")
const babelTransformRuntime = require('@babel/plugin-transform-runtime')

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: process.env.PORT || 5000,
        open: true,
        hot: true

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}