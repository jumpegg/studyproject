'use strict';

angular.module('board.index', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/',{
		templateUrl: '../angular/board/index/boardIndex.html',
		controller: 'boardIndexCtrl'
	});
}])
.controller('boardIndexCtrl', function($scope){

});
