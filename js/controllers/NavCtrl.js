app.controller('NavCtrl', function($scope, $location) {


	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.isStory = function () { 
    	if ( $location.path() === '/' | 
    		 $location.path() === '/recent' | 
    		 $location.path() === '/discussions' | 
    		 $location.path() === '/submit' ) {
    		return true;
    	}
    };

});