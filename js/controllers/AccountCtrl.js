app.controller('AccountCtrl', function(FIREBASE_URL, $scope, $rootScope, Authentication, $firebaseArray, $firebaseObject, $location) {
 
	var ref = new Firebase(FIREBASE_URL + '/users');
	var users = $firebaseArray(ref);


	// Alert Message
	$scope.alertMessage = false;
	$scope.cancelAlert = function() {
		$scope.alertMessage = false;
	}


	// currentUserKarma
	$scope.currentUserKarma;
	Authentication.checkAuth(function() {
		if ($rootScope.currentUser) {
			$scope.currentUserKarma = $firebaseObject( new Firebase(FIREBASE_URL + '/karma/' + $rootScope.currentUser.$id) );
		}
	})



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