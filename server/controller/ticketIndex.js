var Ticket = require('../models/ticketModel.js');
var User = require('../models/userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {
  '/': {
    get: function(req,res) {
      console.log("Received GET at /api/ticket/");

      Ticket.find().exec(function(err, data) {
        console.log(data);
        res.json({data:data});
      });

      // res.end("Received GET at /api/ticket");
      //retrieves tickets
      
    },
    post: function(req, res) {
      //add tickets
      console.log("Received POST at /api/ticket/");
      var newTicket = req.body.ticket;

      var findUser = Q.nbind(User.findOne, User);
      findUser({username: newTicket.name})
        .then(function (user) {
          console.log(user);
          if (!user) {
            next(new Error('User does not exist, cannot post ticket'));
          } else {
            console.log("creating ticket with");
            console.log(newTicket);
            Ticket.create(newTicket, function(err, response) {
              if (err) {
                console.log(err);
              } else {
                console.log("successful creation of ticket!");

                var token = jwt.encode(user, 'secret');
                console.log(response);

                res.json({token: token, data: response});

              }
            });
          }
        });
    },
    put: function(req, res) {
      console.log("Received PUT at /api/ticket/");
      res.end("Received PUT at /api/ticket");
      //updates ticket
    },
    delete: function(req, res) {
      console.log("Received DELETE at /api/ticket/");
      res.end("Received DELETE at /api/ticket");
      //deletes ticket
    }
  }
};