app.controller("AuthCtrl",['$scope','$rootScope','$window','$http','$location', function($scope,$rootScope,$window, $http, $location) {

$scope.LogIn = function (email, password){

	if(angular.isDefined(email) && angular.isDefined(password)){
		user= {email: email.toLowerCase(),password: password}
$http.post($rootScope.baseUrl.user+'login',user).success(function(data){
	$scope.isLogged=true;
	$window.sessionStorage.email=data.user['email'];
	$window.sessionStorage.firstname=data.user['fullname'];
	$window.sessionStorage.role=data.user['role'];
	$rootScope.currentUser={firstname:data.user['fullname'],email:data.user['email'],role:data.user['role']}
	$location.path('/main');
}).error(function(err, data) {
	 console.log(err)
                   $scope.authenticationError=err;
                });
}
}

$scope.LogOut=function(){
	$rootScope.isLogged=false;
	delete $window.sessionStorage.email;
	delete $window.sessionStorage.fullname;
	delete $window.sessionStorage.role;
	 $scope.authenticationError=null;
	$location.path("/");
}
}])

