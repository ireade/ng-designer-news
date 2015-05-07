app.controller('StoriesCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, $firebaseObject) {


	var ref = new Firebase(FIREBASE_URL + '/stories');
	var stories = $firebaseArray(ref);

	$scope.stories = stories;




	// Alert Message
	$scope.alertMessage = false;
	$scope.cancelAlert = function() {
		$scope.alertMessage = false;
	}


	$scope.upvote = function(story) {

		var thisStoryRef = new Firebase(FIREBASE_URL + '/stories/' + story.$id);
		var thisStory = $firebaseObject(thisStoryRef);

		var votersRef = new Firebase(FIREBASE_URL + '/stories/' + story.$id + '/voters');
		var voters = $firebaseArray(votersRef);

		var hasVoted = false;

		voters.$loaded().then(function() {
			angular.forEach(voters, function(object, id) {
				if (object.$value == $rootScope.currentUser.uid) {
					hasVoted = true;
				}
			})

		}).then(function() {

			if (hasVoted) {

				$scope.alertMessage = {
					message: 'You have already voted on this post!',
					type: 'warning'
				};

			} else {
				thisStory.voteCount++;
				thisStory.$save();
				voters.$add($rootScope.currentUser.uid);
			}


		}) // end .then from voters.loaded
	}; // end upvote





})