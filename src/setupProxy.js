const { createProxyMiddleware } = require('http-proxy-middleware');
const packageJson = require('../package.json');

module.exports = function (app) {
  // Use 'let' because we may reassign proxyConfig below
  let proxyConfig = packageJson.proxies;

  // If no 'proxies' but 'proxy' exists, create a default config for 'api'
  if (proxyConfig === undefined && packageJson.proxy !== undefined) {
    proxyConfig = {
      api: {
        base: process.env.REACT_APP_API_URL ?? '/api',
        target: packageJson.proxy,
        newBase: process.env.REACT_APP_API_URL ?? '/api', // keep path same by default
      },
    };
  }

  if (proxyConfig && typeof proxyConfig === 'object') {
    Object.entries(proxyConfig).forEach(([key, value]) => {
      // Ensure newBase is set, fallback to base
      if (value.newBase === undefined) {
        value.newBase = value.base;
      }
      if (value.base && value.target) {
        app.use(
          value.base,
          createProxyMiddleware({
            target: value.target,
            changeOrigin: true,
            pathRewrite: {
              [`^${value.base}`]: `${value.newBase}`,
            },
            logLevel: 'debug',  // optional: useful for debugging proxy requests
          })
        );
        console.log(`Proxy set up for ${key}: ${value.base} -> ${value.target}`);
      }
    });
  }
};
