function AccountController() {
    this.tag = 'accountController';

    this.ApiRouter = {
        organization: function(verb, req, res, self) {
            switch (verb) {
                case 'get':
                    getApi('organization-api').getOrganizationTypes(req, res);
                    break;
                case 'post':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'put':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'delete':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                default:
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
            }
        },
        reset: function(verb, req, res, self) {
            switch (verb) {
                case 'get':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'post':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'put':
                    getApi('reset-api').resetUsernamePassword(req, res);
                    break;
                case 'delete':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                default:
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
            }
        },
        default: function(verb, req, res,self) {
            switch (verb) {
                case 'post':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'get':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;  
                case 'put':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;   
                case 'delete':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                default:
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
            }
        }
    }
}

module.exports = AccountController;
