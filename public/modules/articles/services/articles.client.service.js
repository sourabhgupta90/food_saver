'use strict';

//Articles service used for communicating with the articles REST endpoints
// Angular’s $resource is a factory that lets you interact with RESTful backends easily
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);