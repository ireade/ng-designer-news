app.controller('ProfileCtrl', function(FIREBASE_URL, $scope, $rootScope, $routeParams, $firebaseObject, $firebaseArray, $location) {

	$scope.userId = $routeParams.userId;
	var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.userId);
	var user = $firebaseObject(ref);
	$scope.user = user;


	$scope.updateUser = function(user) {
		user.$save(user).then(function() {
			$scope.updateFormVisible = false;
		});
	}	



	var postsRef = new Firebase(FIREBASE_URL + '/users/' + $scope.userId + '/posts');
	var recentPosts = $firebaseArray(postsRef);
	$scope.recentPosts = recentPosts;


})