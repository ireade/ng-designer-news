app.controller('AccountCtrl', function(FIREBASE_URL, $scope, Authentication, $firebaseArray, $location) {
 
	var ref = new Firebase(FIREBASE_URL + '/users');
	var users = $firebaseArray(ref);


	// Alert Message
	$scope.alertMessage = false;
	$scope.cancelAlert = function() {
		$scope.alertMessage = false;
	}


	$scope.registerUser = function(user) {
		Authentication.registerUser(user); 
		
		$location.path('/');
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
		window.location.reload();
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