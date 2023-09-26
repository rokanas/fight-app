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
    type: Schema.Types.ObjectId, // ObjectId works with the actual mongo "_id" not our own id
    ref: "martial_art"
  }],
  winner: {
    type: Schema.Types.ObjectId, 
    ref: "fighter"                             
  },
  fighters: [{
    type: Schema.Types.ObjectId, 
    ref: "fighter"                             
  }]
});

// Create model from schema
const Fight = mongoose.model('Fight', fightSchema);

module.exports = Fight;