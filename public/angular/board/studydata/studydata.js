'use strict';

angular.module('board.studydata', ['ngRoute','file-model'])
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
.controller('studydataCtrl', function($scope, studydataService){
	$scope.StudydataList = function(input, type, search){
		studydataService.getstudydatacnt(type, search,function(data){

			$scope.type = undefined;
			$scope.search = undefined;

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
		studydataService.getstudydata(input, type, search, function(data){
			$scope.studydataList = data;
		});
	};

	$scope.StudydataList(1);
	$scope.listMaker = function(input){
		$scope.StudydataList(input, $scope.type, $scope.search);
	};

	$scope.ListSearch = function(){
		$scope.StudydataList(1, $scope.type, $scope.search);
	};
})
.controller('readstudydataCtrl', function($scope, studydataService, $routeParams, commentService){
	studydataService.getstudydataone($routeParams.index, function(data){
		$scope.dataVO = data[0];
	});
	$scope.Delstudydata = function(input){
		studydataService.hidestudydata(input);
	};
	commentService.getcomment('studydata', $routeParams.index, function(data){
		$scope.commentList = data;
	});
	$scope.CreateComment = function(input){
		input.board_type = "studydata";
		input.parents_id = $scope.dataVO.id;
		commentService.setcomment(input);
		commentService.getcomment('studydata', $routeParams.index, function(data){
			$scope.commentList = data;
		});
	};
})
.controller('updatestudydataCtrl', function($scope, studydataService, $routeParams){
	studydataService.getstudydataone($routeParams.index, function(data){
		$scope.dataVO = data[0];
	});
	$scope.newstudydata = function(input){
		studydataService.upstudydata(input);
	};
});