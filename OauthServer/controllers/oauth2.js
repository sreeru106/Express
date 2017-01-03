// Load required packages
var oauth2orize = require('oauth2orize')

var Client = require('../models/client');
var Token = require('../models/token');
var Code = require('../models/code');
var TokensRel = require('../models/tokens');

// Create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function(client, callback) {
	console.log("inside the serializeClient"+client);
  return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
	console.log("inside the deserializeClient");
  Client.findOne({ _id: id }, function (err, client) {
    if (err) { return callback(err); }
    return callback(null, client);
  });
});


// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
  // Create a new authorization code
  console.log("inside the grant");
  console.log("ares "+ares.scope);
  var code = new Code({
    value: uid(16),
    clientId: client._id,
    redirectUri: redirectUri,
    userId: user._id
  });

  // Save the auth code and check for errors
  code.save(function(err) {
    if (err) { return callback(err); }

    callback(null, code.value);
  });
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
	console.log("inside the access token exchange" +client._id+"  code  "+code);
  Code.findOne({ value: code }, function (err, authCode) {
	  console.log("find code"+authCode);
    if (err) { return callback(err); }
    if (authCode === undefined || !authCode) { console.log("auth code not found"); return callback(null, false); }
	console.log("1111");
    if (client._id.toString() !== authCode.clientId) { return callback(null, false); }
		console.log("222"+redirectUri);
    if (redirectUri !== authCode.redirectUri) { return callback(null, false); }
	console.log("find code"+authCode.clientId);
    // Delete auth code now that it has been used
    authCode.remove(function (err) {
      if(err) { return callback(err); }
	var expirationDate = new Date(new Date().getTime() + (3600 * 1000))

      // Create a new access token
      var token = new Token({
        value: uid(256),
        clientId: authCode.clientId,
        userId: authCode.userId,
		refreshToken:uid(256),
		expiresIn :expirationDate
      });
	 var tokens = new TokensRel({
		refreshToken:token.refreshToken,
		accessToken:token.value
	 });
      // Save the access token and check for errors
      token.save(function (err) {
        if (err) { return callback(err); }
		console.log(token)
		
		tokens.save(function(err){
			if (err) { return callback(err); }
			console.log("inserting data to token")
			callback(null, token.value,token.refreshToken,{expires_in: 3600, token_type: 'bearer'});
		});
        
      });
    });
  });
}));

//Exchange refresh token for access tokens
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, redirectUri, callback){
	
	console.log("inside the refresh token exchange");
	// check refresh token is valid
	
	Token.findOne({refreshToken:refreshToken}, function(err,token){
		
		if(err){return callback(err);}
		
		if (token === undefined) { return callback(null, false); }
		//generate new access token
			var newAC = uid(256);
			 var tokens = new TokensRel({
				refreshToken:refreshToken,
				accessToken:newAC
			 });
			 var expirationDate = new Date(new Date().getTime() + (3600 * 1000))
			//map the new access token to the user 
			Token.update({refreshToken:refreshToken},{$set:{value:newAC,expiresIn:expirationDate} }, function(err){
				if(err){return callback(err);}
				console.log("updated the new token");
			// insert the new access token in the tokensrel 
			
				tokens.save(function(err){
					if(err){console.log("inside error");return callback(err);}
					console.log("relation updated");
					callback(null,newAC,refreshToken,{expires_in: expirationDate});		
				});
				
			});
	});
	
}));

// User authorization endpoint
exports.authorization = [
  server.authorization(function(clientId, redirectUri, callback) {
	console.log("clientId" + clientId);
    Client.findOne({ id: clientId }, function (err, client) {
		
      if (err) { return callback(err); }
		console.log("client identified..."+redirectUri);
      return callback(null, client, redirectUri);
    });
  }),
  function(req, res){
	  console.log("rendering..."+req.oauth2.transactionID+"  "+req.user+" "+req.oauth2.client);
    res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
  }
]


// User decision endpoint
exports.decision = [
  server.decision()
]

exports.token = [
  server.token(),
  server.errorHandler()
]

function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}