// Load required packages
var mongoose = require('mongoose');

// Define our tokens schema
var TokenRelSchema= new mongoose.Schema({
  refreshToken: { type: String, required: true },
  accessToken: { type: String, required: true },
});

// Export the Mongoose model
module.exports = mongoose.model('TokensRel', TokenRelSchema);