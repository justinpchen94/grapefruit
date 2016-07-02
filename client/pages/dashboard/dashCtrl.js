angular.module('App.dashCtrl', [
  ])
  .controller('dashCtrl', function ($scope, $http, $location, $window, authFactory, ticketFactory) {

    $scope.display = "this is the dashboard page";
    
    $scope.newTicket = {
      username: 'test',
      topic: 'bbb',
      problem: 'ccc'
    };

    $scope.signout = function() {
      authFactory.signout();
    };

    $scope.displayTickets = function() {
      ticketFactory.displayTickets();
      //will eventually be a promise
    };

    $scope.addTicket = function() {
      ticketFactory.addTicket($scope.newTicket).then(function(addResult) {
        console.log("dash controller received below upon adding");
        console.log(addResult);
      });

    };



  });