"use strict";
// Only other api's or controllers should be calling the error-api to generate a json error;

/*
Error json example
------------------
{
    error: [{
        language: en, // we should let teh user know this is a english error;
        code: 1001, //code from the database;
        msg: Invalid Google API key supplied //msg from the database;
    }]
}


200 – OK – Everything is working
201 – OK – New resource has been created
204 – OK – The resource was successfully deleted
304 – Not Modified – The client can use cached data
400 – Bad Request – The request was invalid or cannot be served. The exact error should be explained in the error payload. E.g. „The JSON is not valid“
401 – Unauthorized – The request requires an user authentication
403 – Forbidden – The server understood the request, but is refusing it or the access is not allowed.
404 – Not found – There is no resource behind the URI.
422 – Unprocessable Entity – Should be used if the server cannot process the entity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.
500 – Internal Server Error – API developers should avoid this error. If an error occurs in the global catch blog, the stracktrace should be logged and not returned as response.

------------------
*/

//temp list of errors;
var errorList = {
    1001: {
        msg: 'Invaild username/password.'
    },
    1002: {
        msg: 'Username does not exists in the systems.'
    },
    1003: {
        msg: 'Registration missing required field, first_name.'
    },
    1004: {
        msg: 'Registration missing required field, last_name.'
    },
    1005: {
        msg: 'Registration missing required field, email_address Or email is not a acceptable form'
    },
    1006: {
        msg: 'Registration missing required field, password.'
    },
    1007: {
        msg: 'Registration missing required field, password_confirm.'
    },
    1008: {
        msg: 'Failed to insert table, possible duplicate record or incorrect organization.'
    },
    1009: {
        msg: 'Failed to get organizations from organization_type table.'
    },
    1010: {
        msg: 'Reset needs either a username or email address.'
    },
    1011: {
        msg: 'Not supported call.'
    },
    1012: {
        msg: 'Call missing required parameter.'
    },
    1013: {
        msg: 'Failed to hash password, please check your password.'
    },
    1014: {
        msg: 'Password and password confirm do not match.'
    },
    1015: {
        msg: 'Registration missing required fields, organization_name and organization_type Or organization_hash must be submitted.'
    },
    1016: {
        msg: 'Registration missing required fields, organization_type.'
    },
    1017: {
        msg: 'Registration missing required fields, organization_name.'
    },
    1018: {
        msg: 'Failed, email_address is already registration in the system.'
    },
    1019: {
        msg: 'Failed to registration email, no token provided.'
    },
    1020: {
        msg: 'Registration failed please request a new email to be sent.'
    },
    1021: {
        msg: 'Registration failed, token has expired.'
    },
    1022: {
        msg: 'Your email address has already been confirmed, please login to enjoy the CounterDraft experience.'
    },
    1023: {
        msg: 'Missing parameter in call.'
    },
    1024: {
        msg: 'Unknown server error, please check your rest call for proper usage.'
    },
    1025: {
        msg: 'Failed, key and employee_id combination, user not found.'
    },
    1026: {
        msg: 'Missing key in header. ex = {key: <secret_key>, employee_id: <id_of_employee>}'
    },
    1027: {
        msg: 'Missing employee_id in header. ex = {key: <secret_key>, employee_id: <id_of_employee>}'
    },
    1028: {
        msg: 'UKNOWN Error employee does not have a valid organization, please contact a adminstrator for assistance.'
    },
    1029: {
        msg: 'Failed to find employee in organization, the attempt has been logged.'
    },
    1030: {
        msg: 'Failed to find organization, the attempt has been logged.'
    },
    1031: {
        msg: 'Missing required parameter, id'
    },
    1032: {
        msg: 'Employee not found in the system.'
    },





    //Internal Server Errors
    9901: {
        msg: 'Failed to generate and save registration token for user.'
    },
    9902: {
        msg: 'Failed to send email to user, verify the email configs are correct.'
    },
    9903: {
        msg: 'Unknown error, failed to find user in system.'
    }
}

function errorApi() {
    this.tag = 'error-api';

    this.errorObject = function() {
        this.language = "en";
        this.code = null;
        this.msg = "Unknown";
    }

    this.sendError = function(errorNum, status, res) {
        var eo = new this.errorObject();
        eo.code = errorNum;

        if (errorList[errorNum]) {
            eo.msg = errorList[errorNum].msg;
            if (res) {
                res.status(status).json({
                    error: [eo],
                    success: false
                });
            } else {
                return {
                    error: [eo],
                    success: false
                }
            }

        } else {
            if (res) {
                res.status(status).json({
                    error: [eo],
                    success: false
                });
            } else {
                return {
                    error: [eo],
                    success: false
                }
            }

        }
    }

    this.setErrorWithMessage = function(msg, status, res) {
        var eo = new this.errorObject();
        eo.msg = msg;
        res.status(status).json({
            error: [eo],
            success: false
        });
    }

    this.getErrorMsg = function(errorNum) {
        return errorList[errorNum].msg;
    }

    this.getError = function(msg) {
        var eo = new this.errorObject();
        if (msg) {
            eo.msg = msg;
        }
        return eo;
    }
}

module.exports = errorApi;
