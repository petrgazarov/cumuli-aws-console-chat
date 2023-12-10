const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const mode = process.env.NODE_ENV || "production";

module.exports = {
  mode,
  devtool: mode === "development" ? "source-map" : false,
  entry: {
    sidepanel: path.join(__dirname, "src", "sidePanel"),
    serviceWorker: path.join(__dirname, "src", "serviceWorker", "index.ts"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "js/[name].js",
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
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({})],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "" },
        { from: "LICENSE", to: "" },
      ],
    }),
    new StylelintPlugin({ files: "src/**/*.{ts,tsx}" }),
    new ESLintPlugin({
      extensions: ["ts", "tsx"],
      failOnError: true,
    }),
  ],
};
