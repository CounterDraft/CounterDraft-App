"use strict";

function baseApi(){
	this.tag = 'counter-api';

	this.getTag = function(){
		return this.name;
	}
}

module.exports = baseApi;