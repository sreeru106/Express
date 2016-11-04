var express= require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';




router.post('/',function(req,res,next){
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});

var insertDocument = function(db,callback) {
   db.collection('employee').insertOne( {
      "details" : {
         "name" : req.body.name,
         "id" : req.body.id,
         "desg" :req.body.dese,
      }
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the employee collection.");
	res.render('success',{title:'Employee registration'});
    callback();
  });
};

});

module.exports =router;