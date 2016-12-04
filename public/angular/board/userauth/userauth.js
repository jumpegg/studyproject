'use strict';

angular.module('board.userauth', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/userauth',{
		templateUrl: '../angular/board/userauth/userauth.html',
		controller: 'userauthCtrl'
	});
}])
.controller('userauthCtrl', function($scope, $location, authService){
	$scope.applicantList = function(){
		authService.applicantList(function(data){
			$scope.userList = data;
		});
	};
	$scope.applicantList();

	$scope.allowGuest = function(input){
		authService.allowUser(input, function(data){
			console.log(data);
		});
		$scope.applicantList();
		if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
    	$scope.$apply();
		}
	};
	$scope.rejectGuest = function(input){
		authService.rejectUser(input, function(data){
			console.log(data);
		});
		$scope.applicantList();
		if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
    	$scope.$apply();
		}
	};
});