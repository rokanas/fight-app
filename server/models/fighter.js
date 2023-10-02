const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for entity
const fighterSchema = new mongoose.Schema({
  email: {                                        // consider changing to email
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },    
  full_name: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  sex : {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  martial_art: [{
    type: String,
  }],
  fight_history: [{
    type: String,
  }],
  date_history: [{
    type: String,
  }],
  bio: {
    type: String,
    required: true,
    unique: false,
    trim: false
  },
  location: {
    type: String,
    required: true,
    unique: false,
    trim: false
  },
  fight_record: {
    type: String,
    required: false,
    unique: false,
    trim: false
  },
  weight: {
    type: Number,
    required: true,
    unique: false,
    trim: false                 // consider removing trims and uniques where not required
  },
  height: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
});

// Create model from schema
const Fighter = mongoose.model('Fighter', fighterSchema);

module.exports = Fighter;