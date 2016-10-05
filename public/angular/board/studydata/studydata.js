'use strict';

angular.module('board.studydata', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/studydata',{
		templateUrl: '../angular/board/studydata/studydata.html',
		controller: 'studydataCtrl'
	});
}])
.directive("myDirective", function(){
	return{
		restrict : "E",
		scope : {name:"@pName"},
		template: "<div>Name is : {{name}}</div>"
		+ "Change name : <input ng-model='name' type='text' />"
	};
})
.controller('studydataCtrl', function($scope){
	$scope.name = "John";
});