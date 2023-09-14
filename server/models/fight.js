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
  winner: {
    type: Schema.Types.ObjectId, 
    ref: "fighter"                             
  },
  loser: {
    type: Schema.Types.ObjectId, 
    ref: "fighter"                             
  },
  fight_record: {
    type: String,
    required: true,
    unique: false,
    trim: false
  },
  weight: {
    type: Number,
    required: true,
    unique: false,
    trim: false                 // consider removing trims and uniques where not required
  }
});

// Create model from schema
const Fight = mongoose.model('Fight', fightSchema);

module.exports = Fight;