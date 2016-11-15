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
	$scope.NoticeList = function(input){
		noticeService.getnoticecnt(function(data){
			$scope.pageIndex=[];
			$scope.lastPage = Math.ceil(data.cnt/10);
			if(input <= 0){
				input = 1;
			}else if(input > $scope.lastPage){
				input = $scope.lastPage;
			}
			var low = Math.floor(input/10) * 10 + 1;
			var height = Math.ceil(input/10) * 10;
			if(height > $scope.lastPage){
				height = $scope.lastPage;
			};
			console.log(low+" - "+height); 
			for(var i=low; i<=height; i++){
				$scope.pageIndex.push(i);
			};
		});
		noticeService.getnotice(input,function(data){
			$scope.noticeList = data;
		});
	};

	$scope.NoticeList(1);
	$scope.listMaker = function(input){
		$scope.NoticeList(input);
	}

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