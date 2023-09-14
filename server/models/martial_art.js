const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for entity
const martialArtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Ruleset: {
        type: String,
        required: true,
        unique: false,
        trim: false
    }
});

// Create model from schema
const MartialArt = mongoose.model('MartialArt', martialArtSchema);

module.exports = MartialArt;