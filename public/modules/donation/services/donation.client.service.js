'use strict';

//Donation service used for communicating with the donation REST endpoints
// using ngResource service, which provides standard functions for CRUD
angular.module('donation').factory('Donations', ['$resource',
	function($resource) {
		return $resource('donation/:donationId', { //return resource object
			donationId: '@_id' // get donationId and put in url
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);