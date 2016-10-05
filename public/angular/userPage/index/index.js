'use strict';

angular.module('userPage.index', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/',{
		templateUrl: 'angular/userPage/index/index.html',
		controller: 'indexCtrl'
	});
}])
.controller('indexCtrl', function($scope, user, paging){
	$scope.adminCurrent = 1;
	$scope.joinCurrent = 1;

	$scope.setAdminPages = function(){
		$scope.testpaging = paging.makePage($scope.adminBoards, $scope.adminCurrent, 10).list;
	};
	$scope.nextAdminCurrent = function(){
		$scope.adminCurrent++;
		$scope.setAdminPages();
		$scope.adminCurrent = paging.makePage($scope.adminBoards, $scope.adminCurrent, 10).currentPage;
	};
	$scope.beforeAdminCurrent = function(){
		$scope.adminCurrent--;
		$scope.setAdminPages();
		$scope.adminCurrent = paging.makePage($scope.adminBoards, $scope.adminCurrent, 10).currentPage;
	};

	$scope.setAdminPages();

});