/*
* @to-do: according to view type-checking of fields like date, amount etc
*/

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

        $scope.types.type ='V';

		$scope.states = {};
        $scope.states.options = [
              { id : 'C', name: 'Cooked' },
              { id : 'R', name: 'Raw' }             
        ];

        $scope.states.state ='C';

        $scope.now = new Date();
        $scope.bestbefore_date = new Date();
        $scope.avail_from_date = new Date();
        $scope.avail_to_date = new Date();
        $scope.food_amount = '10';
        $scope.refrigeration = 'no';
        $scope.desc = '';
        $scope.show_contact_num = 'Y';
		$scope.allow_chat = 'Y';
		$scope.auto_assign = 30;

//   

		$scope.create = function() {
			var donation = new Donations({
				//title: this.title,
				//content: this.content,
				// all these type on left should be same as vars in model on server
				// and on right should be same as ng-model in view
				type: this.types.type,
				state: this.states.state,
				refrigeration: this.refrigeration,
				bestBefore: this.bestbefore_date,
				food_amount: this.food_amount,
				avail_from_date: this.avail_from_date,
				avail_to_date: this.avail_to_date,
				show_contact_num: this.show_contact_num,
				allow_chat: this.allow_chat,
				durationAA: this.auto_assign,
				desc: this.desc
			});
            // in Donation service resource class provides these save, update, remove etc methods       

			donation.$save(function(response) {
				//  after saving donation, redirect to donation/donationId page
				$location.path('donation/' + response._id);

				//$scope.title = '';
				//$scope.content = '';
				$scope.types.type ='V';
				$scope.states.state ='C';
				$scope.refrigeration = 'no';
        		$scope.desc = '';
        		$scope.show_contact_num = 'Y';
				$scope.allow_chat = 'Y';
				$scope.auto_assign = 30;

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