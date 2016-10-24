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
	
})
.controller('readnoticeCtrl',function($scope, $routeParams, noticeService){
	noticeService.getnoticeone(function(data){
		$scope.noticeOne = data[0];
	});
})
.controller('updatenoticeCtrl',function($scope, $routeParams, noticeService){
	noticeService.getnoticeone(function(data){
		$scope.newnotice = data[0];
	});
});