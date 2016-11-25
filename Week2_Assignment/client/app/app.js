var mainApp = angular.module('mainApp',['ngRoute']);

mainApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/addStudent', {
			templateUrl : 'client/app/add/addStudent.jsp',
			controller : 'AddStudentController',
			controllerAs : 'ctrl'
		}).
		when('/viewStudent', {
			templateUrl : 'client/app/view/viewStudent.jsp',
			controller : 'ViewStudentController',
			controllerAs : 'view'
		}).
		when('/modifyStudent', {
			templateUrl : 'client/app/modify/modifyStudent.jsp',
			controller : 'ModifyStudentController',
			controllerAs : 'modify'
		}).		
		when('/slider', {
			templateUrl : 'client/app/slider/slider.jsp',
			controller : 'SliderController'
		});
}]);

mainApp.directive('jqSlider', [function() {
	  return {
	    restrict: 'A',
	    scope: {
	      'model': '='
	    },
	    link: function(scope, elem, attrs) {
	      $(elem).slider({
	        value: +scope.model,
	        min: +attrs.min,
	        max: +attrs.max,
	        step: +attrs.step,
	        slide: function(event, ui) {
	          scope.$apply(function() {
	            scope.model = ui.value;
	          });
	        }
	      });      
	    }
	  };
	}]);