<div>
	<form name = "studentForm">
         
            <div class="studentry">
			<div>
               	<label>Enter name:</label>
                  <input class="input1" name = "name" type = "text" ng-model = "ctrl.student.name" required>
                  <span ng-show="studentForm.name.$touched && studentForm.name.$invalid">The Student name is required.</span>                     
            </div>
			<div>			 
                  <label>Enter Age: </label>
                  <input class="input2" name = "age"  type = "text" ng-model = "ctrl.student.age">                     
			</div>
			<div>
                  <label>Enter Id: </label>
                  <input class="input3" name = "id"  type = "text" ng-model = "ctrl.student.id" required>
                  <span ng-show="studentForm.id.$touched && studentForm.id.$invalid">The Student Id is required.</span>
             </div>
			<div class = "buttons">
                     <input type=button value="Add New" ng-click="ctrl.submitDetails()" 
                     ng-disabled="studentForm.$pristine || (studentForm.name.$invalid || studentForm.id.$invalid) ">
                     <input type="reset" ng-click="ctrl.resetDetails()" value = "Reset Details">
			</div>
            </div>
         </form>

</div>