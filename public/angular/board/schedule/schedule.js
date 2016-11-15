'use strict';

angular.module('board.schedule', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider
	.when('/schedule',{
		templateUrl: '../angular/board/schedule/schedule.html',
		controller: 'scheduleCtrl'
	})
	.when('/newschedule',{
		templateUrl: '../angular/board/schedule/newschedule.html',
		controller: 'newscheduleCtrl'
	})
	.when('/schedule/:index',{
		templateUrl: '../angular/board/schedule/readschedule.html',
		controller: 'readscheduleCtrl'
	})
	.when('/newschedule/:index',{
		templateUrl: '../angular/board/schedule/newschedule.html',
		controller: 'updatescheduleCtrl'
	});
}])
.controller('scheduleCtrl', function($scope, scheduleService){
	$scope.ScheduleList = function(input){
		scheduleService.getschedulecnt(function(data){
			$scope.pageIndex=[];
			$scope.lastPage = Math.ceil(data.cnt/10);
			if(input <= 0){
				input = 1;
			}else if(input > $scope.lastPage){
				input = $scope.lastPage;
			}
			var low = Math.floor(input/10) * 10 + 1;
			var height = low + 9;
			if(height > $scope.lastPage){
				height = $scope.lastPage;
			};
			console.log(low+" - "+height); 
			for(var i=low; i<=height; i++){
				$scope.pageIndex.push(i);
			};
		});
		scheduleService.getschedule(input,function(data){
			$scope.scheduleList = data;
		});
	}

	$scope.ScheduleList(1);
	$scope.listMaker = function(input){
		$scope.ScheduleList(input);
	};

})
.controller('newscheduleCtrl', function($scope, scheduleService){
	$scope.newschedule = function(input){
		scheduleService.setschedule(input);
	};
})
.controller('readscheduleCtrl', function($scope, scheduleService, $routeParams, commentService){
	scheduleService.getscheduleone($routeParams.index, function(data){
		$scope.scheduleVO = data[0];
	});
	$scope.Delschedule = function(input){
		scheduleService.delschedule(input);
	};
	commentService.getcomment('schedule', $routeParams.index, function(data){
		$scope.commentList = data;
	});
	$scope.CreateComment = function(input){
		input.board_type = "schedule";
		input.parents_id = $scope.scheduleVO.id;
		commentService.setcomment(input);
		commentService.getcomment('schedule', $routeParams.index, function(data){
			$scope.commentList = data;
		});
	};

})
.controller('updatescheduleCtrl', function($scope, scheduleService, $routeParams){
	scheduleService.getscheduleone($routeParams.index, function(data){
		$scope.scheduleVO = data[0];
	});
	$scope.newschedule = function(input){
		scheduleService.upschedule(input);
	};
});