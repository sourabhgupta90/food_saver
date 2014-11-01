'use strict';

// Setting up route
angular.module('org_settings').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('editOrgSettings', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);