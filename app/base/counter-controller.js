"use strict";

function baseController() {
    this.tag = 'counter-controller';

    this.getTag = function() {
        return this.name;
    }

    this.getErrorApi = function() {
        var errorApi = require(GLOBAL.API_DIR + 'error-api');
        return new errorApi();
    }

    this.rest = function(req, res) {
        
        var nonAuthRestList = [
            'confirmation',
            'registration',
            'login'
        ];

        logger.debug('determine which call to invoke.');
        if (req && req.params && typeof req.params['type'] != 'undefined' && req.params['type'] != '' && req.method) {
            var restCallStr = null;
            if (req.params['id'] === '') {
                restCallStr = 'default';
            } else {
                restCallStr = req.params['id'];
            }

            //cleans the str if it has a tailing "/";
            if (restCallStr.substr(-1) === '/') {
                restCallStr = restCallStr.substr(0, restCallStr.length - 1);
            }

            if (this.ApiRouter.hasOwnProperty(restCallStr)) {
                var user = req.session.user || req.session.api_user;

                if (!user && nonAuthRestList.indexOf(restCallStr) == -1) {
                    if (!req.get('key')) {
                        this.getErrorApi().sendError(1026, 400, res);
                    } else if (!req.get('employee_id')) {
                        this.getErrorApi().sendError(1027, 400, res);
                    } else {
                        this.getErrorApi().sendError(1025, 400, res);
                    }
                    return;
                }

                var route = this.ApiRouter[restCallStr];
                route(req.method.toLowerCase(), req, res, this);
            } else {
                this.getErrorApi().sendError(1011, 422, res);
                return;
            }

        } else {
            this.getErrorApi().sendError(1023, 422, res);
        }
        return this;
    }
}

module.exports = baseController;
