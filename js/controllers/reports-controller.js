/*  Title: Reports Controller
    Author:  Hubbert
    Date: Aug 31 2016
    Comment: 
        This should all the logic for the report page.
*/

app.controller('ReportsCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/reports/";
    var _base_report_templates = "templates/reports/report_templates/";
    $scope.prevPage = null;
    $scope.currentPage = null;
    $scope.reportSelected = {
        id: null,
        name: null
    }

    //testing
    $scope.reports = [{
        id: 1,
        name: 'default',
        param: {
            date: 'date',
            patrons: 'int'
        }
    }, {
        id: 2,
        name: 'default1',
        param: {
            date: 'date',
            patrons: 'int'
        }
    }, {
        id: 3,
        name: 'default2',
        param: {
            date: 'date',
            patrons: 'int'
        }
    }];

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initReportSelect = function() {
        if (typeof 'undefined' != data && data.hasOwnProperty('reports')) {
            $scope.reports = data.organization.reports;
        }
    }

    var _getDefaultPage = function() {
        return _base_templates + 'report.html';
    }

    this.onBack = function() {
        $scope.currentPage = $scope.prevPage;
    }

    this.onClose = function() {
        $scope.currentPage = $scope.prevPage;
    }

    $scope.onRunReport = function() {
        var report = $scope.reportSelected;
        if (report.name) {
            $scope.prevPage = $scope.currentPage;
            $scope.currentPage = _base_report_templates + report.name + '.html';
        }
    }

    //reports init, get data for the reports;
    this.initReportDefault = function() {
        //nothing;
    }

    _init();

}]);
