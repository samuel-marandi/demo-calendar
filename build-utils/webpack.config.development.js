/* eslint-disable no-console */
/* eslint-disable consistent-return */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const environment = require("../environmentConfig");

module.exports = serverConnect => ({
  devServer: {
    proxy: {
      "/app/*": {
        target: `${environment[serverConnect]}`,
        secure: false,
        bypass(req) {
          if (
            req.headers.accept.indexOf("html") !== -1 &&
            (req.url.indexOf("sso-form") === -1 &&
              req.url.indexOf("sso/saml/") === -1 &&
              req.url.indexOf("sso-login") === -1)
          ) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          }
        }
      }
    },
    host: "0.0.0.0"
  },
  output: {
    publicPath: "/",
    filename: "app/js/[name]-[hash].min.js"
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "app/js/app-styles-[contenthash].css"
    })
  ]
});
