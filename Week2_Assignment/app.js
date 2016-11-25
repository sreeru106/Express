
var http = require("http");
var express = require("express");
var mongojs = require("mongojs");

var db = mongojs('test',['Students']);
var routes = require('./routes/index');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(__dirname + "/"));

app.use('/client', express.static(__dirname + '/client/'));
app.use('/index',routes);

app.get('/view',function(req,res){
	console.log("getting");
		db.Students.find({}).toArray(function(err,docs){
		res.json(docs);
	});
});

app.post('/add',function(req,res){
		console.log("adding");
		db.Students.insert({name:req.body.name,id:req.body.id,age:req.body.age},function(err,docs){
		db.Students.find(function(err,docs){
		res.json(docs);
	});
	});
});

app.delete('/delete/:id',function(req,res){
	console.log("deleting");
		db.Students.remove({id :req.params.id},function(err,docs){
		db.Students.find(function(err,docs){
		res.json(docs);
	});
	});
});

app.put('/update/:id',function(req,res){
	console.log("updating");
		db.Students.update({id: req.params.id},{$set: {name:req.body.name,id:req.body.id,age:req.body.age}},
		function(err, object) {
      if (err){
          console.log(err.message);  
      }else{
			db.Students.find(function(err,docs){
			res.json(docs);
	});
      }
  });
});

app.listen(8888);
console.log("Welcome to Node");
