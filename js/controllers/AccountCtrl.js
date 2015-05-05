app.controller('AccountCtrl', function(FIREBASE_URL, $scope, $rootScope, Authentication, $firebaseArray, $firebaseObject) {

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


	//Authentication.checkAuth();



	///


	//$rootScope.currentUserUid;

	var usersObj = $firebaseObject(ref);

	angular.forEach(usersObj, function(i, a) {
		console.log(i);
	})

	console.log(users);

})