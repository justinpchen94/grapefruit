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
    type:Boolean,
    required: true
  }

});


module.exports = mongoose.model('tickets', ticketSchema);


