angular.module('App.dashCtrl', [
  ])
  .controller('dashCtrl', function ($scope, $http, $location, $window, authFactory, ticketFactory) {

    $scope.display = "this is the dashboard page";
    
    $scope.newTicket = {
      name: 'test',
      topic: 'bbb',
      problem: 'ccc'
    };

    $scope.signout = function() {
      authFactory.signout();
    };

    $scope.displayTickets = function() {
      console.log("displaying tickets");
      // ticketFactory.displayTickets();
      //will eventually be a promise
    };

    $scope.addTicket = function() {
      ticketFactory.addTicket($scope.newTicket).then(function(addResult) {
        console.log("dash controller received below upon adding");
        console.log(addResult);

        $window.localStorage.setItem('com.grapefruit', addResult.token);
        $scope.displayTickets();
      });

    };



  });