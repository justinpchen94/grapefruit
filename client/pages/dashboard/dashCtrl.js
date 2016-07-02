angular.module('App.dashCtrl', [
  ])
  .controller('dashCtrl', function ($scope, $http, $location) {
    $scope.display = "this is the dashboard page";

    

  $scope.signup = function() {
    authFactory.signout()
    //   .then(function(token) {
    //   $window.localStorage.setItem('com.grapefruit', token);
    //   $location.path('/dashboard');

    //   })
    // .catch(function (error) {
    //   console.error(error);
    // });

  };

  

  });