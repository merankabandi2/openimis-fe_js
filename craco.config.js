const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ensure publicPath is set to /front/ for dev server
      webpackConfig.output.publicPath = '/front/';
      
      // Inject environment variables
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL || '/api'),
          'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || '/front'),
          'process.env.OPENIMIS_CONF_JSON': JSON.stringify(process.env.OPENIMIS_CONF_JSON || ''),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
      );
      
      return webpackConfig;
    }
  },
  devServer: {
    // Proxy API requests to http://localhost:8000
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    },
    // Ensure dev server respects /front/ base path
    historyApiFallback: {
      index: '/front/index.html'
    }
  }
};