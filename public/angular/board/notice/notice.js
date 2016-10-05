'use strict';

angular.module('board.notice', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/notice',{
		templateUrl: '../angular/board/notice/notice.html',
		controller: 'noticeCtrl'
	});
}])
.controller('noticeCtrl', function($scope){

});