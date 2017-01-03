// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var https =require('https');
var fs =require('fs');

var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');
var userController = require('./controllers/user');
var User = require('./models/user');
// https certificates 
var options = {
  key: fs.readFileSync('./security/localhost_8888.key'),
  cert: fs.readFileSync('./security/localhost_8888.cert')
};


// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/OAuth');

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
 
// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

//login form
app.get('/api/oauth2/authorize', function(req, res) {
	console.log("query params:"+req.query.client_id);
	res.render('login', {clientId : req.query.client_id, redirectUri: req.query.redirect_uri, responseType: req.query.response_type,state:req.query.state})
	})
app.get('/api/oauth2/privacypolicy', function(req,res){
	res.write("<html><body> this is a privacy policy </body></html>");
	res.end();
	
})	
//redirecting to ouath2 flow	
app.post('/api/oauth2/authorized', authController.isUserAuthenticated, function(req, res) {
    //It is not essential for the flow to redirect here, it would also be possible to call this directly
    res.redirect('/api/oauth2/authorization?response_type=' + req.body.response_type + '&client_id=' + req.body.client_id + '&redirect_uri=' + req.body.redirect_uri+'&state='+req.body.state+'&userid='+req.user.username)
  })
 router.use(function (req, res, next) {
  console.log("request==="+req);
  next()
})
  
// Create endpoint handlers for /users
router.route('/users')
 .post(userController.postUsers)
  .get(authController.isBearerAuthenticated,userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorization')
  .get(function(req, res, callback) {
	  console.log( req.query.userid );
    User.findOne({ username: req.query.userid }, function (err, user) {
      if (err) { return callback(err); }
      // No user found with that username
      if (!user) { return callback(null, false); }
        req.body.username=user.username;
		req.body.password=user.password;
		callback();
      });
  },  authController.isUserAuthenticated, oauth2Controller.authorization)
  .post( function(req, res, callback) {
    console.log( req.body.username );
    User.findOne({ username: req.body.userid  }, function (err, user) {
      if (err) { return callback(err); }
      // No user found with that username
      if (!user) { return callback(null, false); }
        req.body.username=user.username;
		req.body.password=user.password;
		callback();
      });
  },authController.isUserAuthenticated,oauth2Controller.decision);
  
app.post('/api/oauth2/token',authController.isClientAuthenticated,function(req,res,callback){
	console.log('logging token call');
	console.log('reequest'+JSON.stringify(req.body));
	console.log('reequest header'+JSON.stringify(req.headers));
	callback();
},oauth2Controller.token)
// Create endpoint handlers for oauth2 token
//router.route('/oauth2/token')
 // .post(authController.isClientAuthenticated, oauth2Controller.token);

  
  
// Register all our routes with /api
app.use('/api', router);

// Start the server
https.createServer(options, app).listen(8888);
console.log("server has started!!! ")