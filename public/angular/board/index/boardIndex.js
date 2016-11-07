'use strict';

angular.module('board.index', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/',{
		templateUrl: '../angular/board/index/boardIndex.html',
		controller: 'boardIndexCtrl'
	});
}])
.controller('boardIndexCtrl', function($scope, guestService, freetalkService, noticeService, scheduleService, attendUserService, boardService, studydataService){
	guestService.getguest(function(data){
		$scope.guestList = data;
	});
	freetalkService.getfreetalk(1, function(data){
		$scope.freetalkList = data;
	});
	noticeService.getnotice(1,function(data){
		$scope.noticeList = data;
	});
	scheduleService.getschedule(1,function(data){
		$scope.scheduleList = data;
	});
	studydataService.getstudydata(1,function(data){
		$scope.studydataList = data;
	});
});
