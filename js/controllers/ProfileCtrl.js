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
		Authentication.logoutUser();
		$location.path('/');
		window.location.reload();
	};

	var karmaRef = new Firebase(FIREBASE_URL + '/karma/' + $scope.userId);
	var karma = $firebaseObject(karmaRef);
	$scope.karma = karma;


	var postsRef = new Firebase(FIREBASE_URL + '/users/' + $scope.userId + '/posts');
	var recentPosts = $firebaseArray(postsRef);
	$scope.recentPosts = recentPosts;

	var commentsRef = new Firebase(FIREBASE_URL + '/users/' + $scope.userId + '/comments');
	var recentComments = $firebaseArray(commentsRef);
	$scope.recentComments = recentComments;

})