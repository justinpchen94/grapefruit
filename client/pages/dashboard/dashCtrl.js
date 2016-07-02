angular.module('App.dashCtrl', ['ngMaterial'])
  .controller('dashCtrl', function ($scope, $http, $location, $window, authFactory, ticketFactory, $mdSidenav) {

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
 

  $scope.username = $window.localStorage.getItem('username');
  $scope.role = $window.localStorage.getItem('role');
  $scope.menu = [
      {
        link : '',
        title: 'Dashboard',
        icon: 'dashboard'
      },
      {
        link : '',
        title: 'Class',
        icon: 'group'
      },
      {
        link : '',
        title: 'Messages',
        icon: 'message'
      }
    ];

  $scope.admin = [
    {
      link : '',
      title: 'Archive',
      icon: 'delete'
    },
    {
      link : '',
      title: 'Settings',
      icon: 'settings'
    }
  ];

  $scope.display = "this is the dashboard page";
    
    $scope.newTicket = {
      name: $window.localStorage.getItem('username'),
      topic: 'asdfasda',
      problem: 'fsadfasdf'
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

    // $scope.displayTickets();


});
