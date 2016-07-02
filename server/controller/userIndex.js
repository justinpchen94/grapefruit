var User = require('../models/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {

  '/' : {
    get: function(req,res) {
      console.log("Received GET at /api/user/");
      res.end("Received GET at /api/user/");
    },
    post: function(req, res) {
      console.log("Received POST at /api/user/");

      create = Q.nbind(User.create, User);
      User.create({
         username: 'asdfadf', 
         password: 'asdf',
         salt: 'tutorials',
         role: 'student'
      }).then(function(res) {
        console.log("created user");
        console.log(res);
      });
    }
  },
  'signin': {
    get: function(req,res) {
      console.log("Received GET at /api/user/signin");
      res.end("Received GET at /api/user/signin");
    },
    post: function(req, res) {
      console.log("Received POST at /api/user/signin");
      var username = req.body.username;
      var password = req.body.password;
      
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: username})
        .then(function (user) {
          if (!user) {
            next(new Error('User does not exist'));
          } else {
            return user.comparePasswords(password)
              .then(function(foundUser) {
                if (foundUser) {
                  var token = jwt.encode(user, 'secret');
                  res.json({token: token});
                } else {
                  return next(new Error('No user'));
                }
              });
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },
  'signup': {
    get: function(req,res) {
      console.log("Received GET at /api/user/signup");
    },
    post: function(req, res) {
      console.log("Received POST at /api/user/signup");
      var username = req.body.username;
      var password = req.body.password;

    }
  }

};