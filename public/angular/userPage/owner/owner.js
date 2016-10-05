'use strict';

angular.module('userPage.owner', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/owner',{
		templateUrl: 'angular/userPage/owner/owner.html',
		controller: 'ownerCtrl'
	});
}])
.controller('ownerCtrl', function($scope, user){

	$scope.beforeUpdate = function(input){
		user.getboard(input, function(data){
			$scope.updateStudy = data[0];
		});
	};

	$scope.upStudy = function(input){
		var jinput = JSON.stringify(input);
		user.updateboard(jinput);

		user.getboards(function(data){
			$scope.adminBoards = data;
		});
	};

	$scope.filteredAdmins = [];
	$scope.itemsPerPage = 10;
	$scope.currentPage = 1;
	$scope.pageIndex = [];
	$scope.lastPage = Math.ceil($scope.adminBoards.length / $scope.itemsPerPage);

	for(var i = 0; i < Math.ceil($scope.adminBoards.length / $scope.itemsPerPage); i++){
		$scope.pageIndex.push(i+1);
	};
	console.log($scope.pageIndex);

	$scope.figureOutAdmins = function(){
		var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		var end = begin + $scope.itemsPerPage;
		$scope.filteredAdmins = $scope.adminBoards.slice(begin, end);
	};

	$scope.setCurrentPage = function(input){
		$scope.currentPage = input;
		$scope.figureOutAdmins();
	};
	$scope.beforeCurrentPage = function(){
		$scope.currentPage--;
		if($scope.currentPage < 1){
			$scope.currentPage = 1;
		};
		$scope.figureOutAdmins(); 
	};
	$scope.nextCurrentPage = function(){
		$scope.currentPage++;
		if($scope.currentPage > $scope.lastPage){
			$scope.currentPage = $scope.lastPage;
		};
		$scope.figureOutAdmins();
	};
	$scope.firstCurrentPage = function(){
		$scope.currentPage = 1;
		$scope.figureOutAdmins();

	};
	$scope.lastCurrentPage = function(){
		$scope.currentPage = $scope.lastPage;
		$scope.figureOutAdmins();
	};

	$scope.figureOutAdmins();
});
