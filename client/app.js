angular.module('App', [
  'ui.router',
  'App.landingCtrl',
  'App.signinCtrl',
  'App.dashCtrl',
  'appFactory'
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
      .state('dash', {
        url: '/dashboard',
        authenticate: false,
        views: {
          "": {
            templateUrl: './pages/dashboard/dash.html',
            controller: 'dashCtrl'
          }
        }
      });

    $urlRouterProvider
      .otherwise('/');
  });
