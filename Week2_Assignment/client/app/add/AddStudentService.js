
mainApp.service('AddStudentService', ['$http', '$q' , function($http,$q){
			 
    this.createStudent = function (student) {
        var deferred = $q.defer();
        $http.post('add', student)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResp){
                console.error('Error while creating Student');
                deferred.reject(errResp);
            }
        );
        return deferred.promise;
    }
	           
}]);



