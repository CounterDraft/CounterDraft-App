/*This file starts the app and manages the creating of the
express server all munpulation of the express server should be done here
or the respected router objects.*/
console.log('Loading webapp/api project....');

var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var sessionFactory= require("./app/sessionFactory");

var app = express();

var routerApi = require("./app/router-api");
var routerWeb = require("./app/router-web");

app.locals.title = 'My App';

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));

app.use(sessionFactory({}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// defaults to 'html_corp' if not defined in the render();
app.set('layout', 'layouts/html_app');
app.use(expressLayouts);

//@Deperacated
//Pass in Environmental Variables.
if (process.env) {
	// app.env = {}
 //    app.env.MODE = (process.env.MODE || 'undefined');
 //    app.isAuth = true;
 //    app.package_name = process.env.npm_package_name;

 //    console.log(app.env.MODE);
}

//Adding webapp calls;
app.use('', routerWeb);

//Adding api calls;
app.use('/api', routerApi);



app.listen(app.get('port'), function() {
    console.log('Node WebApp/Api is running on port', app.get('port'));
});
