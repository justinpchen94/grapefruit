var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    Q        = require('q'),
    saltRounds  = 10;


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

});

UserSchema.methods.comparePasswords = function (attempt) {
  console.log("inside compare passwords");
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(attempt, savedPassword, function (err, isMatch) {
    if (err) {
      console.log("rejecting");
      defer.reject(err);
    } else {
      console.log("resolving");
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

module.exports = mongoose.model('user', UserSchema);
