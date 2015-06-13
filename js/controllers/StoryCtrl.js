app.controller('StoryCtrl', function(FIREBASE_URL, $scope, $rootScope, $firebaseArray, $firebaseObject, $routeParams, Authentication) {

	var storyId = $routeParams.storyId;

	var ref = new Firebase(FIREBASE_URL + '/stories/' + storyId);
	var story = $firebaseObject(ref);
	$scope.story = story;


	var votersRef = new Firebase(FIREBASE_URL + '/stories/' + storyId + '/voters');
	var voters = $firebaseArray(votersRef);
	$scope.hasVoted = false;


	// Alert Message
	$scope.alertMessage = false;
	$scope.cancelAlert = function() {
		$scope.alertMessage = false;
	}


	var userRef;
	var thisUser;

	
	Authentication.checkAuth(function() {
		if ($rootScope.currentUser) {

			// Set current use
			userRef = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/comments');
			thisUser = $firebaseArray(userRef);

			// Check if current user has voted
			voters.$loaded().then(function() {
				angular.forEach(voters, function(object, id) {
					if (object.$value == $rootScope.currentUser.$id) {
						//$scope.hasVoted = true;
					}
				})
			}) 

		}
	})

	
	$scope.upvote = function() {
		

		// if (!$scope.hasVoted) {

			var votes = $firebaseObject( new Firebase(FIREBASE_URL + '/stories/' + storyId + '/voteCount') );

			votes.$loaded().then(function() {
				votes.$value++;
				votes.$save();

				voters.$add($rootScope.currentUser.$id);

				//$scope.hasVoted = true;
			})

		// 	// Story Author Karma
		// 	var storyAuthorKarma = $firebaseObject( new Firebase(FIREBASE_URL + '/karma/' + story.user.id) );
		// 	storyAuthorKarma.$loaded().then(function() {
		// 		storyAuthorKarma.$value++;
		// 		storyAuthorKarma.$save();
		// 	})

		// }

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

			})

			comment.text = '';

			var commentCount = $firebaseObject( new Firebase(FIREBASE_URL + '/stories/' + storyId + '/commentCount') );

			commentCount.$loaded().then(function() {
				commentCount.$value++;
				commentCount.$save();

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
				var commentAuthorRef = new Firebase(FIREBASE_URL + '/karma/' + comment.user.id);
				var commentAuthor = $firebaseObject(commentAuthorRef);

				commentAuthor.$loaded().then(function() {
					commentAuthor.$value++;
					commentAuthor.$save();
				})



			}


		}) // end .then from voters.loaded

	}





	

})