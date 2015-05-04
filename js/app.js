var app = angular.module('ng-designer-news', ['ngRoute', 'firebase']);


app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'views/stories-top.html'
		})
		.when('/recent', {
			templateUrl: 'views/stories-recent.html'
		})
		.when('/discussions', {
			templateUrl: 'views/stories-discussions.html'
		})
		.when('/profile', {
			templateUrl: 'views/account-profile.html'
		})
		.when('/register', {
			templateUrl: 'views/account-register.html'
		})
		.when('/reset-password', {
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