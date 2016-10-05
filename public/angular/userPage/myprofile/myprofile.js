'use strict';

angular.module('userPage.myprofile', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/myprofile',{
		templateUrl: 'angular/userPage/myprofile/myprofile.html',
		controller: 'myprofileCtrl'
	})
	.when('/myprofile/edit',{
		templateUrl: 'angular/userPage/myprofile/myprofileEdit.html',
		controller: 'myprofileCtrl2'
	});
}])
.controller('myprofileCtrl', function($scope, user){
	user.getuser(function(data){
		$scope.loginUser = data[0];
	});
})
.controller('myprofileCtrl2', function($scope, user, $location){
	$scope.beforeUserUpdate = function(){
		user.getuser(function(data){
			$scope.upUserinfo = data[0];
		});
	};
	$scope.beforeUserUpdate();
	console.log($scope.upUserinfo);

	$scope.updateUser = function(input){
		var jinput = JSON.stringify(input);
		user.setuserinfo(jinput);
		$location.path("/myprofile");
	};

});

