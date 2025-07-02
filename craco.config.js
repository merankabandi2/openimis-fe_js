const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Set publicPath to serve assets under /front/
      webpackConfig.output.publicPath = "/front/";

      // Inject environment variables explicitly
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          "process.env.REACT_APP_API_URL": JSON.stringify(
            process.env.REACT_APP_API_URL || "/api"
          ),
          "process.env.PUBLIC_URL": JSON.stringify(
            process.env.PUBLIC_URL || "/front"
          ),
          "process.env.OPENIMIS_CONF_JSON": JSON.stringify(
            process.env.OPENIMIS_CONF_JSON || ""
          ),
          "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "development"
          ),
        })
      );

      return webpackConfig;
    },
  },
  devServer: {
    // Proxy API requests starting with /api to backend on localhost:8000
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        logLevel: 'debug' // This logs proxy activity
      },
    },
    // Serve the SPA with base /front/ and fallback on /front/index.html for client routing
    historyApiFallback: {
      index: "/front/index.html",
    },
  },
};
