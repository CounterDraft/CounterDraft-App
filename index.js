console.log('Loading webapp/api project....');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var expressSession = require('express-session');
var uuid = require('uuid');
var app = express();

var routerApp = require("./app/router-api");
var routerWeb = require("./app/router-web");

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));

app.use(expressSession({
  genid: function(req) {
    return uuid.v4(); // use UUIDs for session IDs 
  },
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true
}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// defaults to 'html_corp' if not defined in the render();
app.set('layout', 'layouts/html_app');
app.use(expressLayouts);

//Pass in Environmental Variables.
if (process.env) {
	// app.env = {}
 //    app.env.MODE = (process.env.MODE || 'undefined');
 //    app.isAuth = true;
 //    app.package_name = process.env.npm_package_name;

 //    console.log(app.env.MODE);
}

//Adding api calls;
routerApp.init(app);

//Adding webapp calls;
routerWeb.init(app);

app.listen(app.get('port'), function() {
    console.log('Node WebApp/Api is running on port', app.get('port'));
});
