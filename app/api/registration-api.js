"use strict";

function registationApi() {
    this.tag = 'registation-api';
    this.registerUser = function(req, res) {
       console.log(arguments);
    }
    
    this.getUserRegistration = function(req, res) {

    }
}

module.exports = registationApi;
