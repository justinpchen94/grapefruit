angular.module('App.signinCtrl', [
  ])
  .controller('signinCtrl', function ($scope, $http, $location, authFactory) {

    $scope.display = "this is the signin page";

    $scope.signin = function() {
      authFactory.signin($scope.user)
        .then(function(result) {

          console.log("result from signin attempt");
        });
    };
  
  });

    