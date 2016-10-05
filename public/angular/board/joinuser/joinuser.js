'use strict';

angular.module('board.joinuser', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/joinuser',{
		templateUrl: '../angular/board/joinuser/joinuser.html',
		controller: 'joinuserCtrl'
	});
}])
.controller('joinuserCtrl', function($scope){

});