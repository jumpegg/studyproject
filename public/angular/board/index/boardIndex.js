'use strict';

angular.module('board.index', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/',{
		templateUrl: '../angular/board/index/boardIndex.html',
		controller: 'boardIndexCtrl'
	});
}])
.controller('boardIndexCtrl', function($scope, guestService, freetalkService, noticeService, scheduleService, attendUserService, boardService, studydataService, accountService){
	guestService.getguest(function(data){
		$scope.guestList = data;
	});

	freetalkService.getfreetalk(1, undefined, undefined, function(data){
		$scope.freetalkList = data;
	});
	noticeService.getnotice(1, undefined, undefined, function(data){
		$scope.noticeList = data;
	});
	scheduleService.getschedule(1, undefined, undefined, function(data){
		$scope.scheduleList = data;
	});
	accountService.getaccount(1, undefined, undefined, function(data){
		$scope.accountList = data;
	})
	studydataService.getstudydata(1, undefined, undefined, function(data){
		$scope.studydataList = data;
	});
});
