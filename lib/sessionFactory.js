// This file is used to manage a session fo the express lib, its also
// a wrapper for UUID lib and express-session.

//Defines that JavaScript code should be executed in "strict mode".
"use strict";

var expressSession = require('express-session');
var uuid = require('uuid');
var SECRET = 'fat cat 101'

module.exports = function(options) {
    var sessionDefaults = {
        secret: SECRET,
        saveUninitialized: true,
        resave: true,
        genid: function(req) {
            return uuid.v4();
        }
    }
    //mix options with sessionDefaults with options, options should override sessionDefault;
    return expressSession(sessionDefaults);
}