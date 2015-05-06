app.controller('StoryCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, $firebaseObject, $routeParams) {

	var storyId = $routeParams.storyId;

	var ref = new Firebase(FIREBASE_URL + '/stories/' + storyId);
	var story = $firebaseObject(ref);

	$scope.story = story;






	var votersRef = new Firebase(FIREBASE_URL + '/stories/' + storyId + '/voters');
	var voters = $firebaseArray(votersRef);

	var hasVoted = false;
	$scope.hasVoted = false;

	voters.$loaded().then(function() {
		angular.forEach(voters, function(object, id) {
			if (object.$value == $rootScope.currentUser.uid) {
				$scope.hasVoted = true;
			}
		})

	})
	

	$scope.upvote = function() {

		if ($scope.hasVoted) {
			console.log("you have already voted")
		} else {
			story.voteCount++;
			story.$save();
			voters.$add($rootScope.currentUser.uid);

			$scope.hasVoted = true;
		}

	};




	

})