'use strict';

angular.module('board.freetalk', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider
	.when('/freetalk',{
		templateUrl: '../angular/board/freetalk/freetalk.html',
		controller: 'freetalkCtrl'
	})
	.when('/newfreetalk',{
		templateUrl: '../angular/board/freetalk/newfreetalk.html',
		controller: 'freetalkCtrl'
	})
	.when('/freetalk/:index',{
		templateUrl: '../angular/board/freetalk/readfreetalk.html',
		controller: 'readfreetalkCtrl'
	})
	.when('/newfreetalk/:index',{
		templateUrl: '../angular/board/freetalk/newfreetalk.html',
		controller: 'updatefreetalkCtrl'
	});
}])
.controller('updatefreetalkCtrl', function($scope, $routeParams, freetalkService){
	console.log("this is update controller");
	freetalkService.getfreetalkone($routeParams.index, function(data){
		$scope.freetalkVO = data[0];
	});
	$scope.CreateFreetalk = function(input){
		freetalkService.upfreetalk(input);
	};
})
.controller('readfreetalkCtrl', function($scope, $routeParams, freetalkService){
	freetalkService.getfreetalkone($routeParams.index, function(data){
		$scope.freetalkone = data[0];
	});
	$scope.DelFreetalk = function(input){
		freetalkService.hidefreetalk(input);
	};
})
.controller('freetalkCtrl', function($scope, freetalkService){
	$scope.CreateFreetalk = function(input){
		freetalkService.setfreetalk(input);
		$scope.FreetalkList();
	};
	$scope.UpdateFreetalk = function(input){
		freetalkService.upfreetalk(input);
	};
	$scope.FreetalkList = function(){
		freetalkService.getfreetalk(function(data){
			$scope.freetalkList = data;
		});
	};
	$scope.FreetalkList();
	console.log($scope.freetalkList);
});