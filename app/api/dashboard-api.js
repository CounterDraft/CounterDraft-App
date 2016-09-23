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
        var _ts = null;
        var _numOfOutput = 7;
        var Patron = models.employee_user;

        var currentTime = new Date();
        if (!req.query.duration || !req.query.ts) {
            this.getErrorApi().sendError(1012, 400, res);
            return;
        } else {
            _duration = req.query.duration;
        }
        switch (_duration) {
             case 'day':
                var patronCount = {};
                for (var x = 0; x < _numOfOutput; x++) {
                    var d = new Date().setHours(new Date().getHours() - (x * 3.4));
                    var ts = new Date().setDate(d);
                    patronCount[x] = ts;
                }

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
                break;

            case 'week':
                var patronCount = {};
                for (var x = 0; x < _numOfOutput; x++) {
                    var ts = new Date().setDate(new Date().getDate() - x);
                    patronCount[x] = ts;
                }

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
                break;

            case 'month':
                var patronCount = {};
                for (var x = 0; x < _numOfOutput; x++) {
                    var ts = new Date().setDate(new Date().getDate() - (x * 7));
                    patronCount[x] = ts;
                }

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
                break;

            case 'year':
                var patronCount = {};
                for (var x = 0; x < _numOfOutput; x++) {
                    var ts = new Date().setDate(new Date().getMonth() - x );
                    patronCount[x] = ts;
                }

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
                break;

            default:
                this.getErrorApi().sendError(1012, 400, res);
                break;
        }



    }
}

module.exports = DashboardApi;
