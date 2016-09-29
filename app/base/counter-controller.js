"use strict";

function baseController() {
    this.tag = 'counter-controller';

    this.getTag = function() {
        return this.name;
    }

    this.getErrorApi = function(){
    	var errorApi = require(GLOBAL.API_DIR + 'error-api');
    	return new errorApi();
    }

    this.rest = function(req, res) {
        logger.debug('determine which call to invoke.');
        if (req && req.params && typeof req.params['type'] != 'undefined' && req.params['type'] != '' && req.method) {
            var restCallStr = null;
            if(req.params['id'] === ''){
                restCallStr = 'default';
            }else{
                restCallStr = req.params['id'];
            }
            
        	//cleans the str if it has a tailing "/";
            if (restCallStr.substr(-1) === '/') {
                restCallStr = restCallStr.substr(0, restCallStr.length - 1);
            }

            if(this.ApiRouter.hasOwnProperty(restCallStr)){
            	var apiRouter = this.ApiRouter[restCallStr];
            	apiRouter(req.method.toLowerCase(), req, res);
            }else{
            	logger.warn(this.tag + ' - Does not support this call. Please check your call.');
            }

        } else {
            logger.warn(this.tag + ' - Does not support this call. Please check your call.');
        }
        return this;
    }
}

module.exports = baseController;
