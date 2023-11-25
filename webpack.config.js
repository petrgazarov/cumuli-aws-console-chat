const path = require("path");
const crypto = require("crypto");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

__webpack_nonce__ = generateNonce();

module.exports = {
  mode: "production",
  entry: {
    sidepanel: path.join(__dirname, "src", "sidepanel"),
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
      patterns: [{ from: "public", to: "" }],
    }),
  ],
};
