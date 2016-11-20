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
	
	$scope.type = undefined;
	$scope.search = undefined;

	$scope.AccountList = function(input, type, search){
		accountService.getaccountcnt(type, search, function(data){
			$scope.pageIndex=[];
			$scope.lastPage = Math.ceil(data.cnt/10);
			if(input <= 0){
				input = 1;
			}else if(input > $scope.lastPage){
				input = $scope.lastPage;
			}
			var low = input - 5;
			var height = low + 9;
			if(low < 1){
				low = 1;
				height = (low + 9)>$scope.lastPage? $scope.lastPage : low+9;
			};
			if(height > $scope.lastPage){
				height = $scope.lastPage;
				low = (height-9)<1? 1 : height-9;
			};
			for(var i=low; i<=height; i++){
				$scope.pageIndex.push(i);
			};
		});
		accountService.getaccount(input, type, search, function(data){
			$scope.accountList = data;
		});
	}

	$scope.AccountList(1);
	$scope.listMaker = function(input){
		$scope.AccountList(input, $scope.type, $scope.search);
	};

	$scope.ListSearch = function(){
		$scope.AccountList(1, $scope.type, $scope.search);
	};
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