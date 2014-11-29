'use strict';
// here Authenticaiton and Articles are services
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

/*
 like get( ) and query( ) Article class returned by resource object also contains
 save(), remove() and delete().
 we can instantiate that class, but now we have to call $save(), $remove(), $delete()
 on this object
*/
// this and $scope are not the same thing; couldn't figure out difference
		$scope.create = function() {
			var article = new Articles({
// this.title here is data-ng-model in view, if we change it in view it gives error;
// its not id in view, id can be anything		
//content: this.content,
// all these type on left should be same as vars in model on server
// and on right should be same as ng-model in view		
				title: this.title,
				content: this.content
			});

// on this article object we need to use $save() method instead of save() 
// method on Article 	class

			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
// we could use popup service as below:
//if (popupService.showPopup('Really delete this?')) { ... }				
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			//query() issues a GET request to /api/entries (notice there is no :id) and returns an empty array.
			// This array is populated when the data arrives from server. 
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			//get() returns a single entry corresponding to id
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
/*
  var entry = Entry.get({ id: $scope.id }, function() {  	
    $scope.entry = entry; // some say binding should happen here
  }); // get() returns a single entry
*/

	}
]);