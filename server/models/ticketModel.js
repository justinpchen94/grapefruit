var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  topic: {
    type: String,
    required: true
  },

  problem: {
    type: String,
    required: true
  },

  claimed: {
    type:Boolean
  }

});

ticketSchema.pre('save', function (next) {
  console.log("before saving ticket");

  var user = this;

  user.claimed = false;
  console.log(user);
  next();

});


module.exports = mongoose.model('tickets', ticketSchema);

