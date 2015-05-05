var app = angular.module('ng-designer-news', ['ngRoute', 'firebase']);

app.constant('FIREBASE_URL', 'https://ng-designer-news.firebaseio.com/');

app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			controller: 'StoriesCtrl',
			templateUrl: 'views/stories-top.html'
		})
		.when('/recent', {
			controller: 'StoriesCtrl',
			templateUrl: 'views/stories-recent.html'
		})
		.when('/discussions', {
			controller: 'StoriesCtrl',
			templateUrl: 'views/stories-discussions.html'
		})
		.when('/profile', {
			controller: 'AccountCtrl',
			templateUrl: 'views/account-profile.html'
		})
		.when('/register', {
			controller: 'AccountCtrl',
			templateUrl: 'views/account-register.html'
		})
		.when('/reset-password', {
			controller: 'AccountCtrl',
			templateUrl: 'views/reset-password.html'
		})
		.when('/submit', {
			templateUrl: 'views/submit.html'
		})
		.when('/stories/story', {
			templateUrl: 'views/story.html'
		})
		.otherwise({
			redirectTo: '/'
		});
})