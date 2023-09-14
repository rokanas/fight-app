const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for entity
const refereeSchema = new mongoose.Schema({
  id: {                                        // consider changing to email
    type: String,
    required: true,
    unique: true,
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
  fight_history: [{
    type: Schema.Types.ObjectId, 
    ref: "fight"                             // find out if it's necessary to include required or unique here
  }],
  certification: {
    type: String,
    required: true,
    unique: false,
    trim: false
  }
});

// Create model from schema
const Referee = mongoose.model('Referee', refereeSchema);

module.exports = Referee;