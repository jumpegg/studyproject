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
.controller('boardCtrl', function($scope, boardService){
	boardService.getboard(function(data){
		$scope.boardinfo = data[0];
	});
	boardService.getboardguest(function(data){
		$scope.userinfo = data[0];
	});

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
		getfreetalk: function(index, type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getfreetalk/list/'+index+'?type='+type+'&search='+search)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		getfreetalkcnt: function(type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getfreetalkcnt?type='+type+'&search='+search)
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
		getnotice: function(index, type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getnotice/list/'+index+'?type='+type+'&search='+search)
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
		getnoticecnt: function(type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getnoticecnt'+'?type='+type+'&search='+search)
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
		getstudydata: function(index, type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http({
				method: 'get',
				url:'/board/getstudydata/list/'+index+'?type='+type+'&search='+search
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
		},
		getstudydatacnt: function(type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getstudydatacnt'+'?type='+type+'&search='+search)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		setstudydata: function(input){
			$http({
				method: 'post',
				url:'/board/newstudydata',
				data: input
			}).success(function(data, status, headers, config){
				$location.path("/studydata");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		upstudydata: function(input){
			$http({
				method: 'post',
				url:'/board/upstudydata',
				data: input
			}).success(function(data, status, headers, config){
				$location.path("/studydata");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		hidestudydata: function(index){
			$http({
				method: 'get',
				url:'/board/hidestudydata/'+index
			}).success(function(data, status, headers, config){
				$location.path("/studydata");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		delstudydata: function(index){
			$http({
				method: 'get',
				url:'/board/delstudydata/'+index
			}).success(function(data, status, headers, config){
				$location.path("/studydata");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		setstudydatafile: function(file){
			var fd = new FormData();
			fd.append('file', file);
			$http({
				method: 'post',
				url:'/board/setstudydatafile',
				headers: {
                'Content-Type': undefined
             },
				data: fd
			})
			.success(function(){
				console.log("file upload success");
			})
			.error(function(){
				console.log("file upload fail");
			});
		}
	}
})
.factory('scheduleService', function($http, $location){
	return{
		getschedule: function(index, type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getschedule/list/'+index+'?type='+type+'&search='+search)
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
		getschedulecnt: function(type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getschedulecnt'+'?type='+type+'&search='+search)
			.success(function(data){
				callback(data);
			}).error(function(status){
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
})
.factory('accountService', function($http, $location){
	return{
		getaccount: function(index, type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getaccount/list/'+index+'?type='+type+'&search='+search)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		getaccountone: function(index, callback){
			$http({
				method: 'get',
				url:'/board/getaccount/'+index
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		getaccountcnt: function(type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get('/board/getaccountcnt'+'?type='+type+'&search='+search)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		setaccount: function(input){
			$http({
				method: 'post',
				url:'/board/newaccount',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/account");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		upaccount: function(input){
			$http({
				method: 'post',
				url:'/board/upaccount',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/account");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		hideaccount: function(callback){
			$http({
				method: 'get',
				url:'/board/hideaccount/:index'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		delaccount: function(input){
			$http({
				method: 'get',
				url:'/board/delaccount/'+input
			}).success(function(data, status, headers, config){
				$location.path("/account");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
})
.factory('attendeeService', function($http, $location){
	return{
		getattendee: function(callback){
			$http.get('/board/getattendee')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		setattendee: function(input){
			$http({
				method: 'post',
				url:'/board/newattendee',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/attendee");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		upattendeemember: function(input){
			$http({
				method: 'get',
				url:'/board/upattendeemember'+input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/attendee");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		upattendeeadmin: function(input){
			$http({
				method: 'get',
				url:'/board/upattendeeadmin'+input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/attendee");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		delattendee: function(input){
			$http({
				method: 'get',
				url:'/board/delattendee/'+input
			}).success(function(data, status, headers, config){
				$location.path("/attendee");
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
})
.factory('commentService', function($http, $location){
	return{
		getcomment: function(type, index, callback){
			$http.get('/board/getcomment/list/'+type+'/'+index)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		getcommentone: function(index, callback){
			$http.get('/board/getcomment/'+index)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		setcomment: function(input){
			$http({
				method: 'post',
				url:'/board/newcomment',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
				}else{
					alert('서버에러');
				}
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		upcomment: function(input){
			$http({
				method: 'post',
				url:'/board/upcomment',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path("/comment");
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		delcomment: function(callback){
			$http({
				method: 'get',
				url:'/board/delcomment/:index'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}
});