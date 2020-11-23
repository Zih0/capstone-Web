const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://13.209.21.159:5000',
			changeOrigin: true,
		})
	);
};
