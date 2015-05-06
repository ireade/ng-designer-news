app.controller('StoryCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray, $routeParams) {


	var ref = new Firebase(FIREBASE_URL + '/story');
	var stories = $firebaseArray(ref);

	$scope.stories = stories;


	

})