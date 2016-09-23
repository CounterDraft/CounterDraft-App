"use strict";
/*  Title: Dashboard-api
    Author:  Hubbert
    Date: Sep 23 2016
    Comment: 
        This is the api which is used for all dashboard calls.
*/

function DashboardApi() {
    this.tag = 'dashboard-api';

    /* duration = 'week' | 'day' | '5day' | 'month' | '3month' | 'year' | '5year' | 'max';
        {
            duration: string,
            timeZone: string ex. pst
        }
     */
    this.getChartData = function(req, res) {
        var self = this;
        var _charts = null;
        var _duration = 'week';
        var _duration = 'pst';

        if (!req.body.duration || !req.body.timeZone) {
            this.getErrorApi().sendError(1012, 400, res);
            return;
        }else{
            _duration = req.body.duration;
        }

        switch(_duration){
            case 'week':
            break;
            case 'day':
            break;
            case '5day':
            break;
            case 'month':
            break;
            case '3month':
            break;
            case 'year':
            break;
            case '5year':
            break;
            case 'max':
            break;
            default:
                this.getErrorApi().sendError(1012, 400, res);
            break;
        }


        res.status(200).json({
            msg: 'Get chart data call!',
            success: true
        });
    }
}

module.exports = DashboardApi;
