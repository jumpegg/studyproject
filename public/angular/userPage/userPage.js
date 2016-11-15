'use strict';

angular.module('userPage',[
	'ngRoute',
	'userPage.index',
	'userPage.owner',
	'userPage.myprofile',
	'ngAnimate'
	])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
  
}])
.controller('userCtrl', function($scope, user, paging){
	$scope.menuStatus = true;
	$scope.adminCurrent = 1;
	$scope.joinCurrent = 1;

	$scope.toggleMenu = function(){
		$scope.menuStatus = $scope.menuStatus === false ? true: false;
	};
	$scope.CreateStudy = function(input){
		user.setboard(input);
		
		user.getboards(function(data){
			$scope.adminBoards = data;
		});
	};
	user.getuser(function(data){
		$scope.loginUser = data[0];
	});
	user.getboards(function(data){
		$scope.adminBoards = data;
	});
	user.getjoinboards(function(data){
		$scope.joinboards = data;
	});
})
.factory('user',function($http){
	return{
		getuser: function(callback){
			$http({
				method: 'get',
				url:'/getuser'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log("error");
			});
		},
		getboards: function(callback){
			$http({
				method: 'get',
				url:'/getboards'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log('error');
			});
		},
		getboard: function(input, callback){
			$http({
				method: 'get',
				url:'/getboard/'+input
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		getguestcnt: function(input, callback){
			$http({
				method: 'get',
				url:'/getguest/'+input
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		updateboard: function(input){
			$http({
				method: 'post',
				url:'/updateStudy',
				data: input
			}).success(function(data, status, headers, config){
				if(data.result == "success"){
					alert('등록되었습니다.');
				}else{
					alert('등록 실패');
				}
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		setboard: function(input){
			$http({
				method: 'post',
				url:'/newStudy',
				data: input
			}).success(function(data, status, headers, config){
				if(data.result == "success"){
					alert('등록되었습니다.');
				}else{
					alert('등록 실패');
				}
			}).error(function(data, status, headers, config){
				alert(status);
			});
		},
		delboard: function(input){
			$http({
				method: 'get',
				url:'/delboard/'+input
			}).success(function(data, status, headers, config){
				alert('삭제되었습니다.');
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		},
		getjoinboards: function(callback){
			$http({
				method: 'get',
				url:'/getjoinboards'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log('error');
			});
		},
		setuserinfo: function(input){
			$http({
				method: 'post',
				url:'/userPage/edit',
				data: input
			}).success(function(data, status, headers, config){
				if(data.message == 'success'){
					alert('등록되었습니다.');
				}else{
					alert('서버에러');
				};
			}).error(function(data, status, headers, config){
				console(status);
			});
		},
		setuserPic: function(file, uploadUrl){
			var fd = new FormData();
			fd.append('file', file);
			$http({
				method: 'post',
				url:uploadUrl,
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
		},
		getUserPicList: function(callback){
			$http({
				method: 'get',
				url:'/profilePicList'
			}).success(function(data, status, headers, config){
				console.log("get user profile list success");
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
	}})
.factory('paging', function(){
		var paging = {};

		paging.makePage = function(list, currentPage, itemsPerPage){
			var lastPage = Math.ceil(list.length/itemsPerPage);

			if(currentPage > lastPage){
				currentPage = lastPage;
			}else if(currentPage < 1){
				currentPage = 1;
			};
			var pageComponent = {};
			var filtered = [];
			var begin = (currentPage-1) * itemsPerPage;
			var end = begin + itemsPerPage;
			var pageIndex = [];

			for(var i =0; i<Math.ceil(list.length / itemsPerPage); i++){
				pageIndex.push(i+1);
			};
			
			pageComponent.list = list.slice(begin, end);
			pageComponent.lastPage = lastPage;
			pageComponent.firstPage = 1; 
			pageComponent.pageIndex = pageIndex;
			pageComponent.currentPage = currentPage;

			return pageComponent;
		};
		return paging;
})
.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
