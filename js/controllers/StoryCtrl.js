app.controller('StoryCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, $firebaseObject, $routeParams, Authentication) {

	var storyId = $routeParams.storyId;

	var ref = new Firebase(FIREBASE_URL + '/stories/' + storyId);
	var story = $firebaseObject(ref);

	$scope.story = story;


	var userRef;
	var thisUser;

	Authentication.checkAuth(function() {
		userRef = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/comments');
		thisUser = $firebaseArray(userRef);
	})





	// Voting

	var votersRef = new Firebase(FIREBASE_URL + '/stories/' + storyId + '/voters');
	var voters = $firebaseArray(votersRef);

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



	// Comments

	var commentsRef = new Firebase(FIREBASE_URL + '/stories/' + storyId + '/comments');
	var comments = $firebaseArray(commentsRef);

	$scope.comments = comments;

	$scope.addComment = function(comment) {

		comments.$add({
			text: $scope.comment.text,
			date: Firebase.ServerValue.TIMESTAMP,
			user: {
				first_name: $rootScope.currentUser.first_name,
				last_name: $rootScope.currentUser.last_name,
				title: $rootScope.currentUser.title,
				uid: $rootScope.currentUser.uid,
				id: $rootScope.currentUser.$id
			},
			voteCount: 0
		}).then(function() {

			thisUser.$add({
				title: story.title,
				date: Firebase.ServerValue.TIMESTAMP,
				id: ref.key(),
				comment: $scope.comment.text

			}).then(function() {

				comment.text = '';
				story.commentCount++;
				story.$save();

			})

			
		});
	};





	

})