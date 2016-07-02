angular.module('App', [
  'ui.router',
  'App.landingCtrl',
  'App.signinCtrl',
  'App.dashCtrl',
  'App.404Ctrl',
  'appFactory',
  'authFactory'
  // 'ngStorage'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider
      .state('landing', {
        url: '/',
        authenticate: false,
        views: {
          "": {
            templateUrl: './pages/landing/landing.html',
            controller: 'landingCtrl'
          }
        }
      })
      .state('signin', {
        url: '/signin',
        authenticate: false,
        views: {
          "": {
            templateUrl: './pages/signin/signin.html',
            controller: 'signinCtrl'
          }
        }
      })
      .state('signup', {
        url: '/signup',
        authenticate: false,
        views: {
          "": {
            templateUrl: './pages/signin/signup.html',
            controller: 'signinCtrl'
          }
        }
      })
      .state('dash', {
        url: '/dashboard',
        authenticate: false,
        views: {
          "": {
            templateUrl: './pages/dashboard/dash.html',
            controller: 'dashCtrl'
          }
        }
      })
      .state('404', {
        url: '/404',
        authenticate: false,
        views: {
          "": {
            templateUrl: './pages/error/404.html',
            controller: '404Ctrl'
          }
        }
      });

    $urlRouterProvider
      .otherwise('404');
  });
