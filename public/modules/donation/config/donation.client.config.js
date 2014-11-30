'use strict';

// Configuring the Donation module
angular.module('donation').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Donation', 'donation', 'dropdown', '/donation(/create)?');
		Menus.addSubMenuItem('topbar', 'donation', 'List Donation', 'donation');
		Menus.addSubMenuItem('topbar', 'donation', 'New Donation', 'donation/create');
	}
]);