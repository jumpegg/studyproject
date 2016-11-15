'use strict';

angular.module('board.freetalk', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider
	.when('/freetalk/',{
		templateUrl: '../angular/board/freetalk/freetalk.html',
		controller: 'freetalkCtrl'
	})
	.when('/newfreetalk',{
		templateUrl: '../angular/board/freetalk/newfreetalk.html',
		controller: 'freetalkCtrl'
	})
	.when('/freetalk/:index',{
		templateUrl: '../angular/board/freetalk/readfreetalk.html',
		controller: 'readfreetalkCtrl'
	})
	.when('/newfreetalk/:index',{
		templateUrl: '../angular/board/freetalk/newfreetalk.html',
		controller: 'updatefreetalkCtrl'
	});
}])
.controller('updatefreetalkCtrl', function($scope, $routeParams, freetalkService){
	console.log("this is update controller");
	freetalkService.getfreetalkone($routeParams.index, function(data){
		$scope.freetalkVO = data[0];
	});
	$scope.CreateFreetalk = function(input){
		freetalkService.upfreetalk(input);
	};
})
.controller('readfreetalkCtrl', function($scope, $routeParams, freetalkService, commentService){
	freetalkService.getfreetalkone($routeParams.index, function(data){
		$scope.freetalkone = data[0];
	});
	$scope.DelFreetalk = function(input){
		freetalkService.hidefreetalk(input);
	};
	commentService.getcomment('freetalk', $routeParams.index, function(data){
		$scope.commentList = data;
	});
	$scope.CreateComment = function(input){
		input.board_type = "freetalk";
		input.parents_id = $scope.freetalkone.id;
		commentService.setcomment(input);
		commentService.getcomment('freetalk', $routeParams.index, function(data){
			$scope.commentList = data;
		});
	};
})
.controller('freetalkCtrl', function($scope, $routeParams, freetalkService){

	$scope.CreateFreetalk = function(input){
		freetalkService.setfreetalk(input);
		$scope.FreetalkList();
	};
	$scope.UpdateFreetalk = function(input){
		freetalkService.upfreetalk(input);
	};
	$scope.FreetalkList = function(input){
		freetalkService.getfreetalk(input ,function(data){
			$scope.freetalkList = data;
		});
		freetalkService.getfreetalkcnt(function(data){
			$scope.pageIndex=[];
			$scope.lastPage = Math.ceil(data.cnt/10);
			for(var i=1; i<=Math.ceil(data.cnt/10); i++){
				$scope.pageIndex.push(i);
			};
		});
	};

	$scope.FreetalkList(1);
	$scope.listMaker = function(input){
		$scope.FreetalkList(input);
	}
});