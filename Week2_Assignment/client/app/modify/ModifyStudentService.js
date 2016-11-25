
mainApp.service('ModifyStudentService', ['$http', '$q' , function($http,$q){
		
	var data = [];
	
	this.setData = function (content) {
		data=content;		
	}	
	
	this.getData = function () {
		return data;		
	}	
	
	
    this.updateStudent = function (stud, id){
    	var deferred = $q.defer();
        $http.put('update/'+id, stud).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResp){
                console.error('Error while editing Student');
                deferred.reject(errResp);
            }
        );
        return deferred.promise;
    }
    
    
}]);