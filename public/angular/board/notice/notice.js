'use strict';

angular.module('board.notice', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider
	.when('/notice',{
		templateUrl: '../angular/board/notice/notice.html',
		controller: 'noticeCtrl'
	})
	.when('/newnotice',{
		templateUrl: '../angular/board/notice/newnotice.html',
		controller: 'newnoticeCtrl'
	})
	.when('/notice/:index',{
		templateUrl: '../angular/board/notice/readnotice.html',
		controller: 'readnoticeCtrl'
	})
	.when('/newnotice/:index',{
		templateUrl: '../angular/board/notice/newnotice.html',
		controller:'updatenoticeCtrl'
	});
}])
.controller('noticeCtrl', function($scope, noticeService){
	
	$scope.type = undefined;
	$scope.search = undefined;

	$scope.NoticeList = function(input, type, search){
		noticeService.getnoticecnt(type, search,function(data){
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
		noticeService.getnotice(input, type, search, function(data){
			$scope.noticeList = data;
		});
	};

	$scope.NoticeList(1);
	$scope.listMaker = function(input){
		$scope.NoticeList(input, $scope.type, $scope.search);
	};

	$scope.ListSearch = function(){
		$scope.NoticeList(1, $scope.type, $scope.search);
	};
})
.controller('newnoticeCtrl',function($scope, noticeService){
	$scope.newnotice = function(input){
		noticeService.setnotice(input);
	};
})
.controller('readnoticeCtrl',function($scope, $routeParams, noticeService){
	noticeService.getnoticeone($routeParams.index, function(data){
		$scope.noticeVO = data[0];
	});
	$scope.Delnotice = function(input){
		noticeService.hidenotice(input);
	};
})
.controller('updatenoticeCtrl',function($scope, $routeParams, noticeService){
	noticeService.getnoticeone($routeParams.index, function(data){
		$scope.noticeVO = data[0];
	});
	$scope.newnotice = function(input){
		noticeService.upnotice(input);
	};
});