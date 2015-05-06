app.controller('StoriesCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, $firebaseObject) {


	var ref = new Firebase(FIREBASE_URL + '/stories');
	var stories = $firebaseArray(ref);

	$scope.stories = stories;


	// Alert Message
	$scope.alertMessage = false;
	var cancelAlert = function() {
		$scope.alertMessage = false;
	}




	
	

	$scope.upvote = function(story) {

		var thisStoryRef = new Firebase(FIREBASE_URL + '/stories/' + story.$id);
		var thisStory = $firebaseObject(thisStoryRef);


		var votersRef = new Firebase(FIREBASE_URL + '/stories/' + story.$id + '/voters');
		var voters = $firebaseArray(votersRef);

		$scope.hasVoted = false;

		voters.$loaded().then(function() {
			angular.forEach(voters, function(object, id) {
				if (object.$value == $rootScope.currentUser.uid) {
					$scope.hasVoted = true;
					console.log("hasVoted is true")
				}

			})

		}).then(function() {


			if ($scope.hasVoted) {
				console.log("you have already voted")
			} else {

				console.log("you can vote")
				// thisStory.voteCount++;
				// thisStory.$save();
				// voters.$add($rootScope.currentUser.uid);

				// $scope.hasVoted = true;
			}


		})


	};





})