var app = angular.module('ng-designer-news', ['ngRoute', 'firebase']);

app.constant('FIREBASE_URL', 'https://ng-designer-news.firebaseio.com/');

app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			controller: 'StoriesCtrl',
			templateUrl: 'views/stories-top.html'
		})
		.when('/about', {
			controller: 'StoriesCtrl',
			templateUrl: 'views/about.html'
		})
		.when('/recent', {
			controller: 'StoriesCtrl',
			templateUrl: 'views/stories-recent.html'
		})
		.when('/discussions', {
			controller: 'StoriesCtrl',
			templateUrl: 'views/stories-discussions.html'
		})
		.when('/register', {
			controller: 'AccountCtrl',
			templateUrl: 'views/account-register.html'
		})
		.when('/login', {
			controller: 'AccountCtrl',
			templateUrl: 'views/account-login.html'
		})
		.when('/reset-password', {
			controller: 'AccountCtrl',
			templateUrl: 'views/reset-password.html'
		})
		.when('/submit', {
			controller: 'NewStoryCtrl',
			templateUrl: 'views/submit.html'
		})
		.when('/stories/:storyId', {
			controller: 'StoryCtrl',
			templateUrl: 'views/story.html'
		})
		.when('/u/:userId', {
			controller: 'ProfileCtrl',
			templateUrl: 'views/account-profile.html'
		})
		.when('/u/:userId/stories', {
			controller: 'ProfileCtrl',
			templateUrl: 'views/account-profile-stories.html'
		})
		.when('/u/:userId/comments', {
			controller: 'ProfileCtrl',
			templateUrl: 'views/account-profile-comments.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});


app.filter('fromNow', function() {
  return function(date) {
    return moment(date).fromNow();
  }
});