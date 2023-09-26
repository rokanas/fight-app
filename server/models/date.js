const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for entity
const dateSchema = new mongoose.Schema({
  id: {                                        
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  date: {                                        
    type: Date,
    required: true,
    unique: false,
    trim: false
  },
  fighters: [{
    type: Schema.Types.ObjectId,
    ref: "fighter"
  }],
  location: {
    type: String,
    required: true,
    unique: false,
    trim: true
  }
});

// Create model from schema
const dateModel = mongoose.model('Date', dateSchema); // Can not be named Date cuz it will conflict with line 13 type: Date

module.exports = dateModel;