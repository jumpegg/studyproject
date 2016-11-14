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
		},
		usercheck: function(input, callback){
			$http({
				method: 'get',
				url:'/usercheck/'+input
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		signup: function(input){
			$http({
				method: 'post',
				url:'/sign-up',
				data: input
			}).success(function(data, status, headers, config){
				console.log('signup success');
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
});