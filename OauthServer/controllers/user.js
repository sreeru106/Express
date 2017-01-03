// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
	console.log("inside post users");
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'New user added!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
	console.log("inside get users");
  User.find(function(err, users) {
    if (err)
      return res.send(err);
console.log("user name ==="+req.user.username);
    res.json(req.user.username);
  });
};