'use strict';

// Setting up routes
// we haven't provided controller info to route, how does he know which controller to use
// may be we don't need to tell him the controller, he can use whatever controller he like in its view
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);