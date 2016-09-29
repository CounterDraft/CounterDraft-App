function AccountController() {
    this.tag = 'accountController';

    this.ApiRouter = {
        organization: function(verb, req, res) {
            switch (verb) {
                case 'get':
                    getApi('organization-api').getOrganizationTypes(req, res);
                    break;
                case 'post':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                case 'put':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                case 'delete':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                default:
                    getApi('error-api').sendError(1011, 403, res);
                    break;
            }
        },
        reset: function(verb, req, res) {
            switch (verb) {
                case 'get':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                case 'post':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                case 'put':
                    getApi('reset-api').resetUsernamePassword(req, res);
                    break;
                case 'delete':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                default:
                    getApi('error-api').sendError(1011, 403, res);
                    break;
            }
        },
        default: function(verb, req, res) {
            switch (verb) {
                // @post(/api/verify) 
                case 'post':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                    // @get(/api/verify)    
                case 'get':
                    getApi('error-api') sendError(1011, 403, res);
                    break;
                    // @put(/api/verify)     
                case 'put':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                    // @delete(/api/verify)     
                case 'delete':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                default:
                    getApi('error-api').sendError(1011, 403, res);
                    break;
            }
        }
    }
}

module.exports = AccountController;
