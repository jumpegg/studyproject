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
		$scope.FreetalkList(1);
	};
	$scope.UpdateFreetalk = function(input){
		freetalkService.upfreetalk(input);
	};





	$scope.FreetalkList = function(input, type, search){
		freetalkService.getfreetalkcnt(type, search, function(data){
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
				height = low + 9;
			};
			if(height > $scope.lastPage){
				height = $scope.lastPage;
				low = height - 9;
			};
			for(var i=low; i<=height; i++){
				$scope.pageIndex.push(i);
			};
		});
		freetalkService.getfreetalk(input, type, search, function(data){
			$scope.freetalkList = data;
		});
	};
	$scope.FreetalkList(1);
	$scope.listMaker = function(input){
		$scope.FreetalkList(input);
	}
});