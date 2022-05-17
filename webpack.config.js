const { resolve } = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "production",
  entry: resolve(__dirname, "src", "index.ts"),
  output: {
    clean: true,
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/dist/", // To let dev server serve from disk, rather than from memory
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  devServer: {
    static: __dirname, // As HTML file is not in dist folder
  },
};
