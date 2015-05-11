app.controller('AccountCtrl', function(FIREBASE_URL, $scope, $rootScope, Authentication, $firebaseArray, $firebaseObject, $location) {

	var ref = new Firebase(FIREBASE_URL + '/users');
	var users = $firebaseArray(ref);

	Authentication.checkAuth(function() {})


	// Alert Message
	$scope.alertMessage = false;
	$scope.cancelAlert = function() {
		$scope.alertMessage = false;
	}


	$scope.registerUser = function(user) {

		Authentication.registerUser(user, function(uid) {

			users.$add({
				uid: uid,
				first_name: user.first_name,
				last_name: user.last_name,
				title: user.title,
				email: user.email,
				karma: 0
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
		Authentication.checkAuth(function() {})
		return false;
	};

	$scope.resetPassword = function(email) {
		Authentication.resetPassword(email, function(error) {

			if (error == 'noerror') {
				$scope.alertMessage = {
					message: "Your password has been successfully reset. A new password has been sent to your email address.",
					type: 'success'
				};
			} else {
				$scope.alertMessage = {
					message: error.message,
					type: 'warning'
				};
			}

		});

		$scope.email = '';
		
	};




})