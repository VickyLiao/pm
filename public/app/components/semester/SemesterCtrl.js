app.controller('SemesterCtrl',['$scope','$rootScope','$http','$window',function($scope,$rootScope,$http,$window){


$http.get($rootScope.baseUrl.semester).success(function(data){
	 $rootScope.UTIL.handleSemesters(data);
}).error(function(error){
	 $rootScope.error=error;
});

//get all semesters


//delete semester
$scope.DeleteSemester = function(index) {

var semester=	$rootScope.data.semesters[index];
if(!semester.isCurrent){
	$http.delete($rootScope.baseUrl.semester+semester._id).success(function(data){
		console.log("adsf")
		$rootScope.data.semesters.splice(index,1);

		console.log($rootScope.data.semesters);
	 $rootScope.UTIL.handleSemesters($rootScope.data.semesters);	
}).error(function(error){
	 $rootScope.error=error;
	 console.log(error)
});
}
else
{
	$window.alert('Current Semester cant be deleled')
}
       }

//create new semester
$scope.CreateSemester=function(newSemester){
	
		$http.post($rootScope.baseUrl.semester,newSemester).success(function(data){
		$rootScope.data.semesters.push(angular.copy(newSemester));

		$rootScope.UTIL.handleSemesters($rootScope.data.semesters);	
}).error(function(error){
	 $rootScope.error=error;
});
}


//activate semester
$scope.SetCurrentSemester=function(index){
	//check to see if the button is current
	if(!$rootScope.data.semesters[index].isCurrent){	
	var semester=$rootScope.data.semesters[index];
		$http.put($rootScope.baseUrl.semester+'changeIsCurrent',semester).success(function(data){
				for( var i=0;i< $rootScope.data.semesters.length;i++){
				if($rootScope.data.semesters[i].isCurrent) {
					$rootScope.data.semesters[i].isCurrent=false;
				break;
			}
	}
		$rootScope.data.semesters[index].isCurrent=true;
				 $rootScope.UTIL.handleSemesters($rootScope.data.semesters);
			
		});
	}
}


//activate semester
$scope.ChangeStatusSemester=function(index){
	//set the previous one inactive 
	
	var semester=$rootScope.data.semesters[index];
		$http.put($rootScope.baseUrl.semester + 'changeStatus',semester).success(function(data){
				$rootScope.data.semesters[index].status=!$rootScope.data.semesters[index].status;
				 $rootScope.UTIL.handleSemesters($rootScope.data.semesters);
				//$scope.data.semesters=data;
		});
}

}])
