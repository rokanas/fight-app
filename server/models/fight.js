const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for entity
const fightSchema = new mongoose.Schema({
id: {
    type: String,
    required: true,
    unique: true,
    trim: true
    },
date: {                                        // consider changing to email
    type: Date,
    required: true,
    unique: false,
    trim: false
  },
  location: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  weight_class: {
    type: String,
    required: true,
    unique: false,
    trim: false
  },
  martial_art: [{
    type: String
  }],
  winner: {
    type: String                           
  },
  fighters: [{
    type: String                             
  }]
});

// Create model from schema
const Fight = mongoose.model('Fight', fightSchema);

module.exports = Fight;