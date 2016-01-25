app.constant("pageSize",3)
.constant("ActiveClass","btn-primary")
.controller('ProjectCtrl',['$http','$scope','$rootScope','$timeout','$location','$window','Upload','ActiveClass','$uibModal','pageSize',function($http,$scope,$rootScope,$timeout,$location, $window,Upload,ActiveClass,$uibModal,pageSize){




 //$rootScope.data.students.unallocated=$rootScope.UTIL.getUnallocatedStudents($rootScope.data.students);


  $scope.animationsEnabled = true;

  $scope.CreateProject = function () {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/components/project/create_project.html',
      controller: 'ModalInstanceCtrl',
    });

    modalInstance.result.then(function (result) {
     
    result.isNewObject=true;
              result.clients=[];
              result.clients[0]=result.newContact;
              delete result.newContact;
              if(result.secNewContact!=null) {
                result.clients[1]=result.secNewContact;
                delete result.secNewContact;
              }
             $http.post($rootScope.baseUrl.project,result).success(function(data){                       
                $rootScope.data.projects.push(data);
                console.log(data)
              });

    }, function () {
       console.log('c')
    });
  };


  $scope.ShowProject = function (project) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/components/project/show_project.html',
      controller: 'ModalInstanceCtrl1',
       size: 'lg',
       resolve: {
        project: function () {
          return project;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
     
    });
  };



$scope.UnderConstruction=function(){
 alert("This function has not been implemented")
}


$scope.RedirectToWeb=function(student){

  $window.open("https://my.unisa.edu.au/staff/Teaching/Students/Personal.aspx?sid="+student['Student Id'],'_blank');
}

$scope.BulkDelete=function(){


angular.forEach($rootScope.data.projects,function(item){
    if(item.selected) {
        $http.delete($rootScope.baseUrl.project+item._id).success(function(data){
//only use index when there is no filter applied 
    $rootScope.data.projects.splice($rootScope.data.projects.indexOf(item),1);
    
  })
    }
  })


}

$scope.CheckDropItem = function(item,items) {
       for (var i=0; i<items.length;i++){
     
        if(items[i]._id==item._id) {
            alert('Mmmmm, It might not be a good idea to assign me twice in the same project :(')
            return false
        }
    }
    return item;
        
    };

$scope.UpdateProject=function(project){

  $http.put($rootScope.baseUrl.project+project._id,project).success(function(data){
  var pos=  $rootScope.UTIL.getIndexInArray($rootScope.data.projects,project,'_id');
  $rootScope.data.projects[pos]=data;

$http.get($rootScope.baseUrl.student).success(function(data){
  $rootScope.data.students=data;
   $rootScope.data.students.unallocated=$rootScope.UTIL.getUnallocatedStudents($rootScope.data.students);
;}).error(function(error){
  $rootScope.error=error;
})


  $scope.editProject=null;
})
}


$scope.StartEditProject=function(project){
    $scope.orginalProject=project;
    $scope.currentProject=angular.copy(project);

    $scope.editProject=$scope.currentProject;
}



$scope.CancelEditProject=function(project){

  $scope.editProject=null;
}

$scope.ExportProjects=function(semester){
  var project_export=[];
 angular.forEach($rootScope.data.projects, function(item){
  var clients="";
  var students="";
  var supervisors="";
  if (item.clients.length>0) 
  {
    angular.forEach(item.clients,function(c){
        if(c!=null) clients=c.fullname+'('+c.email+')'+'\n';
        
    })
  }
   if (item.students.length>0) 
  {
    angular.forEach(item.students,function(s){
       if(s!=null) students=s['Student Email Address']+'\n';
    })
  }

    if (item.supervisors.length>0) 
  {
    angular.forEach(item.supervisors,function(ss){
       if(ss!=null) supervisors=ss.firstname +' ' +ss.lastname
    })
  }
  project_export.push({no:item.no,title:item.title,status:item.status,description: item.description,clients: clients,students:students,supervisors:supervisors});
 })
 
   return project_export;
}



	
$scope.pageSize=pageSize;
$scope.SelectedPage=1;
$scope.allocatedResource='Student';
//$scope.SelectedSemester=$scope.currentView;
$scope.SelectSemester= function(semester){
	$rootScope.data.semesters.selectedSemester=semester;

	//$scope.data.SelectedPage=1;
} 

$scope.selectPage =function(page){
	$scope.SelectedPage=page;
}

/*$scope.semesterFilter=function(project){
	console.log($scope.data.SelectedSemester);
//console.log('project'+project);
	return project.semester == $scope.data.SelectedSemester || !$scope.data.SelectedSemester ;
}*/

$scope.GetSemesterClass=function(semester){
	return $rootScope.data.semesters.selectedSemester == semester ? ActiveClass :"" ;
}

$scope.getPageClass = function(page){
	return $scope.SelectedPage==page? ActiveClass:"";
}

$scope.GetAllocatedResource=function(resource){

	$scope.allocatedResource=resource;
  console.log(resource)
  console.log($rootScope.data.users)
}


/*$scope.onDrop_AddClient=function($event,client,clients){
	console.log(client)
	clients.push(client);
}*/

$scope.orderByList={
        list:  [{name:'FirstName',value:'Student First Name'},
          {name:'FamilyName',value:'Student Family Name'},
          {name:'Project_id',value:'Project'},
          {name:'GPA',value:'Current GPA'},
          {name:'Program',value:'Program Plan'}
          ],
        
           first:{value:'Current GPA', order: true} 
}

//$scope.orderBy1 =[$scope.reverse+'\u0022'+$scope.orderByList.second.value+'\u0022','\u0022Student Family Name\u0022']
$scope.reverse= true;

$scope.predicate=function(student){

  return student[$scope.orderByList.first.value];
}


/*$scope.toggleEditMode=function(e,project){
  console.log(project.editMode)
	 if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
     project.editMode = !project.editMode;
  console.log(project.editMode)
}*/





}])





app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {


  $scope.Save = function (project) {
   
    $uibModalInstance.close(project);
  };

  $scope.Cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});



app.controller('ModalInstanceCtrl1', function ($scope, $uibModalInstance,project) {

$scope.project=project;

  $scope.Close = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


