angular.module('App.signinCtrl', [
  ])
  .controller('signinCtrl', function ($scope, $http, $location,$window,  authFactory) {

    $scope.display = "this is the signin page";

    $scope.signin = function() {
      authFactory.signin($scope.user1)
        .then(function(result) {
            console.log(result);
          $window.localStorage.setItem('com.grapefruit', result.token);
          $window.localStorage.setItem('username',result.user.username);
          $window.localStorage.setItem('role',result.user.role);
          $location.path('/dashboard');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function() {
      authFactory.signup($scope.user2)
        .then(function(result) {
          $window.localStorage.setItem('com.grapefruit', result.token);
          $window.localStorage.setItem('username',result.user.username);
          $window.localStorage.setItem('role',result.user.role);
          $location.path('/dashboard');

        })
      .catch(function (error) {
        console.error(error);
      });
    };
  
  });

    