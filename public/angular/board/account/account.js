'use strict';

angular.module('board.account', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider
	.when('/account',{
		templateUrl: '../angular/board/account/account.html',
		controller: 'accountCtrl'
	})
	.when('/newaccount',{
		templateUrl: '../angular/board/account/newaccount.html',
		controller: 'newaccountCtrl'
	})
	.when('/account/:index',{
		templateUrl: '../angular/board/account/readaccount.html',
		controller: 'readaccountCtrl'
	})
	.when('/newaccount/:index',{
		templateUrl: '../angular/board/account/newaccount.html',
		controller: 'updateaccountCtrl'
	});
}])
.controller('accountCtrl', function($scope, accountService){
	accountService.getaccount(function(data){
		$scope.accountList = data;
		console.log($scope.accountList);
	});
})
.controller('newaccountCtrl', function($scope, accountService){
	$scope.newaccount = function(input){
		accountService.setaccount(input);
	};
})
.controller('readaccountCtrl', function($scope, accountService, $routeParams){
	accountService.getaccountone($routeParams.index, function(data){
		$scope.accountVO = data[0];
	});
	$scope.Delaccount = function(input){
		accountService.hideaccount(input);
	};
})
.controller('updateaccountCtrl', function($scope, accountService, $routeParams){
	accountService.getaccountone($routeParams.index, function(data){
		$scope.accountVO = data[0];
	});
	$scope.newaccount = function(input){
		accountService.upaccount(input);
	};

});