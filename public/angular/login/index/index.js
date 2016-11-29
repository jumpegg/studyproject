'use strict';

angular.module('login.index', ['ngRoute', 'ngAnimate'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/',{
		templateUrl: 'angular/login/index/index.html',
		controller: 'indexCtrl'
	});
	
}])
.controller('indexCtrl', function($scope, loginService){
	$scope.loginFn = function(input){
		loginService.loginPost(input);
	};
	$scope.usercheck = false;

	$scope.checkID = function(input){
		if(input.length == 0){
			alert("아이디를 입력해 주세요");
		}else{
			loginService.usercheck(input, function(data){
				if(data.message == true){
					alert("이미 존재하는 ID 입니다.");
				}else if(input == undefined){
					alert("아이디를 입력해 주세요");
				}else{
					alert("사용 가능한 ID 입니다.");
					$scope.usercheck = true;
				}
			});
		}
	};

	$scope.signUp = function(input){
		if($scope.usercheck){
			loginService.signup(input);
			alert("등록되었습니다.");
			
		}else{
			alert("중복 확인을 해주세요");
		};
	};

});