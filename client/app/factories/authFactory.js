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
        return result.data;
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
      return result.data;
    });

  };

  var signout = function () {
    $window.localStorage.removeItem('com.grapefruit');
    $window.localStorage.removeItem('username');
    $window.localStorage.removeItem('role');
    $location.path('/');
  };


    return {
      signin: signin,
      signup: signup,
      signout: signout
    };


  });