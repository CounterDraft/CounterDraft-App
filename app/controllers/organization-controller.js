function OrganizationController() {
    this.tag = 'organizationController';

    this.ApiRouter = {
        default: function(verb, req, res, self) {
            switch (verb) {
                case 'post':
                    self.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'get':
                    getApi('organization').get_organization(req, res);
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

module.exports = OrganizationController;
