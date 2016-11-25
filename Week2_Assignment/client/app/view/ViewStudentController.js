

mainApp.controller('ViewStudentController',[ '$scope','ViewStudentService', function($scope, service){
	var view = this;
	view.students = [];
	
	fetchAllStudents();
	
	 function fetchAllStudents(){
		 service.fetchAllStudents().then(
         function(data) {
        	 view.students = data;
         },
         function(errResp){
             console.error('Error while fetching Students');
         }
     );
    }
	 
	 view.edit = function(id,stud){
		 service.setData(stud);
	 }
	 
	 view.removeDetails = function(stud) {
		 service.deleteStudent(stud).then(
			function(data){
				view.students = data;
				console.log('delete Student successfully');
			},
         function(errResponse){
             console.error('Error while deleting Student');
         });
         
     }
}]);


