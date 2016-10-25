'use strict';

angular.module('board.notice', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider
	.when('/notice',{
		templateUrl: '../angular/board/notice/notice.html',
		controller: 'noticeCtrl'
	})
	.when('/newnotice',{
		templateUrl: '../angular/board/notice/newnotice.html',
		controller: 'newnoticeCtrl'
	})
	.when('/notice/:index',{
		templateUrl: '../angular/board/notice/readnotice.html',
		controller: 'readnoticeCtrl'
	})
	.when('/newnotice/:index',{
		templateUrl: '../angular/board/notice/newnotice.html',
		controller:'updatenoticeCtrl'
	});
}])
.controller('noticeCtrl', function($scope, noticeService){
	noticeService.getnotice(function(data){
		$scope.noticeList = data;
	});
})
.controller('newnoticeCtrl',function($scope, noticeService){
	$scope.newnotice = function(input){
		noticeService.setnotice(input);
	};
})
.controller('readnoticeCtrl',function($scope, $routeParams, noticeService){
	noticeService.getnoticeone($routeParams.index, function(data){
		$scope.noticeVO = data[0];
	});
	$scope.Delnotice = function(input){
		noticeService.hidenotice(input);
	};
})
.controller('updatenoticeCtrl',function($scope, $routeParams, noticeService){
	noticeService.getnoticeone($routeParams.index, function(data){
		$scope.noticeVO = data[0];
	});
	$scope.newnotice = function(input){
		noticeService.upnotice(input);
	};
});