'use strict';

angular.module('board',[
	'ngRoute',
	'ngAnimate',
	'board.index',
	'board.account',
	'board.freetalk',
	'board.notice',
	'board.userauth',
	'board.schedule',
	'board.studydata',
	'board.joinuser'
	])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}])
.controller('boardCtrl', function($scope, guestService, freetalkService, noticeService, scheduleService, attendUserService, boardService){
	guestService.getguest(function(data){
		$scope.guestList = data;
	});
	freetalkService.getfreetalk(function(data){
		$scope.freetalkList = data;
	});
	noticeService.getnotice(function(data){
		$scope.noticeList = data;
	});
	scheduleService.getschedule(function(data){
		$scope.scheduleList = data;
	});
	boardService.getboard(function(data){
		$scope.boardinfo = data[0];
	});
	boardService.getboardguest(function(data){
		$scope.userinfo = data[0];
	});

	$scope.CreateFreetalk = function(input){
		var jinput = JSON.stringify(input);
		freetalkService.setfreetalk(jinput);
	}

})
.factory('boardService', function($http){
	return{
		getboard: function(callback){
			$http.get('/board/getboardinfo')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		getboardguest: function(callback){
			$http.get('/board/getboardguest')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		}
	}
})
.factory('guestService', function($http, $location){
	return{
		getguest: function(callback){
			$http.get('/board/getguest')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		setguest: function(input){
			$http({
				method: 'post',
				url:'/board/newguest',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == "success"){
					alert('등록되었습니다.');
				}else{
					alert('서버에러');
				}
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		upguest: function(input){
			$http({
				method: 'post',
				url:'/board/upguest',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		delguest: function(callback){
			$http({
				method: 'get',
				url:'/board/delguest/:index'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
})
.factory('freetalkService', function($http, $location){
	return{
		getfreetalk: function(callback){
			$http.get('/board/getfreetalk')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		getfreetalkone: function(index, callback){
			$http({
				method: 'get',
				url:'/board/getfreetalk/'+index
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		setfreetalk: function(input){
			$http({
				method: 'post',
				url:'/board/newfreetalk',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == "success"){
					alert('등록되었습니다.');
					$location.path("/freetalk");
				}else{
					alert('서버에러');
				}
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		upfreetalk: function(input){
			$http({
				method: 'post',
				url:'/board/upfreetalk',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/freetalk");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		hidefreetalk: function(index){
			$http({
				method: 'get',
				url: '/board/hidefreetalk/'+index
			}).success(function(data, status, headers, config){
				$location.path("/freetalk");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
	}
})
.factory('noticeService', function($http, $location){
	return{
		getnotice: function(callback){
			$http.get('/board/getnotice')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		getnoticeone: function(index, callback){
			$http.get('/board/getnotice/'+index)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		setnotice: function(input){
			$http({
				method: 'post',
				url:'/board/newnotice',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/notice");
				}else{
					alert('서버에러');
				}
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		upnotice: function(input){
			$http({
				method: 'post',
				url:'/board/upnotice',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/notice");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		hidenotice: function(index){
			$http({
				method: 'get',
				url:'/board/hidenotice/'+index
			}).success(function(data, status, headers, config){
				$location.path("/notice");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		delnotice: function(callback){
			$http({
				method: 'get',
				url:'/board/delnotice/:index'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
})
.factory('studydataService', function($http, $location){
	return{
		getstudydata: function(callback){
			$http({
				method: 'get',
				url:'/board/getstudydata'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		getstudydataone: function(index, callback){
			$http({
				method: 'get',
				url:'/board/getstudydata/'+index
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
})
.factory('scheduleService', function($http, $location){
	return{
		getschedule: function(callback){
			$http.get('/board/getschedule')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		getscheduleone: function(index, callback){
			$http({
				method: 'get',
				url:'/board/getschedule/'+index
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		setschedule: function(input){
			$http({
				method: 'post',
				url:'/board/newschedule',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/schedule");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		upschedule: function(input){
			$http({
				method: 'post',
				url:'/board/upschedule',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/schedule");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		delschedule: function(input){
			$http({
				method: 'get',
				url:'/board/delschedule/'+input
			}).success(function(data, status, headers, config){
				$location.path("/schedule");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
})
.factory('attendUserService', function($http, $location){
	return{
		getattendUser: function(callback){
			$http.get('/board/getattendUser')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		setattendUser: function(callback){
			$http({
				method: 'get',
				url:'/board/newattendUser/:s_id/:u_id'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log('error')
			});
		},
		hideschedule: function(callback){
			$http({
				method: 'get',
				url:'/board/hideschedule/:index'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		delattendUser: function(callback){
			$http({
				method: 'get',
				url:'/board/delattendUser/:index'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
});