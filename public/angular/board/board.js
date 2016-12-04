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
.run(function($location, authService, $rootScope){
	authService.isBoardAuth(function(data){
		$rootScope.guest = data;
		if(!$rootScope.guest){
			$location.path('/joinuser');
		}
		$rootScope.$on('$routeChangeStart', function(event){
			if(!$rootScope.guest){
				$location.path('/joinuser');
			}
		})
	});
})
.controller('boardCtrl', function($scope, boardService, authService){
	boardService.getboard(function(data){
		$scope.boardinfo = data;
	});
	boardService.getcurrentuser(function(data){
		$scope.userinfo = data;
	});
	authService.isBoardAuth(function(data){
		$scope.adminCheck = data.admin_auth;
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
		getcurrentuser: function(callback){
			$http.get('/board/getCurrentUser')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		}
	}
})
.factory('authService', function($http, $location){
	return{
		isBoardAuth: function(callback){
			$http.get('/isBoardAuth')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		applyUser: function(input){
			$http({
				method:'post',
				url:'/applyUser',
				data: input
			}).success(function(data,status, headers, config){
				if(data.message == 'success'){
					alert('운영자에게 가입 신청되었습니다.');
				}
				if(data.message == 'exist'){
					alert('이미 가입 신청이 되어있습니다.');
				}
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		applicantList: function(callback){
			$http.get('/applicantList')
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		allowUser: function(input, callback){
			$http.get('/allowGuest/'+input)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		rejectUser: function(input, callback){
			$http.get('/rejectGuest/'+input)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		}
	};
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
.factory('boardCrudService', function($http, $location){
	return{
		getlist : function(url, index, type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get(url+index+'?type='+type+'&search='+search)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			});
		},
		getcnt : function(url, type, search, callback){
			if(type==undefined){
				type='';
			};
			if(search==undefined){
				search='';
			};
			$http.get(url+'?type='+type+'&search='+search)
			.success(function(data){
				callback(data);
			}).error(function(status){
				console.log(status);
			})
		},
		getone : function(url, index, callback){
			$http({
				method: 'get',
				url: url+index
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		new : function(url, backurl, input){
			$http({
				method : 'post',
				url : url,
				data : input
			}).success(function(data, status, headers, config){
				if(data.message == "success"){
					alert('등록되었습니다.');
					$location.path(backurl);
				}else{
					alert('서버에러');
				}
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		update : function(url, backurl, input){
			$http({
				method: 'post',
				url : url,
				data : input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
					$location.path(backurl);
				}else{
					alert('서버에러');
				};
			}).error(function(data,status, headers, config){
				alert(status);
			});
		},
		hide : function(url, backurl, index){
			$http.get(url+index)
			.success(function(data){
				$location.path(backurl);
			}).error(function(status){
				console.log(status);
			});
		},
		del : function(url, backurl, index){
			$http({
				method: 'get',
				url: url+index
			}).success(function(data, status, headers, config){
				$location.path(backurl);
			}).error(function(data, status, headers, config){
				console.log(status);
			});

		}
	}
})
.factory('freetalkService', function($http, $location, boardCrudService){
	return{
		getfreetalk: function(index, type, search, callback){
			boardCrudService.getlist('/board/getfreetalk/list/',index, type, search, function(data){
				callback(data);
			});
		},
		getfreetalkcnt: function(type, search, callback){
			boardCrudService.getcnt('/board/getfreetalkcnt', type, search, function(data){
				callback(data);
			});
		},
		getfreetalkone: function(index, callback){
			boardCrudService.getone('/board/getfreetalk/', index, function(data){
				callback(data);
			});
		},
		setfreetalk: function(input){
			boardCrudService.new('/board/newfreetalk', '/freetalk', input);
		},
		upfreetalk: function(input){
			boardCrudService.update('/board/upfreetalk', '/freetalk', input);
		},
		hidefreetalk: function(index){
			boardCrudService.hide('/board/hidefreetalk/', '/freetalk', index);
		}
	}
})
.factory('noticeService', function($http, $location, boardCrudService){
	return{
		getnotice: function(index, type, search, callback){
			boardCrudService.getlist('/board/getnotice/list/', index, type, search, function(data){
				callback(data);
			});
		},
		getnoticecnt: function(type, search, callback){
			boardCrudService.getcnt('/board/getnoticecnt', type, search, function(data){
				callback(data);
			});
		},
		getnoticeone: function(index, callback){
			boardCrudService.getone('/board/getnotice/', index, function(data){
				callback(data);
			});
		},
		setnotice: function(input){
			boardCrudService.new('/board/newnotice', '/notice', input);
		},
		upnotice: function(input){
			boardCrudService.update('/board/upnotice', '/notice', input);
		},
		hidenotice: function(index){
			boardCrudService.hide('/board/hidenotice/', '/notice', index);
		},
		delnotice: function(index){
			boardCrudService.del('/board/delnotice/', '/notice', index);
		}
	}
})
.factory('studydataService', function($http, $location, boardCrudService){
	return{
		getstudydata: function(index, type, search, callback){
			boardCrudService.getlist('/board/getstudydata/list/', index, type, search, function(data){
				callback(data);
			});
		},
		getstudydatacnt: function(type, search, callback){
			boardCrudService.getcnt('/board/getstudydatacnt', type, search, function(data){
				callback(data);
			});
		},
		getstudydataone: function(index, callback){
			boardCrudService.getone('/board/getstudydata/', index, function(data){
				callback(data);
			});
		},
		setstudydata: function(input){
			boardCrudService.new('/board/newstudydata', '/studydata', input);
		},
		upstudydata: function(input){
			boardCrudService.update('/board/upstudydata', '/studydata', input);
		},
		hidestudydata: function(index){
			boardCrudService.hide('/board/hidestudydata/', '/studydata', index);
		},
		delstudydata: function(index){
			boardCrudService.del('/board/delstudydata/', '/studydata', index);
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
.factory('scheduleService', function($http, $location, boardCrudService){
	return{
		getschedule: function(index, type, search, callback){
			boardCrudService.getlist('/board/getschedule/list/', index, type, search, function(data){
				callback(data);
			});
		},
		getschedulecnt: function(type, search, callback){
			boardCrudService.getcnt('/board/getschedulecnt', type, search, function(data){
				callback(data);
			});
		},
		getscheduleone: function(index, callback){
			boardCrudService.getone('/board/getschedule/', index, function(data){
				callback(data);
			});
		},
		setschedule: function(input){
			boardCrudService.new('/board/newschedule', '/schedule', input);
		},
		upschedule: function(input){
			boardCrudService.update('/board/upschedule', '/schedule', input);
		},
		delschedule: function(index){
			boardCrudService.del('/board/delschedule/', '/schedule', index);
		}
	}
})
.factory('accountService', function($http, $location, boardCrudService){
	return{
		getaccount: function(index, type, search, callback){
			boardCrudService.getlist('/board/getaccount/list/', index, type, search, function(data){
				callback(data);
			});
		},
		getaccountcnt: function(type, search, callback){
			boardCrudService.getcnt('/board/getaccountcnt', type, search, function(data){
				callback(data);
			});
		},
		getaccountone: function(index, callback){
			boardCrudService.getone('/board/getaccount/', index, function(data){
				callback(data);
			});
		},
		setaccount: function(input){
			boardCrudService.new('/board/newaccount', '/account', input);
		},
		upaccount: function(input){
			boardCrudService.update('/board/upaccount', '/account', input);
		},
		hideaccount: function(index){
			boardCrudService.hide('/board/hideaccount/', '/account', index);
		},
		delaccount: function(input){
			boardCrudService.del('/board/delaccount/', '/account', index);
		}
	};
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
				}
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
				}
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
				}
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
	};
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
				}
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
	};
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