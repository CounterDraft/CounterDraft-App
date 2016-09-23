function AccountController() {
    this.tag = 'accountController';

    this.ApiRouter = {
        organization: function(verb, req, res) {
            switch (verb) {
                case 'get':
                    getApi('organization-api').getOrganizationTypes(req, res);
                    break;
                case 'post':
                    this.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'put':
                    this.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'delete':
                    this.getErrorApi().sendError(1011, 403, res);
                    break;
                default:
                    this.getErrorApi().sendError(1011, 403, res);
                    break;
            }
        },
         reset: function(verb, req, res) {
            switch (verb) {
                case 'get':
                    this.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'post':
                    this.getErrorApi().sendError(1001, 403, res);
                    break;
                case 'put':
                    getApi('reset-api').resetUsernamePassword(req, res);
                    break;
                case 'delete':
                    this.getErrorApi().sendError(1011, 403, res);
                    break;
                default:
                    this.getErrorApi().sendError(1011, 403, res);
                    break;
            }
        }
    }
}

module.exports = AccountController;
