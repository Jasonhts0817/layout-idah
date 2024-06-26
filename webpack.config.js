// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const isProduction = process.env.NODE_ENV == "production";
const isLocal = process.env.NODE_ENV == "local";

const config = {
  entry: () => {
    let outPutFile = {
      idah: "./src/scss/idah.scss",
      "idah-rwd": "./src/scss/idah-rwd.scss",
      "idah-service": "./src/scss/idah-service.scss",
      "idah-solution": "./src/scss/idah-solution.scss",
      "search-dialogs": "./src/scss/search-dialogs.scss",
    };
    let localFile = {
      "develop-css": "./src/scss/develop-css.scss",
    };
    outPutFile = isLocal ? { ...outPutFile, ...localFile } : outPutFile;
    return outPutFile;
  },
  optimization: {
    removeEmptyChunks: true,
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: false,
      inject: isLocal,
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new RemoveEmptyScriptsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/css", to: "./css" },
        { from: "src/fonts", to: "./fonts" },
        { from: "src/images", to: "./images" },
        { from: "src/js", to: "./js" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { url: false } },
          { loader: "postcss-loader" },
          {
            loader: "sass-loader",
            options: { sassOptions: { outputStyle: "expanded" } },
          },
        ],
      },
    ],
  },
  target: "web",
};

if (isLocal) {
}
module.exports = () => {
  console.log(process.env.NODE_ENV);
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
