'use strict';

/**
 * @ngdoc overview
 * @name muzicApp
 * @description
 * # muzicApp
 *
 * Main module of the application.
 */
var app = angular
  .module('muzicApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularSoundManager',
    'LocalStorageModule'
]).constant('_', _);

app.config(function ($routeProvider, $httpProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })      
      .when('/Login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'Login'
      })
      .otherwise({
        redirectTo: '/'
      });

      /* LocalStorageInit */
      localStorageServiceProvider.setPrefix('muzicApp');

      /**
       *
       * Custom http interceptors
       *
       */

     $httpProvider.interceptors.push(function($q, $rootScope) {
         return {

             'request': function(config) {
                 return config;
             },

             'requestError': function(rejection) {
                 return $q.reject(rejection);
             },

             'response': function(response) {
                 /* if it is not an internal angular request then unwrap the response data  */
                 if(_.isObject(response.data)) {
                     return response.data;
                 }
                 else {
                     // forward internal angular response
                     return response;
                 }
             },

             'responseError': function(rejection) {
                 if(rejection.status == -1){
                     console.log('generic internet/server error');
                     return $q.reject(rejection);
                 }
                 else{ // if custom API error
                    return rejection;
                 }
             }
         };
     });
});      

app.run(function($rootScope, $timeout, $window, $location, localStorageService) {
    $rootScope.isLoggedIn = (localStorageService.length() == 0 ) ? false : true;        
    $rootScope.userInfo = localStorageService.get('userInfo');
    $rootScope.nowPlaying = [];            
    $rootScope.default_cover_art_url = 'images/wallpaper_3.jpg';    

    $rootScope.$on('$locationChangeStart', function(event, currentRoute, prevRoute) {        
        var currentRoute = $location.path();
        if (currentRoute.substring(1) === 'Login') {
            $('body').addClass('login-bg');
        } else {
            $('body').removeClass('login-bg');
        }

        if($rootScope.isLoggedIn){
              //do something
        }else{
            $location.path('/Login');
        }
    });    

    $('.playlist-btn, .mute-btn, .repeat-btn').hover(function(){
        $(this).removeClass('bg-transparent');
    }, function() {
        $(this).addClass('bg-transparent');
    });

    $('.playlist-btn, .mute-btn, .repeat-btn').click(function(e) {   
        e.preventDefault();
        e.stopPropagation();     
        if($(this).find('i').hasClass('fg-primary')) {
            $(this).find('i').removeClass('fg-primary');
        } else {
            $(this).find('i').addClass('fg-primary');
        }

        if($(this).hasClass('playlist-btn')) {            
            $('.playlist-popover').transition('slide up');            
            // if($('.popover-wrapper').css('display') == 'block') {
            //     $('.popover-wrapper').hide();
            // } else {
            //     $('.popover-wrapper').show();
            // }            
        }
    });    

    $rootScope.logout = function() {
        $window.location.reload();
        $rootScope.isLoggedIn = false;   
        localStorageService.remove('userInfo');
    };
});
