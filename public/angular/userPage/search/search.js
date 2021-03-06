'use strict';

angular.module('userPage.search', ['ngRoute'])
.config(['$routeProvider', function($routeProvider, $scope){
	$routeProvider.when('/search',{
		templateUrl: 'angular/userPage/search/search.html',
		controller: 'searchCtrl'
	});
}])
.controller('searchCtrl', function($scope, searchboard){

$scope.type = undefined;
$scope.search = undefined;

  searchboard.getboard(function(data){
    $scope.searchboard = data;
  });
})
.factory('searchboard', function($http){
  return{
  	getboard: function(callback){
			$http({
				method: 'get',
				url:'/getboardsearch'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				console.log(status);
			});
		}
  }
})