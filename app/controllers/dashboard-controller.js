function DashboardController() {
    this.tag = 'dashboardController';

    this.ApiRouter = {
        patron: function(verb, req, res) {
            switch (verb) {
                case 'post':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                case 'get':
                    getApi('dashboard-api').getPatronChartData(req, res);
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

        game: function(verb, req, res) {
            switch (verb) {
                case 'post':
                    getApi('error-api').sendError(1011, 403, res);
                    break;
                case 'get':
                    getApi('dashboard-api').getGameChartDate(req, res);
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

module.exports = DashboardController;
