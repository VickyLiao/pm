app.controller('StudentCtrl',['$scope','$rootScope','$http','$timeout','$window','Upload',function($scope,$rootScope,$http,$timeout,$window,Upload){


/*$http.get($rootScope.baseUrl.student).success(function(data){
	$rootScope.data.students=data;
	 $rootScope.data.students.unallocated=$rootScope.UTIL.getUnallocatedStudents($rootScope.data.students);
;}).error(function(error){
	$rootScope.error=error;
})*/
$scope.data.number=0;







 $scope.uploadFiles = function(semester,file, errFiles) {

if(angular.isDefined(semester)){
	 
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: $rootScope.baseUrl.student+'upload',
                data: {file: file,semester:semester}
               
            });
             file.upload.then(function (response) {
               angular.forEach(response.data,function(item){
                  $rootScope.data.students.push(item)
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
    else
    {
    	$window.alert('please choose action first');
    }
    }




$scope.CountStudentBySemester=function(semester){
	$scope.data.students=$rootScope.UTIL.getDataBySemester($rootScope.data.students,semester);
   $scope.data.number=$rootScope.UTIL.getDataBySemester($rootScope.data.students,semester).length

}


   
$scope.StartEditStudent=function(student){
	$scope.editStudent=student;
}

$scope.UpdateStudent=function(student){
	$http.post($rootScope.baseUrl.student,student).success(function(data){
	var pos=	$rootScope.UTIL.getIndexInArray($rootScope.data.students,student,'_id');
	$rootScope.data.students[pos]=data;
		$scope.editStudent=null;
	})

}
$scope.DeleteStudent=function(student){
	$http.delete($rootScope.baseUrl.student+student._id).success(function(data){
//only use index when there is no filter applied 
		$rootScope.data.students.splice($rootScope.data.students.indexOf(student),1);
		
	})
}

$scope.CreateStudent=function(student,selectedSemester){
	student.semester=selectedSemester.name;
		$http.post($rootScope.baseUrl.student,student).success(function(data){
		$rootScope.data.students.push(data);
	})
	$scope.editStudent=null;
}

$scope.CancelEditStudent=function(){
	$scope.editStudent=null;
}


$scope.CheckAll=function(selected,selectedSemester){
	angular.forEach($rootScope.data.students,function(item){
		if(item.semester==selectedSemester.name) item.selected=selected;
	})
}

$scope.GetProjectNoBySemester=function(){
	$scope.data.projects=[];
	angular.forEach($rootScope.data.projects,function(project){
		if(project.no!=null && project.semester==$rootScope.data.semesters.selectedSemester.name)
			$scope.data.projects.push(project);
	})
}


$scope.BulkDelete=function(){


angular.forEach($rootScope.data.students,function(item){
		if(item.selected) {
				$http.delete($rootScope.baseUrl.student+item._id).success(function(data){
//only use index when there is no filter applied 
		$rootScope.data.students.splice($rootScope.data.students.indexOf(item),1);
		
	})
		}
	})


}



$scope.ActionStudents=function(action,from_semester,to_semester){
if(angular.isDefined(action)){
var from_students=[];
var to_students=[];
angular.forEach($rootScope.data.students,function(item){

	if(item.semester==from_semester.name) from_students.push(item);

	if(item.semester==to_semester.name) to_students.push(item);
})


angular.forEach(from_students,function(item)
{

		if(item.selected){
			if($rootScope.UTIL.getIndexInArray(to_students,item,'Student Id')<0){
			var newItem=angular.copy(item)
			newItem.semester=to_semester.name;
			newItem.selected=false;

				$http.post($rootScope.baseUrl.student,newItem).success(function(data){
				//only use index when there is no filter applied 
				$rootScope.data.students.push(newItem);
				if(action=='move'){
				$http.delete($rootScope.baseUrl.student+item['_id']).success(function(data){
					$rootScope.data.students.splice($rootScope.data.students.indexOf(item),1);

				})
					}
				
				})
		}
		else {
			$window.alert(item['Student Id']+' already exist in '+ to_semester.name)

		}
		item.selected=false;
	}
	})
}
else
{
	$window.alert('Please select an action')
}
}



/*

	var selectedStudents={};
	selectedStudents.actionSemester=semester.name;
selectedStudents.students=[];
	angular.forEach($scope.data.students,function(value){
		if(value.selected) {
			selectedStudents.students.push(value);
		}
	})

	$http.put($rootScope.baseUrl.student+action,selectedStudents).success(function(data){

			$scope.data.students=data.success;
			if(angular.isDefined(data.fail))
			{
				console.log(data.fail);
			}
			console.log($scope.data.students)
	})*/


//$scope.orderBy ='\u0022Current GPA\u0022'
$scope.reverse=true;
$scope.SetOrderBy=function(column){
	$scope.orderBy=column;
	$scope.reverse=!$scope.reverse;

}

$scope.predicate=function(student){
	return student[$scope.orderBy];
}

}])

/*
app.service('API', ['$http', function ($http) {
return {
uploadcsv: function(csv) {
var formData = new FormData();
formData.append("file", logo);
return $http.post('/api/uploads', formData, {
headers: {'Content-Type': undefined},
transformRequest: angular.identity
});
}
};
}]);




app.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('change', function(){
              $parse(attrs.fileInput).assign(scope,element[0].files)
              scope.$apply()
                })
            }
        }
    
}]);

*/

/*$http.get(dataUrl4Semesters).success(function(data){
	$scope.data.semesters=data;
	$scope.data.selectedSemester={}
	angular.forEach($scope.data.semesters,function(item){
		if(item.isCurrent) {
			console.log('haha')
			$scope.data.selectedSemester=item;
			 console.log($scope.data.selectedSemester.name)
		}
	})
});



$http.get(dataUrl4Semesters).success(function(data){
	$scope.data.semesters=data;
	
	var  keepGoing=true;
	angular.forEach(data,function(value){
		if(keepGoing){
		if(value.status=='active') {
			$scope.data.selectedSemester=value;
			keepGoing=false;
		}
	}

		
	})
	
}).error(function(error){
	$scope.data.error=error;
});

$scope.UploadCSV=function(csv){
	console.log(csv)
var formData = new FormData();
formData.append("file", csv);
$http.post(dataUrl4Students+'upload', formData, {
headers: {'Content-Type': undefined},
transformRequest: angular.identity
}).success(function(data){
	console.log(data)
})

}

*/