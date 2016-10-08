"use strict";

function baseApi() {
    this.tag = 'counter-api';

    this.getTag = function() {
        return this.name;
    }

    this.validEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(email);
    }

    this.getErrorApi = function() {
        var errorApi = require(GLOBAL.API_DIR + 'error-api');
        return new errorApi();
    }

    this.getModal = function(model) {
        if (model) {
            return GLOBAL.models[model];
        }
        return GLOBAL.models;
    }
}

module.exports = baseApi;
