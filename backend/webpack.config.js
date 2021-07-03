const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/__bundle"),
    filename: "four-api.js",
  },
  resolve: {
    extensions: [".js", ".ts"],
    fallback: {
      util: require.resolve("util/"),
    },
    modules: ["node_modules", path.resolve(__dirname, "app")],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals(), "pg", "sqlite3", "tedious", "pg-hstore"],
};
