"use strict";

function DashboardApi() {
    this.tag = 'dashboard-api';
    
    this.getChartData = function(req, res) {
        res.status(200).json({
            msg: 'Get chart data call!',
            success: true
        });
    }
}

module.exports = DashboardApi;
