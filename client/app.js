angular.module('App', [
  'ui.router',
  'App.landingCtrl',
  'App.signinCtrl',
  'App.dashCtrl',
  'App.404Ctrl',
  'authFactory',
  'ticketFactory'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider){

    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');

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
      })
      .state('test', {
        url: '/test',
        authenticate: false,
        views: {
          "": {
            templateUrl: './pages/test/test.html',
            controller: 'testCtrl'
          }
        }
      });

    $urlRouterProvider
      .otherwise('404');
  });
