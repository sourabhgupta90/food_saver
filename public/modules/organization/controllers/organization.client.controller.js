'use strict';
// here Authenticaiton and Articles are services
angular.module('organization').controller('OrganizationController', ['$scope', '$stateParams', '$location', 'Authentication', 'Organization', 'createOrganization',
            function($scope, $stateParams, $location, Authentication, Organization, createOrganization) {
                $scope.authentication = Authentication;

                $scope.create = function() {
                    var organization = new Organization({
                        mqf: this.mqf,
                        mls: this.mls
                    });

                    var cards = createOrganization.query(function() {
                            console.log(cards);
                        });

                        // organization.$save(function(response) {
                        // 	$location.path('organization/' + response._id);

                        // 	$scope.title = '';
                        // 	$scope.content = '';
                        // }, function(errorResponse) {
                        // 	$scope.error = errorResponse.data.message;
                        // });
                    };

                }
            ]);