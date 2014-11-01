'use strict';

// Setting up route
angular.module('profile').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('profile', {
			url: '/profile',
			templateUrl: 'modules/profile/views/update-profile.client.view.html'
		});
	}
]);