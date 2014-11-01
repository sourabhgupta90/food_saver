'use strict';

// Init the application configuration module for AngularJS application
// this ApplicationConfiguration will be used by each module to register itself  
// to application, although its not necessary but good to do it

var ApplicationConfiguration = (function() {
	// Init module configuration options
        /*
         * register module called by modules will later add dependencies to applicationModuleVendorDependencies
         */
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();