const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    popup: path.join(__dirname, "src", "popup", "Popup.tsx"),
    drawer: path.join(__dirname, "src", "content", "Drawer.tsx"),
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
