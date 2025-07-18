const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,    
  },
  director: String,
  releaseYear: Number,
  genres: [String],   //[comedy,action]    
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  duration: Number,       // duration in minutes
  description: String,
  cast: [String],         // array of actor names
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
