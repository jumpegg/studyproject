'use strict';

angular.module('board.userauth', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/userauth',{
		templateUrl: '../angular/board/userauth/userauth.html',
		controller: 'userauthCtrl'
	});
}])
.controller('userauthCtrl', function($scope){

});