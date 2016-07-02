angular.module('App.signinCtrl', [
  ])
  .controller('signinCtrl', function ($scope, $http, $location,$window,  authFactory) {

    $scope.display = "this is the signin page";

    $scope.signin = function() {
      authFactory.signin($scope.user)
        .then(function(token) {
        $window.localStorage.setItem('com.grapefruit', token);
        $location.path('/dashboard');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function() {
      authFactory.signup($scope.user)
        .then(function(token) {
        $window.localStorage.setItem('com.grapefruit', token);
        $location.path('/dashboard');

        })
      .catch(function (error) {
        console.error(error);
      });
    };
  
  });

    