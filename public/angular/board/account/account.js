'use strict';

angular.module('board.account', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/account',{
		templateUrl: '../angular/board/account/account.html',
		controller: 'accountCtrl'
	});
}])
.controller('accountCtrl', function($scope){

});