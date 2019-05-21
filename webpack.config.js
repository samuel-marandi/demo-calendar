/* eslint-disable */

const webpack = require("webpack");

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CleanWebpackPlugin = require("clean-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackMerge = require("webpack-merge");

const getEnvironmentSpecificConfig = (env, serverConnect) =>
  require(`./build-utils/webpack.config.${env}`)(serverConnect);

const presetConfig = require("./build-utils/loadPresets");

/**
 * All the build files will be stored in this directory
 */
const BUILD_DIR = path.join(__dirname, "src/dist/");

module.exports = (
  { mode, presets, serverConnect } = { mode: "production", presets: [] }
) => {
  return webpackMerge(
    {
      watchOptions: {
        poll: true
      },
      /**
       * If you do not add these webpack will not recognize the file
       * and it will say file or module not found.
       */
      resolve: {
        extensions: [".js", ".jsx", ".scss"]
      },
      entry: {
        start: "./src/App.jsx",
        react: ["react", "react-dom"]
      },

      output: {
        path: BUILD_DIR
      },

      /**
       * ## Modules section ##
       * Here we define the loaders and other things
       * required by webpack to understand how to deal
       * with various files.
       */
      module: {
        rules: [
          {
            loader: "babel-loader",
            exclude: /node_modules/,
            test: /\.jsx?$/
          },
          {
            loader: "eslint-loader",
            test: /\.jsx?$/
          },
          {
            test: /\.scss|css$/,
            use: [
              "style-loader",
              "css-loader",
              // MiniCssExtractPlugin.loader,
              // {
              //   loader: "css-loader",
              //   options: {
              //     modules: false,
              //     importLoaders: 2
              //   }
              // },
              "sass-loader"
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
          }
        ]
      },
      /**
       * Plugins for webpack
       */
      plugins: [
        new CleanWebpackPlugin({
          verbose: true,
          exclude: ["json"],
          cleanOnceBeforeBuildPatterns: [`${BUILD_DIR}`]
        }),
        new webpack.optimize.SplitChunksPlugin({
          name: ["react"],
          filename: "[name]-[hash].bundle.js"
        }),
        new HtmlWebpackPlugin({
          title: "PlanChoice",
          filename: "index.html",
          inject: true,
          hash: true,
          xhtml: true,
          template: "src/templates/react/index.ejs",
          chunks: ["start", "react"]
        })
      ]
    },
    getEnvironmentSpecificConfig(mode, serverConnect),
    presetConfig({ mode, presets })
  );
};
