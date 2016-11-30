'use strict';

angular.module('board.userauth', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/userauth',{
		templateUrl: '../angular/board/userauth/userauth.html',
		controller: 'userauthCtrl'
	});
}])
.controller('userauthCtrl', function($scope, authService){
	$scope.applicantList = function(){
		authService.applicantList(function(data){
			$scope.userList = data;
		});
	};
	$scope.applicantList();
});