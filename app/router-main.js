"use strict";

module.exports = {
	setup: function(app) {
		var routesApi = require('./routes-api');
		var routesWeb = require('./routes-web');
		routesWeb.setup(app);
		routesApi.setup(app);
	}
};