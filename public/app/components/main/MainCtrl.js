app.controller('MainCtrl',['$scope','$rootScope','$window','$location',function($scope,$rootScope,$window,$location){


if(!angular.isDefined($window.sessionStorage.email))
{

	$location.path("/");
}
else
{

	$rootScope.currentUser={firstname:$window.sessionStorage.firstname,email:$window.sessionStorage.email,role:$window.sessionStorage.role}

if($rootScope.currentUser.role=='Admin') $scope.data.url='app/components/project/project_admin.html'
	else $scope.data.url='app/components/project/project.html'
$scope.UpdateUrl=function(url){
	$scope.data.url=url;

}
}



$scope.LogOut=function(){

	$rootScope.isLogged=false;
	$rootScope.currentUser=null;
	$location.path("/");
}
}])