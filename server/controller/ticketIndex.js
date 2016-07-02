var Ticket = require('../models/ticketModel.js');

module.exports = {
  '/': {
    get: function(req,res) {
      console.log("Received GET at /api/ticket/");
      res.end("Received GET at /api/ticket");
      //retrieves tickets
      
    },
    post: function(req, res) {
      console.log("Received POST at /api/tickets/");
      // res.end("Received POST at /api/ticket");
      //add tickets
    },
    put: function(req, res) {
      console.log("Received PUT at /api/tickets/");
      res.end("Received PUT at /api/ticket");
      //updates ticket
    },
    delete: function(req, res) {
      console.log("Received DELETE at /api/tickets/");
      res.end("Received DELETE at /api/ticket");
      //deletes ticket
    }
  }
};