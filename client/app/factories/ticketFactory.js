angular.module('ticketFactory', [])
  .factory('ticketFactory', function($location, $http, $state, $window) {

    var getTickets = function() {
      console.log("displaying all the tickets");

      return $http({
        method:'GET',
        url: 'api/ticket',
      }).then(function(result) {
        console.log("ticketFactory:11 - the result of getting a ticket");
        console.log(result);
        return result;
      });
    };

    var addTicket = function(ticket) {
      console.log("adding ticket");
      console.log(ticket);

      return $http({
        method:'POST',
        url: 'api/ticket',
        data: {ticket: ticket}
      }).then(function(result) {
        console.log("the result of adding a ticket");
        console.log(result);
        return result.data;
      });


    };

    var putTicket = function() {
      console.log("updating a ticket");
    };

    var deleteTicket = function() {
      console.log("deleting a ticket");
    };


    return {
      displayTickets: getTickets,
      addTicket: addTicket,
      updateTicket: putTicket,
      deleteTicket: deleteTicket

    };


  });