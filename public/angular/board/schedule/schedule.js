'use strict';

angular.module('board.schedule', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider
	.when('/schedule',{
		templateUrl: '../angular/board/schedule/schedule.html',
		controller: 'scheduleCtrl'
	})
	.when('/newschedule',{
		templateUrl: '../angular/board/schedule/newschedule.html',
		controller: 'newscheduleCtrl'
	})
	.when('/schedule/:index',{
		templateUrl: '../angular/board/schedule/readschedule.html',
		controller: 'readscheduleCtrl'
	})
	.when('/newschedule/:index',{
		templateUrl: '../angular/board/schedule/newschedule.html',
		controller: 'updatescheduleCtrl'
	});
}])
.controller('scheduleCtrl', function($scope, scheduleService){
	scheduleService.getschedule(1,function(data){
		$scope.scheduleList = data;
	});
})
.controller('newscheduleCtrl', function($scope, scheduleService){
	$scope.newschedule = function(input){
		scheduleService.setschedule(input);
	};
})
.controller('readscheduleCtrl', function($scope, scheduleService, $routeParams){
	scheduleService.getscheduleone($routeParams.index, function(data){
		$scope.scheduleVO = data[0];
	});
	$scope.Delschedule = function(input){
		scheduleService.delschedule(input);
	};
})
.controller('updatescheduleCtrl', function($scope, scheduleService, $routeParams){
	scheduleService.getscheduleone($routeParams.index, function(data){
		$scope.scheduleVO = data[0];
	});
	$scope.newschedule = function(input){
		scheduleService.upschedule(input);
	};
});