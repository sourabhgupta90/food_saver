'use strict';

angular.module('profile').controller('ProfileController', ['$scope', '$stateParams', '$location', 'Authentication', 'Profile',
	function($scope, $stateParams, $location, Authentication, Profile) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Profile({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('profile/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('profile');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('profile/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Profile.query();
		};

		$scope.findOne = function() {
			$scope.article = Profile.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);