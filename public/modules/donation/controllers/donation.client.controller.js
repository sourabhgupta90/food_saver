'use strict';
// here Authenticaiton and Donation are services
angular.module('donation').controller('DonationController', ['$scope', '$stateParams', '$location', 'Authentication', 'Donations',
	function($scope, $stateParams, $location, Authentication, Donations) {
		$scope.authentication = Authentication;

		$scope.types = {};
        $scope.types.options = [
              { id : 'V', name: 'Veg' },
              { id : 'N', name: 'Non-Veg' }             
        ];

        $scope.types.type = 	'V';

		$scope.create = function() {
			var donation = new Donations({
				title: this.title,
				content: this.content
			});
            // in Donation service resource class provides these save, update, remove etc methods       

			donation.$save(function(response) {
				//  after saving donation, redirect to donation/donationId page
				$location.path('donation/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(donation) {
			if (donation) {
				donation.$remove();// call DELETE api
				// also remove from scope	
				for (var i in $scope.donations) {
					if ($scope.donations[i] === donation) {
						$scope.donations.splice(i, 1);
					}
				}
			} else {
				$scope.donation.$remove(function() {
					$location.path('donation'); // redirect to donation page
				});
			}
		};

		$scope.update = function() {
			var donation = $scope.donation;

			donation.$update(function() {
				$location.path('donation/' + donation._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.donations = Donations.query();
		};

		$scope.findOne = function() {
			$scope.donation = Donations.get({
				donationId: $stateParams.donationId // get the donationId
			});
		};
	}
]);