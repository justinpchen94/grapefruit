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

    }
  },
  'signin': {
    get: function(req,res) {
      console.log("Received GET at /api/user/signin");
      res.end("Received GET at /api/user/signin");
    },
    post: function(req, res, next) {
      console.log('***********************************************');
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
                console.log("foundUser");
                console.log(foundUser);
                if (foundUser) {
                  var token = jwt.encode(user, 'secret');
                  res.json({token: token, user:user});
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
      res.end("Received GET at /api/user/signup");
    },
    post: function(req, res) {
      console.log("Received POST at /api/user/signup");
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password,
            role: 'Instructor'
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        console.log("created user");
        console.log(user);
        var token = jwt.encode(user, 'secret');
        res.json({token: token, user:user});
      })
      .fail(function (error) {
        next(error);
      });

    }
  }

};