function PatronController() {
    this.tag = 'patronController';

    this.ApiRouter = {
        default: function(verb, req, res) {
            switch (verb) {
                case 'post':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
  
                case 'get':
                    getApi('patron-api').getPatron(req, res);
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
        }
    }
}

module.exports = PatronController;
