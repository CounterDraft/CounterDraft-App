function AccountController() {
    this.tag = 'accountController';

    this.ApiRouter = {
        login: function(verb, req, res) {
            switch (verb) {
                // @post(/api/login)
                case 'post':
                    getApi('login-api').login(req, res);
                    break;
                    // @get(/api/login)
                case 'get':
                    getApi('login-api').getLogin(req, res);
                    break;
                    // @put(/api/login) 
                case 'put':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                    // @delete(/api/login)     
                case 'delete':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                default:
                    getApi('error-api').sendError(1011, 403, res);
                    break;
            }
        },

        registration: function(verb, req, res) {
            switch (verb) {
                // @post(/api/register)  
                case 'post':
                    getApi('registration-api').registerUser(req, res);
                    break;
                    // @get(/api/register)     
                case 'get':
                    getApi('registration-api').getUserRegistration(req, res);
                    break;
                    // @put(/api/register)       
                case 'put':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                    // @delete(/api/register)     
                case 'delete':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                default:
                    getApi('error-api').sendError(1011, 403, res);
                    break;
            }

        },
        verify: function(verb, req, res) {
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
