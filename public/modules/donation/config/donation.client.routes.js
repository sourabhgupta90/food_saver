'use strict';

// Setting up route
angular.module('donation').config(['$stateProvider',
	function($stateProvider) {
		// Donation state routing
		$stateProvider.
		state('listDonations', {
			url: '/donation',
			templateUrl: 'modules/donation/views/list-donation.client.view.html'
		}).
		state('createDonation', {
			url: '/donation/create',
			templateUrl: 'modules/donation/views/create-donation.client.view.html'
		}).
		state('viewDonation', {
			url: '/donation/:donationId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);