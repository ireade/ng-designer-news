app.controller('StoriesCtrl', function(FIREBASE_URL, $scope, $rootScope, $firebaseArray, $firebaseObject, Authentication) {


	var ref = new Firebase(FIREBASE_URL + '/stories');
	var stories = $firebaseArray(ref);

	$scope.stories = stories;

	

	// Alert Message
	$scope.alertMessage = false;
	$scope.cancelAlert = function() {
		$scope.alertMessage = false;
	}


	$scope.upvote = function(story) {


		var votes = $firebaseObject( new Firebase(FIREBASE_URL + '/stories/' + story.$id + '/voteCount') );
		var voters = $firebaseArray( new Firebase(FIREBASE_URL + '/stories/' + story.$id + '/voters') );
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
				votes.$value++;
				votes.$save();

				voters.$add($rootScope.currentUser.$id);


				// Story Author Karma
				var storyAuthorKarma = $firebaseObject( new Firebase(FIREBASE_URL + '/karma/' + story.user.id) );
				storyAuthorKarma.$loaded().then(function() {
					storyAuthorKarma.$value++;
					storyAuthorKarma.$save();
				})

			}


		}) // end .then from voters.loaded
	}; // end upvote



})