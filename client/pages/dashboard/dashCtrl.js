angular.module('App.dashCtrl', ['ngMaterial'])
  .controller('dashCtrl', function ($scope, $http, $location, $window, authFactory, ticketFactory, $mdSidenav, $mdDialog) {

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
      topic: '',
      problem: ''
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

    $scope.displayTickets();

    $scope.addTicket = function() {
      ticketFactory.addTicket($scope.newTicket).then(function(addResult) {
        $window.localStorage.setItem('com.grapefruit', addResult.token);
        $scope.displayTickets();
      });

    };



    function DialogController($scope, $mdDialog, add, newTicket) {

      $scope.newTicket = newTicket;
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        add();
        $mdDialog.hide(answer);
      };
    }

    $scope.showAdd = function(ev) {
      console.log("show advanced");

      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'addTicket.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true,
        locals: {
         add: $scope.addTicket,
         newTicket: $scope.newTicket
        },
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });



      // $scope.$watch(function() {
      //   return $mdMedia('xs') || $mdMedia('sm');
      // }, function(wantsFullScreen) {
      //   $scope.customFullscreen = (wantsFullScreen === true);
      // });

    };




});
