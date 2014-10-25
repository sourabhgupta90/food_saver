// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/users');
            // try to return data directly
            //return ["deepak","sourabh" ];
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/users', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/users' + id);
        }
    }       

}]);

