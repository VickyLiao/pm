app.controller('EmailCtrl',['$scope','$rootScope','$http','$window','$uibModal',function($scope,$rootScope,$http,$window,$uibModal){



$scope.email={from:$rootScope.currentUser.email,
				to:{clients:true,supervisors:true, students:true}
			}




  $scope.SelectProjects = function () {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/components/email/select_projects.html',
      size:'lg',
      controller: 'ModalInstanceCtrl2'
    });

    modalInstance.result.then(function (selectedItem) {

$scope.selectedProjects=[];
angular.forEach($rootScope.data.projects,function(item){
		if(item.selected){
			$scope.selectedProjects.push(item);
		} 
	})
    	
      $scope.selected = selectedItem;
    }, function () {
     
    });
  };







$scope.Send=function(email){

if(email.to.clients){
angular.forEach($scope.selectedProjects,function(project){
		angular.forEach(project.clients,function(client){
			email.toList.push(client.email)
		})

})
}

if(email.to.students){
angular.forEach($scope.selectedProjects,function(project){
		angular.forEach(project.students,function(student){
			email.toList.push(student['Student Email Address']);
		})

})
}

if(email.to.supervisors){
angular.forEach($scope.selectedProjects,function(project){
		angular.forEach(project.supervisors,function(supervisor){
			email.toList.push(supervisor.email)
		})

})
}

email.to=email.toExtra+','+email.toList.join();




$http.put($rootScope.baseUrl.email+'sendEmail',email).success(function(err,data){
   if(err) console.log(err)
    console.log(data)
})
};















}])


app.controller('ModalInstanceCtrl2', function ($scope, $uibModalInstance) {

$scope.CheckAll=function(selected,selectedSemester,selectedStatus){
	angular.forEach($rootScope.data.projects,function(item){
		if(item.semester==selectedSemester.name && item.status==selectedStatus) item.selected=selected;
	})
}

  $scope.Save = function () {
   
    $uibModalInstance.close();
  };

  $scope.Close = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
