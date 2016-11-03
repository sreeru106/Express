var express = require('express');
var app = express();
var routes = require('./routes/index');
var add = require('./routes/add');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';



app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// all environments
app.set('port', process.env.PORT || 3000);

app.use('/index', routes);
app.post('/add', function(req,res,next){
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db,req, function() {
      db.close();
  });
});

var insertDocument = function(db, req,callback) {
   db.collection('employee').insertOne( {
      "details" : {
         "name" : req.body.name,
         "id" : req.body.id,
         "desg" :req.body.dese,
      }
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the employee collection.");
	res.render('index',{title:'Express Example'});
    callback();
  });
};

});
var server=app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


