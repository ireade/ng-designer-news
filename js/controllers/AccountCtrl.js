app.controller('AccountCtrl', function(FIREBASE_URL, $scope, $rootScope, Authentication, $firebaseArray, $firebaseObject, $location) {

	var ref = new Firebase(FIREBASE_URL + '/users');
	var users = $firebaseArray(ref);


	$scope.registerUser = function(user) {

		Authentication.registerUser(user, function(uid) {

			users.$add({
				id: uid,
				first_name: user.first_name,
				last_name: user.last_name,
				title: user.title,
				email: user.email,
			}).then(function() {

				user.first_name = '';
				user.last_name = '';
				user.title = '';
				user.email = '';

				$location.path('/');

			});

		});
	};

	$scope.signInUser = function(user) {
		Authentication.signInUser(user);
	};

	$scope.logoutUser = function() {
		Authentication.logoutUser();
		return false;
	};

	$scope.resetPassword = function(email) {
		Authentication.resetPassword(email);
		$scope.email = '';
	};



	// Get Current User
	Authentication.checkAuth();

	if ($rootScope.currentUserUid) {

		users.$loaded().then(function(){
	        angular.forEach(users, function(user) {
	        	if (user.id == $rootScope.currentUserUid) {
	        		$rootScope.currentUser = user;
	        	}
	        })
	    });


	}




})