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
	$scope.StudydataList = function(input){
		studydataService.getstudydata(input,function(data){
			$scope.studydataList = data;
		});
		studydataService.getstudydatacnt(function(data){
			$scope.pageIndex=[];
			$scope.lastPage = Math.ceil(data.cnt/10);
			for(var i=1; i<=$scope.lastPage; i++){
				$scope.pageIndex.push(i);
			};
		});
	}

	$scope.StudydataList(1);
	$scope.listMaker = function(input){
		$scope.StudydataList(input);
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