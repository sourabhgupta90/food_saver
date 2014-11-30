'use strict';
// here Authenticaiton and Articles are services
angular.module('organization').controller('OrganizationController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Organization', 'createOrganization',
    function($scope, $stateParams, $location, $http, Authentication, Organization, createOrganization) {
        
        $scope.user = user;
        this.minLifeSpan = user.minLifeSpan;
        $scope.authentication = Authentication;
        
        $scope.create = function() {
            $http.post('/organization/mqf/1/', {
                'mls': this.user.minLifeSpan,
                'mqf': this.user.minQuatityFood
            }).success(function(res) {
                alert('updated');
            });
        };

    }
]);