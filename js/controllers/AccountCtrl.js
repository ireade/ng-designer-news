app.controller('AccountCtrl', function(FIREBASE_URL, $scope, $rootScope, Authentication, $firebaseArray, $firebaseObject, $location) {

	var ref = new Firebase(FIREBASE_URL + '/users');
	var users = $firebaseArray(ref);


	$scope.registerUser = function(user) {

		Authentication.registerUser(user, function(uid) {

			users.$add({
				uid: uid,
				first_name: user.first_name,
				last_name: user.last_name,
				title: user.title,
				email: user.email,
			}).then(function() {

				$scope.user.first_name = '';
				$scope.user.last_name = '';
				$scope.user.title = '';
				$scope.user.email = '';

				$location.path('/');

			});

		});
	};

	$scope.signInUser = function(user) {
		Authentication.signInUser(user);

		$scope.user.email = '';
		$scope.user.password = '';

		$location.path('/');
	};

	$scope.logoutUser = function() {
		Authentication.logoutUser();
		$location.path('/');
		return false;
	};

	$scope.resetPassword = function(email) {
		Authentication.resetPassword(email);
		$scope.email = '';
	};


	// Get Current User
	// Authentication.checkAuth(function(currentUserUid) {

	// 	if (currentUserUid != 'nouser') {

	// 		users.$loaded().then(function(){
	// 	        angular.forEach(users, function(user) {
	// 	        	if (user.uid == $rootScope.currentUserUid) {
	// 	        		$rootScope.currentUser = user;
	// 	        	}
	// 	        })
	// 	    });
	// 	}

	// });



	






})