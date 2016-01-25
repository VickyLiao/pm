var app=angular.module("myApp",["ngRoute","ngResource","ngStorage","ngFileUpload","ui.bootstrap","dndLists","ngCsv","ngAnimate","textAngular"]);

app.run(function($rootScope,$http){
	$rootScope.UTIL={
		handleSemesters:function(data){
			$rootScope.data.semesters=data;
	 $rootScope.data.semesters.show=[];
	 $rootScope.data.semesters.selectedSemester={}
	angular.forEach(data,function(item){
		if(item.status)  $rootScope.data.semesters.show.push(item);
		if(item.isCurrent)  $rootScope.data.semesters.selectedSemester=item;
	})
		},

		getIndexInArray:function(array,object,id){
			var pos=-1;
			for(var i=0;i<array.length;i++){
				if(array[i][id]==object[id])
				{
					pos=i;
					break;
				}
			}
			return pos;
		},
        //semester is semester object not name as string
		getDataBySemester:function(array,semester){
			var data=[];
			angular.forEach(array,function(item){
				if(item.semester==semester.name) data.push(item);
			})
			return data;
		},
        getUnallocatedStudents:function(array){
            var unallocated=[];
            angular.forEach(array,function(s){
    if(s.project_no==null) unallocated.push(s);

})
            return unallocated;
        },

        checkItemExisted:function(array,item,id){
           var isExisted=false 
            for(var i=0;i<array.length;i++){
      if(array[i][id]==item[id]){
           isExisted=true;
        break;
          }
             }
           return isExisted;
        },

        checkRequired:function(array,item){
          var allFilled=true;
             for(var i=0;i<array.length;i++){
      if(item[array[i]]==null){
          allFilled=false
        break;
          }
        }
        return allFilled;
      }


	}
})

app.config(function($routeProvider){
$routeProvider.when("/create_project",{
  templateUrl:"/app/components/project/create_project.html"
})
$routeProvider.when("/login",{
  templateUrl:"/app/components/welcome/login.html"
})
$routeProvider.when("/main",{
  templateUrl:"/app/components/main/main.html"
})
$routeProvider.otherwise({
  templateUrl:"/app/components/welcome/welcome.html"
})
});




app.controller('AppCtrl',['$scope','$rootScope','$http','$uibModal',function($scope,$rootScope,$http,$uibModal){




$scope.email1=function(){
$http.post($rootScope.baseUrl.email+'sayHello').success(function(err,data){
   if(err) console.log(err)
    console.log(data)
})
};

 $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/components/project/create_project.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };





$scope.listA = [{name:'vicky',value:100},{name:'lizzy',value:200},{name:'brons',value:500}];
$scope.listB=[{name:'vicky',value:100},{name:'fab',value:200},{name:'brons',value:500}]
    
     
    // Generate initial model
 

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);


/*$scope.dragList=[{name:'vicky',value:100},{name:'lizzy',value:200},{name:'brons',value:500}];

$scope.dropList=[{name:'vicky1',value:100}];
$scope.cb=function(it){
    console.log(it)
    for (var i=0; i<$scope.dropList.length;i++){
        console.log(i)
        if($scope.dropList[i].name==it.name) {
            alert('duplicate')
            return false
        }
    }
    return it;
}*/

 $rootScope.baseUrl={ 
 	
 	project:"http://localhost:5000/api/projects/",
 	user:"http://localhost:5000/api/users/",
 	student:"http://localhost:5000/api/students/",
 	semester:"http://localhost:5000/api/semesters/",
  email:"http://localhost:5000/api/email/"
 }
 $rootScope.data={};
$http.get($rootScope.baseUrl.semester).success(function(data){
	 $rootScope.UTIL.handleSemesters(data);
}).error(function(error){
	 $rootScope.error=error;
});

$http.get($rootScope.baseUrl.student).success(function(data){
	$rootScope.data.students=data;
    $rootScope.data.students.unallocated=$rootScope.UTIL.getUnallocatedStudents($rootScope.data.students);
}).error(function(error){
	 $rootScope.error=error;
});

$http.get($rootScope.baseUrl.user).success(function(data){
	$rootScope.data.users=data;
}).error(function(error){
	 $rootScope.error=error;
});


$http.get($rootScope.baseUrl.project).success(function(data){
	$rootScope.data.projects=data;
  $rootScope.data.projects.status=['Created','Pending','Approved','Rejected'];
$rootScope.data.projects.selectedStatus='Created';
}).error(function(error){
	 $rootScope.error=error;
});





}])




app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});