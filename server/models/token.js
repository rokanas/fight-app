const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for entity
const tokenSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
      },
    token: {
        type: String
    },
});

// Create model from schema
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;