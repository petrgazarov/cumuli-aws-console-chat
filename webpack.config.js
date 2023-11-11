const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    popup: path.join(__dirname, "src", "popup", "Popup.tsx"),
    contentScript: path.join(__dirname, "src", "content", "ContentScript.tsx"),
    background: path.join(__dirname, "src", "background", "background.ts"),
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
    extensions: [".tsx", ".ts"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
  ],
};
