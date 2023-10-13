const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for entity
const tokenSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true,
      },
    tokens: [{
        type: String
    }],
});

// Create model from schema
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;