mainApp.controller('AddStudentController',[ '$scope','AddStudentService', function($scope, service){
	var ctrl = this;
	ctrl.student = {name:'',age:null,id:null};
	
		ctrl.submitDetails = function() {
			service.createStudent(ctrl.student).then(
				function(data){
					console.log('creating Student successfully');
				},
                function(errResponse){
                    console.error('Error while creating Student');
                });
                ctrl.resetDetails();
            }
			
			ctrl.resetDetails=function(){
                ctrl.student={name:'',age:null,id:null};
                $scope.studentForm.$setPristine(); //reset Form 
                $scope.studentForm.$setUntouched();
            }
									
}]);


