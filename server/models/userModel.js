var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    Q        = require('q'),
    SALT_WORK_FACTOR  = 10;


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
  // var savedPassword = this.password;
  // return bcrypt.compare(attempt, savedPassword, function (err, isMatch){}).then(function(err, res) {
  //     if (err) {
  //       console.log("error comparing passwords");
  //       return err;
  //     } else {
  //       return res;
  //     }

  // });
  
};

UserSchema.pre('save', function (next) {
  console.log("inside pre save method");

  var user = this;

  console.log("this is the pre changed user");
  console.log(user);
  // only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) {
  //   return next();
  // }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    console.log("generated salt");
    console.log(salt);
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
    console.log("generated hash");
    console.log(hash);

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      console.log("this is the user");
      console.log(user);
      next();
    });
  });
});

module.exports = mongoose.model('users', UserSchema);
