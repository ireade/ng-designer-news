app.factory('Authentication', function(FIREBASE_URL, $firebaseAuth, $firebaseArray, $firebaseObject, $rootScope) {


	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	var userRef = new Firebase(FIREBASE_URL + '/users');

	var karmaRef = new Firebase(FIREBASE_URL + '/karma');

	auth.$onAuth(function(authUser) {
		if (authUser) {
			$rootScope.currentUser = $firebaseObject( new Firebase(FIREBASE_URL + '/users/' + authUser.uid) );
		} else {
			console.log('auth - no logged in user');
		}
	})


	return {
		registerUser: function(user) {

			ref.createUser({
			  email    : user.email,
			  password : user.password
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);

			  } else {

			  	var user_uid = userData.uid;
			    
			    userRef.child(user_uid).set({
		    		uid: user_uid,
		    		first_name: user.first_name,
					last_name: user.last_name,
					title: user.title
			    });

			    karmaRef.child(user_uid).set(0);


			  }
			});

		},
		deleteUser: function(user) {


			var userKarma = $firebaseObject( new Firebase(FIREBASE_URL + '/users/' + user.uid) );
		    var userObj =  $firebaseObject( new Firebase(FIREBASE_URL + '/karma/' + user.uid) );

		    userKarma.$remove().then(function() {

			    userObj.$remove().then(function() {

			    	ref.removeUser({
					  email    : user.email,
					  password : user.password
					}, function(error) {
					  if (error === null) {
					    console.log("User removed successfully");
					  } else {
					    console.log("Error removing user:", error);
					  }
					});

			    });
		    
		    });

		},
		signInUser: function(user) {

			ref.authWithPassword({
			  email    : user.email,
			  password : user.password
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			  }
			});

		},
		logoutUser: function() {
			ref.unauth();
		},
		resetPassword: function(email, callback) {

			ref.resetPassword({
			    email : email
			}, function(error) {
				if (error === null) {
					callback('noerror');
				} else {
					callback(error);
				}
			});

		},
		checkAuth: function(callback) {
			auth.$onAuth(function(authUser) {

				if (authUser) {

					$rootScope.currentUser = $firebaseObject( new Firebase(FIREBASE_URL + '/users/' + authUser.uid) );
					callback();
	
				} else {

					callback();
				}
			})
		}

	}

});