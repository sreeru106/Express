// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');

passport.use(new BasicStrategy(
  function(username, password, callback) {
	  console.log("success"+username);
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }
		
      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
		if(user.password == password) {
			console.log("success");
        // Success
        return callback(null, user);
      }
    });
  }
));

passport.use(new LocalStrategy(
  function(username, password, callback) {
	  console.log("success"+username);
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }
		
      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
		if(user.password == password) {
			console.log("success");
        // Success
        return callback(null, user);
      }
    });
  }
));

passport.use('client-basic', new BasicStrategy(
  function(username, password, callback) {
	  console.log("client authenticating");
    Client.findOne({ id: username }, function (err, client) {
      if (err) { return callback(err); }

      // No client found with that id or bad password
      if (!client || client.secret !== password) { return callback(null, false); }

      // Success
	  console.log("client authenticati success");
      return callback(null, client);
    });
  }
));

passport.use(new BearerStrategy(
  function(accessToken, callback) {
	  console.log("inside token verification");
    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { console.log("err "+err); return callback(err); }
	

      // No token found
      if (!token) { console.log("no token"); return callback(null, false); }
	  if (new Date() > token.expiresIn) {
		  console.log("token expired")
           return callback(null, false,"Token has expired");  
      }
		else{
			
			User.findOne({ _id: token.userId }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        // Simple example with no scope
		console.log("found user for the token"+user);
        callback(null, user, { scope: '*' });
      });
		}
      
    });
  }
));

exports.isUserAuthenticated = passport.authenticate(['local'], { session : false });
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
