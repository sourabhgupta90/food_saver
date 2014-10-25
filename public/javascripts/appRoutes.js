// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: '../views/home.html',
            controller: 'MainController'
        })
        
        // users page
        .when('/users', { // path given in views/--.html file
            templateUrl: '../views/home.html',
            controller: 'MainController'
        })
        
        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: '../views/nerd.html',
            controller: 'NerdController'
        })
        // geeks page that will use the NerdController
        .when('/geeks', {
            templateUrl: '../views/geek.html',
            controller: 'NerdController'
        });
    $locationProvider.html5Mode(true);

}]);

