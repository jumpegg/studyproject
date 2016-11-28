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
		loginService.usercheck(input, function(data){
			if(data.message == true){
				alert("이미 존재하는 ID 입니다.");
			}else{
				alert("사용 가능한 ID 입니다.");
				$scope.usercheck = true;
			}
		});
	};

	$scope.signUp = function(input){
		if($scope.usercheck){
			loginService.signup(input);
			alert("등록되었습니다.");

		}else{
			alert("중복 확인을 해주세요");
		};
	};

})
.animation('.slide-animation', function(){
	return {
		beforeAddClass: function (element, className, done){
			var scope = element.scope();

			if(className == 'ng-hide'){
				var finishPoint = element.parent().width();
				if(scope.direction !== 'right'){
					finishPoint = -finishPoint;
				}
				TweenMax.to(element, 0.5, {left: -finishPoint, onComplete: done});
			}else{
				done();
			}
		},
		removeClass: function (element, className, done){
			var scope = element.scope();

			if(className == 'ng-hide'){
				element.removeClass('ng-hide');

				var startPoint = element.parent().width();
				if(scope.direction === 'right'){
					startPoint = -startPoint;
				}

				TweenMax.fromTo(element, 0.5, {left: startPoint}, {left: 0, onComplete: done});
			}else{
				done();
			}
		}
	};
});