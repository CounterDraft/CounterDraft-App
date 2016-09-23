function DashboardController() {
    this.tag = 'dashboardController';

    this.ApiRouter = {
        charts: function(verb, req, res) {
            switch (verb) {
                case 'post':
                    this.getErrorApi().sendError(1011, 403, res);
                    break;
                case 'get':
                    getApi('dashboard-api').getChartData(req, res);
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
        }
    }
}

module.exports = DashboardController;
