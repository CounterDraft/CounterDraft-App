"use strict";

function baseApi() {
    this.tag = 'counter-api';

    this.getTag = function() {
        return this.name;
    }

    this._cleanEmployee = function(employee) {
        var moment = getMoment();
        return {
            email_address: employee.email_address,
            first_name: employee.first_name,
            id: employee.id,
            is_active: employee.is_active,
            last_name: employee.last_name,
            organization_id: employee.organization_id,
            username: employee.username,
            uuid: employee.e_uuid,
            createdAt: moment(employee.createdAt).unix(),
            updatedAt: moment(employee.updatedAt).unix()
        }
    }

    this._cleanPatron = function(patron) {
        var moment = getMoment();
        var hasAddress = false;
        var patr = {
            email_address: patron.email_address,
            first_name: patron.first_name,
            id: patron.id,
            is_active: patron.is_active,
            last_name: patron.last_name,
            organization_id: patron.organization_id,
            username: patron.username,
            phone: patron.phone,
            dob: moment(patron.dob).unix(),
            uuid: patron.p_uuid,
            createdAt: moment(patron.createdAt).unix(),
            updatedAt: moment(patron.updatedAt).unix()
        }
        var address = {
            street_number: patron.street_number,
            route: patron.route,
            locality: patron.locality,
            administrative_area_level_1: patron.administrative_area_level_1,
            administrative_area_level_2: patron.administrative_area_level_2,
            country: patron.country,
            postal_code: patron.postal_code,
        }
        for (var x in address) {
            if (address[x]) {
                hasAddress = true;
            }
        }
        if(hasAddress){
            patr.address = address;
        }
        return patr;
    }

    this._refreshSession = function(req, employee) {
        req.session.user = {
            employee_id: employee.id,
            username: employee.username,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email_address: employee.email_address,
            permissions: ['restricted:employee']
        }
        if (employee.is_admin) {
            req.session.user['permissions'] = ['restricted:admin,employee'];
        }
        return true;
    }

    this._refreshSessionOrganization = function(req, organization) {
        req.session.organization = {
            id: organization.id,
            name: organization.name,
            description: organization.description
        }
        return true;
    }

    this.getModelPattern = function(fieldName) {
        switch (fieldName) {
            case "first_name":
                return new RegExp("^[_A-z]{1,}$");
                break;
            case "last_name":
                return new RegExp("^[_A-z]{1,}$");
                break;
            case "password":
                return new RegExp("^.{6,}$");
                break;
            case "phone":
                return new RegExp("[0-9]{11}");
                break;
            default:
                return new RegExp();
                break;
        }
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
