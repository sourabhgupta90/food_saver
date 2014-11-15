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
			templateUrl: 'modules/donation/views/view-donation.client.view.html'
		});		
	}
]);