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
                    logger.warn(this.tag + 'A error has been generated json a error json.');
                    break;
                    // @delete(/api/login)     
                case 'delete':
                    logger.warn(this.tag + 'A error has been generated json a error json.');
                    break;
                default:
                    logger.warn(this.tag + 'A error has been generated for return json a error json.');
                    break;
            }
        },

        register: function(verb, req, res) {
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
                    logger.warn(this.tag + 'A error has been generated json a error json.');
                    break;
                    // @delete(/api/register)     
                case 'delete':
                    logger.warn(this.tag + 'A error has been generated json a error json.');
                    break;
                default:
                    logger.warn(this.tag + 'A error has been generated for return json a error json.');
                    break;
            }

        },
        verify: function(verb, req, res) {
            switch (verb) {
                // @post(/api/verify) 
                case 'post':
                    logger.warn(this.tag + 'A error has been generated json a error json.');
                    break;
                    // @get(/api/verify)    
                case 'get':
                    logger.warn(this.tag + 'A error has been generated json a error json.');
                    break;
                    // @put(/api/verify)     
                case 'put':
                    logger.warn(this.tag + 'A error has been generated json a error json.');
                    break;
                    // @delete(/api/verify)     
                case 'delete':
                    logger.warn(this.tag + 'A error has been generated json a error json.');
                    break;
                default:
                    logger.warn(this.tag + 'A error has been generated for return json a error json.');
                    break;
            }
        }
    }
}

module.exports = AccountController;
