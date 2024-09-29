const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    stats: {
        children: true
    },
    mode: "production", // Change to 'development' for debugging
    entry: {
        popup: "./chrome/popup/popup.js",
        content: "./chrome/scripts/content.js",
        background: "./chrome/background.js",
    },
    output: {
        filename: "[name].js", // Generates popup.bundle.js, content.bundle.js, background.bundle.js
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/, // For CSS files
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/, // To handle HTML imports
                use: ["html-loader"],
            },
        ],
    },
    plugins: [
        // Generate popup.html and inject popup.bundle.js
        // new HtmlWebpackPlugin({
        //     filename: "popup.html",
        //     template: "./chrome/popup/popup.html",
        //     // chunks: ["popup"], // Include only the popup chunk
        // }),
        // Copy static assets like icons to the dist folder
        new CopyWebpackPlugin({
            patterns: [
                { from: "chrome/images", to: "images" }, // Copies everything from src/icons to dist/icons
                { from: "chrome/popup/popup.css", to: "popup/popup.css" },
                { from: "chrome/manifest.json", to: "manifest.json" },
                { from: "chrome/popup/popup.html", to: "popup/popup.html" },
            ],
        }),
    ],
    // devtool: "source-map", // Enable source maps for easier debugging
};
