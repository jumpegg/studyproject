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

	$scope.Getboards = function(){
		user.getboards(function(data){
			$scope.adminBoards = data;
			$scope.adminpaging = paging.makePage($scope.adminBoards, $scope.adminCurrent, 10).list;
		});
	};
	$scope.Getjoinboards = function(){
		user.getjoinboards(function(data){
			$scope.joinboards = data;
			$scope.joinpaging = paging.makePage($scope.joinboards, $scope.joinCurrent, 10).list;
			console.log('getjoinboards');
		});
	};
	$scope.Getboards();
	$scope.Getjoinboards();
	
	$scope.setAdminPages = function(){
		$scope.adminpaging = paging.makePage($scope.adminBoards, $scope.adminCurrent, 10).list;
	};
	$scope.nextAdminCurrent = function(){
		$scope.adminCurrent++;
		console.log($scope.adminCurrent);
		$scope.setAdminPages();
		$scope.adminCurrent = paging.makePage($scope.adminBoards, $scope.adminCurrent, 10).currentPage;
	};
	$scope.beforeAdminCurrent = function(){
		$scope.adminCurrent--;
		$scope.setAdminPages();
		$scope.adminCurrent = paging.makePage($scope.adminBoards, $scope.adminCurrent, 10).currentPage;
	};

	$scope.setJoinPages = function(){
		$scope.joinpaging = paging.makePage($scope.joinboards, $scope.joinCurrent, 10).list;
	};
	$scope.nextJoinCurrent = function(){
		$scope.joinCurrent++;
		console.log($scope.joinCurrent);
		$scope.setJoinPages();
		$scope.joinCurrent = paging.makePage($scope.joinboards, $scope.joinCurrent, 10).currentPage;
	};
	$scope.beforeJoinCurrent = function(){
		$scope.joinCurrent--;
		$scope.setJoinPages();
		$scope.joinCurrent = paging.makePage($scope.joinboards, $scope.joinCurrent, 10).currentPage;
	};

});