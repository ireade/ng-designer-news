app.controller('StoryCtrl', function(FIREBASE_URL, $scope, $rootScope, $firebaseArray, $firebaseObject, $routeParams, Authentication) {

	var storyId = $routeParams.storyId;

	var ref = new Firebase(FIREBASE_URL + '/stories/' + storyId);
	var story = $firebaseObject(ref);

	$scope.story = story;

	// Alert Message
	$scope.alertMessage = false;
	$scope.cancelAlert = function() {
		$scope.alertMessage = false;
	}


	var userRef;
	var thisUser;

	Authentication.checkAuth(function() {
		userRef = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/comments');
		thisUser = $firebaseArray(userRef);
	})



	// Voting

	//if ($rootScope.currentUser) {

		var votersRef = new Firebase(FIREBASE_URL + '/stories/' + storyId + '/voters');
		var voters = $firebaseArray(votersRef);

		$scope.hasVoted = false;

		voters.$loaded().then(function() {
			angular.forEach(voters, function(object, id) {
				if (object.$value == $rootScope.currentUser.$id) {
					$scope.hasVoted = true;
				}
			})
		}) 
	//}

	$scope.upvote = function() {

		story.voteCount++;
		story.$save();

		voters.$add($rootScope.currentUser.$id);

		$scope.hasVoted = true;


		// Story User Karma
		var storyAuthorRef = new Firebase(FIREBASE_URL + '/users/' + story.user.id);
		var storyAuthor = $firebaseObject(storyAuthorRef);

		storyAuthor.$loaded().then(function() {
			storyAuthor.karma++;
			storyAuthor.$save();
		})

	};



	// Comments

	var commentsRef = new Firebase(FIREBASE_URL + '/stories/' + storyId + '/comments');
	var comments = $firebaseArray(commentsRef);

	$scope.comments = comments;

	$scope.addComment = function(comment) {

		comments.$add({
			text: comment.text,
			date: Firebase.ServerValue.TIMESTAMP,
			user: {
				first_name: $rootScope.currentUser.first_name,
				last_name: $rootScope.currentUser.last_name,
				title: $rootScope.currentUser.title,
				id: $rootScope.currentUser.$id
			},
			voteCount: 0
		}).then(function() {

			thisUser.$add({
				title: story.title,
				date: Firebase.ServerValue.TIMESTAMP,
				id: ref.key(),
				comment: comment.text

			}).then(function() {

				comment.text = '';
				story.commentCount++;
				story.$save();

			})

			
		});
	};


	$scope.upvoteComment = function(comment) {


		var thisCommentRef = new Firebase(FIREBASE_URL + '/stories/' + story.$id + '/comments/' + comment.$id);
		var thisComment = $firebaseObject(thisCommentRef);

		var commentVotersRef = new Firebase(FIREBASE_URL + '/stories/' + story.$id + '/comments/' + comment.$id + '/voters');
		var commentVoters = $firebaseArray(commentVotersRef);

		var hasVotedComment = false;

		commentVoters.$loaded().then(function() {
			angular.forEach(commentVoters, function(object, id) {
				if (object.$value == $rootScope.currentUser.$id) {
					hasVotedComment = true;
				}
			})

		}).then(function() {

			if (hasVotedComment) {

				$scope.alertMessage = {
					message: 'You have already voted on this comment!',
					type: 'warning'
				};

			} else {

				thisComment.voteCount++;
				thisComment.$save();

				commentVoters.$add($rootScope.currentUser.uid);

				// Comment Author Karma
				var commentAuthorRef = new Firebase(FIREBASE_URL + '/users/' + comment.user.id);
				var commentAuthor = $firebaseObject(commentAuthorRef);

				commentAuthor.$loaded().then(function() {
					commentAuthor.karma++;
					commentAuthor.$save();
				})

			}


		}) // end .then from voters.loaded

	}





	

})