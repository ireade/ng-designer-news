app.controller('StoriesCtrl', function(FIREBASE_URL, $scope, $rootScope, $location, $firebaseArray) {


	var ref = new Firebase(FIREBASE_URL + '/stories');
	var stories = $firebaseArray(ref);

	$scope.stories = stories;


	// Alert Message
	$scope.alertMessage = false;
	var cancelAlert = function() {
		$scope.alertMessage = false;
	}




})