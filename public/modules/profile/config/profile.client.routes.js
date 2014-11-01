'use strict';

// Setting up route
angular.module('profile').config(['$stateProvider',
	function($stateProvider) {
		// Profile state routing
		$stateProvider.
		state('profile', {
                    // state profile is already used; so app crashes by settings/profile
			url: '/profile',
			templateUrl: 'modules/profile/views/update-profile.client.view.html'
		});
	}
]);