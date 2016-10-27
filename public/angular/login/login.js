'use strict';

angular.module('login',[
	'ngRoute',
	'ngAnimate',
	'login.index'
	])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}])
.factory('loginService', function($http, $location){
	return{
		loginPost: function(input){
			$http({
				method: 'post',
				url:'/login',
				data: input,
				withCredentials: true
			}).success(function(data, status, headers, config){
				console.log('login success');
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
});