angular.module('authFactory', [])
  .factory('authFactory', function($location, $http, $state) {

    var signin = function(user) {
      return $http({
        method: 'POST',
        url: 'api/users/signin',
        data: {
          username: user.username,
          password: user.password
        }
      }).then(function(result) {
        return result;
      });

    };

     var signup = function(user) {
      return $http({
        method: 'POST',
        url: 'api/users/signup',
        data: {
          username: user.username,
          password: user.password
        }
      }).then(function(result) {
        return result;
      });

    };

    return {
      signin: signin
    };


  });