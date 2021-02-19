// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($rootScope,$state,$stateParams,$ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("fb56bac1-311e-408b-9d4a-867511671282")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
    
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
})

      
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
           // console.log(toState.name)
            if (localStorage.getItem('lOGIN_DATA') == undefined || localStorage.getItem('lOGIN_DATA') == null) {
                if(toState.name=='app.intro' ){
                    
                }else{
                  // window.location='#/welcome-page'
                $state.go('app.intro')
                  event.preventDefault();
                }
          } else {

          }
      });

  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.worksheets', {
    url: '/worksheets',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.tests', {
      url: '/tests',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  
      .state('app.intro', {
      url: '/intro',
      views: {
        'menuContent': {
          templateUrl: 'templates/intro.html',
          controller: 'AppCtrl'
        }
      }
    })

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'AppCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/worksheets');
});
