var mongoose = require('mongoose');
var crypto   = require('crypto');

var ticketSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  problem: {
    type: String,
    required: true
  },

  claimed: Boolean,
  completed: Boolean,

  id: {
    type: String,
    unique: true
  }

}, { timestamps: true });


var createSha = function(str) {
  var shasum = crypto.createHash('sha1');
  shasum.update(str);
  return shasum.digest('hex');
};


ticketSchema.pre('save', function(next){
  var code = createSha(this.problem + this.name + this.topic);
  this.id = code;
  this.claimed = false;
  this.completed = false;
  next();
});


//TODO:
//check if exact same ticket has been entered
module.exports = mongoose.model('Ticket', ticketSchema);

