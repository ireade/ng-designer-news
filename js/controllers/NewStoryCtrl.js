app.controller('NewStoryCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, Authentication) {

	var ref = new Firebase(FIREBASE_URL + '/stories');
	var stories = $firebaseArray(ref);

	$scope.stories = stories;

	// Alert Message
	$scope.alertMessage = false;
	$scope.cancelAlert = function() {
		$scope.alertMessage = false;
	}


	var userRef;
	var thisUser;

	Authentication.checkAuth(function() {
		userRef = new Firebase(FIREBASE_URL + '/users/' + $rootScope.currentUser.$id + '/posts');
		thisUser = $firebaseArray(userRef);
	})
	
 
	$scope.addStory = function(story) {

		if ( !story.title ) {
			$scope.alertMessage = {
				message: 'A title is required',
				type: 'warning'
			};
		} else if ( !(story.url) && !(story.description) ) {
			$scope.alertMessage = {
				message: 'You must submit either a url or a description',
				type: 'warning'
			};
		} else if ( (story.url) && (story.description) ) {
			$scope.alertMessage = {
				message: 'You can submit either a url or a description, but not both',
				type: 'warning'
			};

		} else if ( story.url && !story.description ) {

			var storyCategory = getCategory(story.title);

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
				}).then(function(ref){

					thisUser.$add({
						title: story.title,
						date: Firebase.ServerValue.TIMESTAMP,
						id: ref.key()
					}).then(function() {
						story.title = '';
						story.description = '';
						story.url = '';
						$location.path('/');
					})

				});


		} else if ( !story.url && story.description ) {

			var storyCategory = getCategory(story.title);

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
			}).then(function(ref) {

				thisUser.$add({
					title: story.title,
					date: Firebase.ServerValue.TIMESTAMP,
					id: ref.key()
				}).then(function() {
					story.title = '';
					story.description = '';
					story.url = '';
					$location.path('/');
				})

			});

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