app.controller('StoriesCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray) {


	var ref = new Firebase(FIREBASE_URL + '/stories');
	var stories = $firebaseArray(ref);

	$scope.stories = stories;


	$scope.addStory = function(story) {

		console.log("hello");

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
						name: $rootScope.currentUser.first_name,
						id: $rootScope.currentUser.id
					},
					commentCount: 0,
					voteCount: 0
				}).then(function() {

					story.title = '';
					story.description = '';
					story.url = '';

					$location.path('/');

				});

			} else if (story.description) {

				stories.$add({
					title: story.title,
					url: null,
					category: storyCategory,
					description: story.description,
					date: Firebase.ServerValue.TIMESTAMP,
					user: {
						name: $rootScope.currentUser.first_name,
						id: $rootScope.currentUser.id
					},
					commentCount: 0,
					voteCount: 0
				}).then(function() {

					story.title = '';
					story.description = '';
					story.url = '';

					$location.path('/');

				});

			} else {
				console.log('You must submit either a URL or a description');
			}

			

		} 


	};


	


	function getCategory(title) {

		return null;

	}

})