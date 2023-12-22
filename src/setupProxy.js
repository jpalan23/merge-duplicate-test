const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v3",
    createProxyMiddleware({
      target: "https://api.sportmonks.com",
      changeOrigin: true,
    }),
  );
};
