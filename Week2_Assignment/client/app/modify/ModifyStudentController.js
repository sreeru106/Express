mainApp.controller('ModifyStudentController',[ '$scope', '$location', 'ModifyStudentService','ViewStudentService', function($scope, $location, service, viewService){
	var ctrl = this;
	ctrl.student = {name:'',age:null,id:null};
	
	fetchModifyData();			
			
		function fetchModifyData(){
			var data = viewService.getData();
			ctrl.student.name = data.name;
			ctrl.student.age = data.age;
			ctrl.student.id = data.id;
		}
		
		ctrl.updateDetails = function() {
			service.updateStudent(ctrl.student,ctrl.student.id).then(
			function(data){
				console.log('updating Student successfully');
			},
            function(errResponse){
                console.error('Error while updating Student');
            });
        	ctrl.student={name:'',age:null,id:null};
            $scope.studentForm.$setPristine();
            $location.path('viewStudent');
        }
}]);
