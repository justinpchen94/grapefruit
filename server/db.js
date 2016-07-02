var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("db up");
});

mongoose.connect('mongodb://admin:password@ds011715.mlab.com:11715/grapefruit');

module.exports = db;