'use strict';

/**
 * @ngdoc function
 * @name muzicApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the muzicApp
 */
angular.module('muzicApp').controller('LoginCtrl', function ($rootScope, $scope, AuthenticationService, localStorageService, $location) {

	if ($rootScope.isLoggedIn) {
		$location.path('/');
	}

    $('.menu .item').tab({
    	onVisible: function () {
    		$(this).find('input[type="text"]').first().focus();
    	}
    });
    $scope.validUser = true;
    $scope.processLogin = function(payload) {    	
    	$('.login-btn').addClass('loading');								

    	AuthenticationService.processLogin(payload).then(function(data) {    		    		
    		if(data.result) {    		
				localStorageService.set('userInfo', data.result);								
				$rootScope.isLoggedIn = true;
    			$location.path('/');
    		} else {    			
    			$scope.validUser = false;
    		}    		
    	}, function(error) {
    		
    	}).catch(function(response) {
    		
    	}).finally(function() {
    		$('.login-btn').removeClass('loading');
    	});
    };

	$scope.processSignup = function (payload) {
		$('.signup-btn').addClass('loading');

		AuthenticationService.processSignup(payload).then(function(data) {
			if(data.result) {    		
				localStorageService.set('userInfo', data.result);								
				$rootScope.isLoggedIn = true;
    			$location.path('/');
    		} else {    			
    			$scope.validUser = false;
    		}   
		}, function(error) {
		
		}).catch(function(e) {
		
		}).finally(function() {
			$('.signup-btn').removeClass('loading');
		});
	};
});


