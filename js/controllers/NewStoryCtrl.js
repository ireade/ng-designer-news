app.controller('NewStoryCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, Authentication) {


	var ref = new Firebase(FIREBASE_URL + '/stories');
	var stories = $firebaseArray(ref);

	$scope.stories = stories;


	var userRef = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/posts');
	var thisUser = $firebaseArray(userRef);


	// Alert Message
	$scope.alertMessage = false;
	var cancelAlert = function() {
		$scope.alertMessage = false;
	}





	$scope.addStory = function(story) {


		if (story.url && story.description) {
			console.log("you cannot do both");

		} else {

			var storyCategory = getCategory(story.title);

			if (story.url) {

				stories.$add({
					title: story.title,
					url: story.url,
					category: storyCategory,
					description: null,
					date: Firebase.ServerValue.TIMESTAMP,
					user: {
						first_name: $rootScope.currentUser.first_name,
						last_name: $rootScope.currentUser.last_name,
						title: $rootScope.currentUser.title,
						uid: $rootScope.currentUser.uid,
						id: $rootScope.currentUser.$id
					},
					commentCount: 0,
					voteCount: 0
				}).then(function() {

					thisUser.$add({
						title: story.title,
						date: Firebase.ServerValue.TIMESTAMP

					}).then(function() {

						story.title = '';
						story.description = '';
						story.url = '';

						$location.path('/');

					})

				});




			} else if (story.description) {

				stories.$add({
					title: story.title,
					url: null,
					category: storyCategory,
					description: story.description,
					date: Firebase.ServerValue.TIMESTAMP,
					user: {
						first_name: $rootScope.currentUser.first_name,
						last_name: $rootScope.currentUser.last_name,
						title: $rootScope.currentUser.title,
						uid: $rootScope.currentUser.uid,
						id: $rootScope.currentUser.$id
					},
					commentCount: 0,
					voteCount: 0
				}).then(function() {

					thisUser.$add({
						title: story.title,
						date: Firebase.ServerValue.TIMESTAMP

					}).then(function() {

						story.title = '';
						story.description = '';
						story.url = '';

						$location.path('/');

					})

				});

			} else {
				console.log('You must submit either a URL or a description');
			}

			

		} 


	};


	


	function getCategory(title) {

		if (title.indexOf('CSS') > -1 | title.indexOf('css') > -1 ) {
			return 'CSS';
		} 

		else if (title.indexOf('AMA:') > -1 ) {
			return 'AMA';
		}

		else if (title.indexOf('Ask DN:') > -1 ) {
			return 'Ask';
		}

		else if (title.indexOf('Show DN:') > -1 ) {
			return 'Show';
		}

		else if (title.indexOf('Site Design:') > -1) {
			return 'Site';
		}

		else if (title.indexOf('Talk:') > -1 ) {
			return 'Talk';
		}

		else if (title.indexOf('Apple') > -1 | title.indexOf('apple') > -1 ) {
			return 'Apple';
		}

		else {
			return null;
		}

	
	}

})