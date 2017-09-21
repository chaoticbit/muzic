"use strict";

angular.module('muzicApp').factory('ApiConfig', function() {	
	var API_URL = 'http://localhost/music-api';

	return {
		API_URL: API_URL
	};
});