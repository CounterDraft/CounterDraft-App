"use strict";
/*  Title: Dashboard-api
    Author:  Hubbert
    Date: Sep 23 2016
    Comment: 
        This is the api which is used for all dashboard calls.
*/

function DashboardApi() {
    this.tag = 'dashboard-api';

    this.getGameChartDate = function(req, res) {
        res.status(200).json({
            msg: 'Call for getting open games on a line graph',
            success: true
        });
    }


    /* duration = 'week' | 'day' | 'month'  | 'year' | 'max';
        {
            duration: string,
            timeZone: string ex. pst
        }
     */
    this.getPatronChartData = function(req, res) {
        var self = this;
        var duration = 'week';
        var numOfOutput = 7;
        var patronCount = {};
        var currentTime = new Date();
        if (!req.query.duration) {
            this.getErrorApi().sendError(1012, 400, res);
            return;
        } else {
            duration = req.query.duration;
        }

        switch (duration) {
            case 'day':
                for (var x = 0; x < numOfOutput; x++) {
                    var d = new Date();
                    var date = d.setHours(d.getHours() - (x * 3.4));
                    patronCount[x] = date;
                }
                _getChart(patronCount, numOfOutput, res);
                break;

            case 'week':
                for (var x = 0; x < numOfOutput; x++) {
                    var ts = new Date().setDate(new Date().getDate() - x);
                    patronCount[x] = ts;
                }
                _getChart(patronCount, numOfOutput, res);
                break;

            case 'month':
                for (var x = 0; x < numOfOutput; x++) {
                    var ts = new Date().setDate(new Date().getDate() - (x * 7));
                    patronCount[x] = ts;
                }
                _getChart(patronCount, numOfOutput, res);
                break;

            case 'year':
                for (var x = 0; x < numOfOutput; x++) {
                    var d = new Date();
                    var date = d.setMonth(d.getMonth() - x);
                    patronCount[x] = date;
                }
                _getChart(patronCount, numOfOutput, res);
                break;

            case 'max':
                for (var x = 0; x < numOfOutput; x++) {
                    var d = new Date();
                    var date = d.setFullYear(d.getFullYear() - x);
                    patronCount[x] = date;
                }
                _getChart(patronCount, numOfOutput, res);
                break;

            default:
                this.getErrorApi().sendError(1012, 400, res);
                break;
        }
    }

    var _getChart = function(patronCount, numOfOutput, res) {
        var Patron = models.patron_player;
        Patron.findAndCountAll({
            where: {
                createdAt: {
                    $lte: new Date(patronCount[0])
                }
            }
        }).then(function(result) {
            patronCount[0] = {
                date_ts: patronCount[0],
                count: result.count
            }
            return Patron.findAndCountAll({
                where: {
                    createdAt: {
                        $lte: new Date(patronCount[1])
                    }
                }
            });
        }).then(function(result) {
            patronCount[1] = {
                date_ts: patronCount[1],
                count: result.count
            }
            return Patron.findAndCountAll({
                where: {
                    createdAt: {
                        $lte: new Date(patronCount[2])
                    }
                }
            });
        }).then(function(result) {
            patronCount[2] = {
                date_ts: patronCount[2],
                count: result.count
            }
            return Patron.findAndCountAll({
                where: {
                    createdAt: {
                        $lte: new Date(patronCount[3])
                    }
                }
            });
        }).then(function(result) {
            patronCount[3] = {
                date_ts: patronCount[3],
                count: result.count
            }
            return Patron.findAndCountAll({
                where: {
                    createdAt: {
                        $lte: new Date(patronCount[4])
                    }
                }
            });
        }).then(function(result) {
            patronCount[4] = {
                date_ts: patronCount[4],
                count: result.count
            }
            return Patron.findAndCountAll({
                where: {
                    createdAt: {
                        $lte: new Date(patronCount[5])
                    }
                }
            });
        }).then(function(result) {
            patronCount[5] = {
                date_ts: patronCount[5],
                count: result.count
            }
            return Patron.findAndCountAll({
                where: {
                    createdAt: {
                        $lte: new Date(patronCount[6])
                    }
                }
            });
        }).then(function(result) {
            patronCount[6] = {
                date_ts: patronCount[6],
                count: result.count
            }
            res.status(200).json({
                patronCount: patronCount,
                success: true
            });
        });
    }
}

module.exports = DashboardApi;
