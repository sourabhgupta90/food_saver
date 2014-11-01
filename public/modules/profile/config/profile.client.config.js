'use strict';

// Configuring the Articles module
angular.module('profile').run(['Menus',
	function(Menus) {
		// Set top bar menu items
                //Menus.addMenuItem(menuId, menuItemTitle, menuItemURL, [menuItemUIRoute], [isPublic], [roles]);
		Menus.addMenuItem('topbar', 'Profile', 'profile', '/profile');
                /*
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
                */
	}
]);