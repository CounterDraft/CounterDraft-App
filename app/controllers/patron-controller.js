function PatronController() {
    this.tag = 'patronController';

    this.ApiRouter = {
        default: function(verb, req, res, self) {
            switch (verb) {
                case 'post':
                    getApi('patron').create(req, res);
                    break;
                case 'get':
                    getApi('patron').getPatron(req, res);
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

module.exports = PatronController;
