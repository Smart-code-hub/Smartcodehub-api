const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    server: "./app.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3666,
    host: `localhost`
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "smartcodehubapi.js"
  },
  target: "node",
  mode: "production",
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()] // Need this to avoid error when working with Express
};
