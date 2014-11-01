'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('profile').factory('Profile', ['$resource',
	function($resource) {
		return $resource('profile/:userId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);