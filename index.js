var express = require('express');
var app = express();

var startApp = function() {
  var bootstrap = require('./bootstrap.js');
  bootstrap.start(app, express);
  
  var routes = require('./routes.js');
  routes.setup(app);

  app.listen(GLOBAL.config.server.port, GLOBAL.config.server.ip, function() {
    logger.info('Server started.');
    logger.info('Listening on port: ' + GLOBAL.config.server.port);
  });
};

startApp();

/*
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/