'use strict';

angular.module('board.studydata', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider
	.when('/studydata',{
		templateUrl: '../angular/board/studydata/studydata.html',
		controller: 'studydataCtrl'
	})
	.when('/newstudydata',{
		templateUrl: '../angular/board/studydata/newstudydata.html',
		controller: 'newstudydataCtrl'
	})
	.when('/studydata/:index',{
		templateUrl: '../angular/board/studydata/readstudydata.html',
		controller: 'readstudydataCtrl'
	})
	.when('/newstudydata/:index',{
		templateUrl: '../angular/board/studydata/newstudydata.html',
		controller: 'updatestudydataCtrl'
	})
}])
.controller('studydataCtrl', function($scope){
	
})
.controller('newstudydataCtrl', function($scope){
	
})
.controller('readstudydataCtrl', function($scope){
	
})
.controller('updatestudydataCtrl', function($scope){
	
});