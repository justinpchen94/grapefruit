angular.module('authFactory', [])
  .factory('authFactory', function($location, $http, $state, $window) {

    var signin = function(user) {
      return $http({
        method: 'POST',
        url: 'api/user/signin',
        data: {
          username: user.username,
          password: user.password
        }
      }).then(function(result) {
        return result.data.token;
      });

    };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: 'api/user/signup',
      data: {
        username: user.username,
        password: user.password
      }
    }).then(function(result) {
      return result.data.token;
    });

  };

  var signout = function () {
    $window.localStorage.removeItem('com.grapefruit');
    $location.path('/');
  };


    return {
      signin: signin,
      signup: signup,
      signout: signout
    };


  });