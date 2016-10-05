'use strict';

angular.module('board.schedule', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/schedule',{
		templateUrl: '../angular/board/schedule/schedule.html',
		controller: 'scheduleCtrl'
	});
}])
.controller('scheduleCtrl', function($scope){

});