'use strict';

/**
 * @ngdoc service
 * @name muzicApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Service in the muzicApp.
 */
angular.module('muzicApp').service('AuthenticationService', function ($http, ApiConfig, $httpParamSerializer) {
    
    this.processLogin = function(payload) {    	
    	return $http({
    		method: 'POST',
    		url: ApiConfig.API_URL + '/Authentication/login',
    		data: payload,
    		headers: {"Content-Type": "application/x-www-form-urlencoded"}
    	});
    };

    this.processSignup = function(payload) {
    	return $http({
    		method: 'POST',
    		url: ApiConfig.API_URL + '/Authentication/signup',
    		data: payload,
    		headers: {"Content-Type": "application/x-www-form-urlencoded"}
    	});
    };

});
