app.controller('ProfileCtrl', function(FIREBASE_URL, $scope, $routeParams, $firebaseObject, $firebaseArray, $location, Authentication) {

	$scope.userId = $routeParams.userId;
	var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.userId);
	var user = $firebaseObject(ref);
	$scope.user = user;


	$scope.updateUser = function(user) {
		user.$save(user).then(function() {
			$scope.updateFormVisible = false;
		});
	};	


	$scope.deleteUser = function(user) {
		Authentication.deleteUser(user);
		user.$remove();
		$location.path('/');
	};


	var postsRef = new Firebase(FIREBASE_URL + '/users/' + $scope.userId + '/posts');
	var recentPosts = $firebaseArray(postsRef);
	$scope.recentPosts = recentPosts;

	var commentsRef = new Firebase(FIREBASE_URL + '/users/' + $scope.userId + '/comments');
	var recentComments = $firebaseArray(commentsRef);
	$scope.recentComments = recentComments;

})