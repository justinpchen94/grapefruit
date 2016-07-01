var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Routing
var routesApi = require('./routesApi.js');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name');
  next();
});

app.set('port', process.env.PORT || 3000);

app.use('/api', routesApi);

app.use(express.static('./client'));

app.listen(app.get('port'), function() {
    console.log('Express Server listening on port', app.get('port'));
});


