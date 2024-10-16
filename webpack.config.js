const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    stats: {
        children: true,
    },
    mode: "production",
    entry: {
        popup: "./chrome/popup/popup.js",
        content: "./chrome/scripts/content.js",
        background: "./chrome/background.js",
    },
    output: {
        filename: (pathData) => {
            if (pathData.chunk.name === "popup") {
                return "popup/popup.js";
            }
            if (pathData.chunk.name === "content") {
                return "scripts/content.js";
            }
            if (pathData.chunk.name === "background") {
                return "background.js";
            }
            return "[name].js";
        },
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "chrome/images", to: "images" },
                { from: "chrome/popup/popup.css", to: "popup/popup.css" },
                { from: "chrome/manifest.json", to: "manifest.json" },
                { from: "chrome/popup/popup.html", to: "popup/popup.html" },
            ],
        }),
    ],
};
