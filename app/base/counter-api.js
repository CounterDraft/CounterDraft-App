"use strict";

function baseApi() {
    this.tag = 'counter-api';

    this.getTag = function() {
        return this.name;
    }

    this.getUser = function(req, res) {
        var user = null;
        if (typeof req.session.user != 'undefined') {
            user = req.session.user;
        } else if (typeof res.locals.user != 'undefined') {
            user = res.locals.user;
        }
        return user;
    }

    this.getOrganization = function(req, res) {
        var organization = null;
        if (typeof req.session.organization != 'undefined') {
            organization = req.session.organization;
        } else if (typeof res.locals.organization != 'undefined') {
            organization = res.locals.organization;
        }
        return organization;
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
