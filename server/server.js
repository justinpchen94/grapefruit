var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/grapefruit');
//Routing
var routesApi = require('./routes/routesApi.js');
var routesUser = require('./routes/routesUser.js');
var routesTicket = require('./routes/routesTickets.js');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name');
  next();
});

app.use(function(req, res, next) {
    console.log("Server registering a " + req.method + " request at " + req.url);
    next(); // Passing the request to the next handler in the stack.
});

app.set('port', process.env.PORT || 3000);

app.use('/api/user', routesUser);
app.use('/api/ticket', routesTicket);
app.use('/api', routesApi);


app.use(express.static('./client'));

app.listen(app.get('port'), function() {
  var timestamp = new Date().toISOString().
  replace(/T/, ' '). 
  replace(/\..+/, ''); 

  console.log(timestamp + ': Express Server listening on port', app.get('port'));
});


