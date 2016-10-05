'use strict';

angular.module('login',[
	'ngRoute',
	'ngAnimate',
	'login.index'
	])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]);