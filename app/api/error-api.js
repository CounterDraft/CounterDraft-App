"use strict";
// Only other api's or controllers should be calling the error-api to generate a json error;

/*
Error json example
------------------
{
    error: [{
        lan: en, // we should let teh user know this is a english error;
        code: 1001, //code from the database;
        msg: Invalid Google API key supplied //msg from the database;
    }]
}
------------------
*/

function errorApi(){
    this.tag = 'error-api';

    this.setError = function(errorNum, res) {

    }
    
    this.setErrorWithMessage = function(msg, res) {

    }
}

module.exports = errorApi;
