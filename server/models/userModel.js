var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    Q        = require('q'),
    saltRounds  = 10,
    db = require('../db.js');


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  salt: String,

  role: {
    type:String,
    required: true
  }

}, { timestamps: true });


UserSchema.methods.comparePasswords = function (attempt) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(attempt, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;

};

UserSchema.pre('save', function (next) {

  var user = this;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
