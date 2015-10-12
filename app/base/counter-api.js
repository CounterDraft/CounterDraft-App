"use strict";

function baseApi(){
	this.tag = 'counter-api';

	this.getTag = function(){
		return this.name;
	}
	
	this.getErrorApi = function(){
    	var errorApi = require(GLOBAL.API_DIR + 'error-api');
    	return new errorApi();
    }
}

module.exports = baseApi;