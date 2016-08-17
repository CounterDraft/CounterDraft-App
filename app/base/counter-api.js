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

    this.getModal = function(model){
    	if(model){
    		return GLOBAL.models[model];
    	}
    	return GLOBAL.models; 	
    }
}

module.exports = baseApi;