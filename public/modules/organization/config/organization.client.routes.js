'use strict';

// Setting up route
angular.module('organization').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listOrganization', {
			url: '/organization',
			templateUrl: 'modules/organization/views/organization.client.view.html'
		});
	}
]);