/*  Title: Dashboard Controller
    Author:  Hubbert
    Date: Aug 16 2016
    Comment: 
        This should all the logic for the Dashboard page.
*/

app.controller('DashboardCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _base_templates = "templates/dashboard/";
    $scope.currentPage = null;

    //quick data;
    $scope.total_patrons = null;
    $scope.daily_active_users = null;

    //models
    $scope.user_model = { username: 'anonymous' };

    var _init = function() {
        if (typeof 'undefined' != data && data.user) {
            $scope.user_model = data.user;
        }
        //default page;
        $scope.currentPage = _getDefaultPage();
    };

    $scope.onRoute = function(page) {
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
    };

    var _getDefaultPage = function() {
        return _base_templates + 'dashboard.html';
    }

    this.getCharts = function() {
        $scope.total_patrons = 999999;
        $scope.daily_active_users = 999999;

        var margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var formatDate = d3.time.format("%d-%b-%y");

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) {
                return x(d.date); })
            .y(function(d) {
                return y(d.close); });
            
        var line = d3.svg.line()
                   .x(function(d,i) { return x( new Date(d["Date"]) ) })
                   .y(function(d,i) { return y( d["BEI"] ) });

          graph.append("svg:path")
               .attr("class", "line")
               .attr("d", function(d,i) {  return line(BEIHard); });

        var svg = d3.select("#chat-container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv("/examples/data.tsv", type, function(error, data) {
            if (error) throw error;

            x.domain(d3.extent(data, function(d) {
                return d.date; }));
            y.domain(d3.extent(data, function(d) {
                return d.close; }));

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);
        });

        function type(d) {
            d.date = formatDate.parse(d.date);
            d.close = +d.close;
            return d;
        }



    }

    _init();

}]);
