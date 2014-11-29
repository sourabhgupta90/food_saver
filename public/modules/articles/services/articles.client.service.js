'use strict';

//Articles service used for communicating with the articles REST endpoints
// Angular’s $resource is a factory that lets you interact with RESTful backends easily
// we are creating custom factory Articles here
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
// we could also do: return $resource('http://www.example.com/api/movies/:id', { id: '@_id' }			
// Setting it to @_id means whenever we will call methods like $update() and $delete() on the resource instance, 
// the value of :id will be set to the _id property of the instance. 	
			articleId: '@_id'
		}, {
//the third argument is a hash that allows us to add any custom methods to the resource class. 
			update: {
				method: 'PUT'
			}
		});
	}
]);