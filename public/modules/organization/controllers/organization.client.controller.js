'use strict';
// here Authenticaiton and Articles are services
angular.module('organization').controller('OrganizationController', ['$scope', '$stateParams', '$location', 'Authentication', 'Organization',
	function($scope, $stateParams, $location, Authentication, Organization) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var organization = new Organization({
				title: this.title,
				content: this.content
			});
                        // don't know meaning of $save funciton where does this
                        // $funciton come from
			organization.$save(function(response) {
				$location.path('organization/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(organization) {
			if (organization) {
				organization.$remove();

				for (var i in $scope.organization) {
					if ($scope.organization[i] === organization) {
						$scope.organization.splice(i, 1);
					}
				}
			} else {
				$scope.organization.$remove(function() {
					$location.path('organization');
				});
			}
		};

		$scope.update = function() {
			var organization = $scope.organization;

			organization.$update(function() {
				$location.path('organization/' + organization._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.organization = Organization.query();
		};

		$scope.findOne = function() {
			$scope.organization = Organization.get({
				organizationId: $stateParams.organizationId
			});
		};
	}
]);