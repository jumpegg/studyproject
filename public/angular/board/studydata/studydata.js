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
	studydataService.getstudydata(1,function(data){
		$scope.dataList = data;
	});
})
.controller('newstudydataCtrl', function($scope, studydataService){
	$scope.newstudydata = function(input){
		studydataService.setstudydata(input);
		if($scope.datafile){
			studydataService.setstudydatafile($scope.datafile);
		};
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