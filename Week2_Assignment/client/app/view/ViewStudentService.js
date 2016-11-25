
mainApp.service('ViewStudentService', ['$http', '$q' , function($http,$q){
		
	var data = [];
	
	this.setData = function (content) {
		data=content;		
	}	
	
	this.getData = function () {
		return data;		
	}	
	
	this.fetchAllStudents = function () {
        var deferred = $q.defer();
        $http.get('view').then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResp){
                console.error('Error while fetching Students');
                deferred.reject(errResp);
            }
        );
        return deferred.promise;
    }
     
    this.deleteStudent = function (stud){
    	var deferred = $q.defer();
        $http.delete('delete/'+stud.id).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResp){
                console.error('Error while deleting Student');
                deferred.reject(errResp);
            }
        );
        return deferred.promise;
    }
           
}]);