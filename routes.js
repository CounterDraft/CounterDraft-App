"use strict";

module.exports = {
	setup: function(app) {
		var routesWeb = require('./app/routes-web');
		var routesApi = require('./app/routes-api');
		routesWeb.setup(app);
		routesApi.setup(app);
	}
};