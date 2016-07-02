angular.module('App.dashCtrl', [
  ])
  .controller('dashCtrl', function ($scope, $http, $location, $window, authFactory, ticketFactory) {

    $scope.display = "this is the dashboard page";
    
    $scope.newTicket = {
      name: $window.localStorage.getItem('username'),
      topic: 'bbb',
      problem: 'ccc'
    };

    $scope.id = '';

    $scope.signout = function() {
      authFactory.signout();
    };

    $scope.displayTickets = function() {
      ticketFactory.displayTickets()
        .then(function(result) {          
          $scope.tickets = result.data.data;
        })
        .catch(function(err) {
          console.error(error);
        });
    };

    $scope.addTicket = function() {
      ticketFactory.addTicket($scope.newTicket).then(function(addResult) {
        $window.localStorage.setItem('com.grapefruit', addResult.token);
        $scope.displayTickets();
      });

    };

    $scope.displayTickets();



  });