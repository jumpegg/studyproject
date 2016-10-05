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
	});

}])
.controller('freetalkCtrl', function($scope){

});