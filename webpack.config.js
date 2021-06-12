// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: {
    main: "./src/index.js",
    theme: "./src/scss/theme.scss",
    'theme-rwd': "./src/scss/theme-rwd.scss",
  },
  optimization: {
    removeEmptyChunks: true,
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html", minify: false, inject: !isProduction }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new RemoveEmptyScriptsPlugin(),
    new CopyPlugin({ patterns: [{ from: "src/assets", to: "" }] })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: 'sass-loader', options: { sassOptions: { outputStyle: "expanded" } }, }
        ],
      }
    ],
  },
  target: 'web'
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
