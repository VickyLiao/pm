app.controller('UserCtrl',['$http','$location','$scope','$rootScope','$timeout','Upload',function($http,$location,$scope,$rootScope,$timeout,Upload){
	 

$scope.data={
    roles:['Admin','PD','Supervisor','Client'],
    required:['fullname','email','role']
}




$scope.CreateUser=function(user){


 if(user!=null){
   var error="ok";
if($rootScope.UTIL.checkItemExisted($rootScope.data.users,user,'email')) error="exist";
if(!$rootScope.UTIL.checkRequired($scope.data.required,user)) error="missing"
 if(user.role=="Admin" || user.role=="PD") {
       if(user.password==null) {
               error="password";
   }
}
console.log(error)
 switch(error) {
       case "exist":
           alert("Email Already Exist?");
          break;
       case "missing":
           alert("Fields are Missing?");
          break;
          case "password":
           alert("You will need to set Password if your role is either Admin or PD");
          break;
       default:
       {
        user.email=user.email.toLowerCase();
            $http.post($rootScope.baseUrl.user,user).success(function(data){
              console.log(data)
        $rootScope.data.users.push(data);
         $scope.editUser=null;
                });
         }
    }
  }

}

$scope.DeleteUser=function(user){
    $http.delete($rootScope.baseUrl.user+user._id).success(function(){
      $rootScope.data.users.splice($rootScope.data.users.indexOf(user),1);
    })
}


$scope.UpdateUser=function(user){
 

  if(user!=null){
   var error="ok";

if(!$rootScope.UTIL.checkRequired($scope.data.required,user)) error="missing"
 if(user.role=="Admin" || user.role=="PD") {
       if(user.newPassword==null) 
               error="password";
             else user.password=user.newPassword;
   
}

 switch(error) {
       case "missing":
           alert("Fields are Missing?");
          break;
          case "password":
           alert("You will need to set Password if your role is either Admin or PD");
          break;
       default:
          $http.put($rootScope.baseUrl.user+user._id,user).success(function(data){
      $rootScope.data.users[$rootScope.data.users.indexOf(user)]=data;
        $scope.editUser=null;
    });
    }
  }
  
}

$scope.StartEditUser=function(user){
    $scope.editUser=user;
}

$scope.CancelEditUser=function(){
    $scope.editUser=null;
}



 $scope.UploadFiles = function(file, errFiles) {


     
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: $rootScope.baseUrl.user+'upload',
                data: {file: file,}
               
            });
             file.upload.then(function (response) {
              angular.forEach(response.data,function(item){
                  $rootScope.data.users.push(item)
              })
                $timeout(function () {
                  
                    file.result = response.data;
                });
            }, function (response) {
             
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
 }    
}

}])





/*


app.factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        var baseUrl = "http://localhost:5000/api/users/";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }
 
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
 
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
 
        var currentUser = getUserFromToken();
 
        return {
        	get:function(success,error){
        		 $http.get(baseUrl).success(success).error(error)
        	},
            save: function(data, success, error) {
                $http.post(baseUrl + '/signin', data).success(success).error(error)
            },
            login: function(data, success, error) {
                $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me').success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            }
        };
    }
]);*/