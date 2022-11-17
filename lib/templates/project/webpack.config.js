const HTMLWebpackPlugin = require("html-webpack-plugin");

const RULES_JS = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  },
];

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
  },
  module: {
    rules: RULES_JS,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
