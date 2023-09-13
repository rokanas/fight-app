const mongoose = require('mongoose');

// Define schema for entity
const fighterSchema = new mongoose.Schema({
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
    type: Schema.Types.ObjectId, ref: "fight"   // find out if it's necessary to include required or unique here
  }],
  bio: {
    type: String,
    required: true,
    unique: false,
    trim: false
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
const Fighter = mongoose.model('Fighter', fighterSchema);

module.exports = Fighter;