
<div>
<h2>Student Details</h2>
<table id="studDetails">
			<thead>
				<tr>
					<th>Name</th>
					<th>Age</th>
					<th>Id</th>
					<th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="stud in view.students | orderBy:stud.id">
					<td>{{stud.name}}</td>
					<td>{{stud.age}}</td>
					<td>{{stud.id}}</td>
					<td><button  ng-click="view.removeDetails(stud)">Remove</button>&nbsp;&nbsp;<button  ng-click="view.edit(stud.id,stud)"><a href="#modifyStudent">Modify</a></button></td>
				</tr>
			</tbody>
		</table>

</div>