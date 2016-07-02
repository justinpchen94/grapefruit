var Ticket = require('../models/ticketModel.js');
var User = require('../models/userModel.js');
var Q = require('q');

module.exports = {
  '/': {
    get: function(req,res) {
      console.log("Received GET at /api/ticket/");
      res.end("Received GET at /api/ticket");
      //retrieves tickets
      
    },
    post: function(req, res) {
      //add tickets
      console.log("Received POST at /api/ticket/");
      console.log("the data received from post is: ");
      // res.end("Received POST at /api/ticket");
      console.log(req.body.ticket);

      var newTicket = req.body.ticket;
      // var newTicket = {
      //   username: req.body.ticket.username,
      //   topic: req.body.ticket.topic,
      //   problem: req.body.ticket.problem
      // };
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: newTicket.username})
        .then(function (user) {
          console.log("result of find user");
          console.log(user);
          if (!user) {
            next(new Error('User does not exist, cannot post ticket'));
          } else {
            console.log("user exists");
   
            // create = Q.nbind(Ticket.create, Ticket);

            console.log("creating ticket with");
            console.log(newTicket);
            Ticket.create(newTicket, function(err, res) {
              if (err) {
                console.log(err);
              } else {
                console.log("success!");
                console.log(res)
              }
            });
            console.log("created!");
          }
        })
        // .then(function(ticket) {
        //   console.log("the result of creating a ticket inside ticketIndex");
        //   console.log(ticket);

        // })
        // .fail(function (error) {
        //   next(error);
        // });


      // res.end("Received POST at /api/ticket");
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