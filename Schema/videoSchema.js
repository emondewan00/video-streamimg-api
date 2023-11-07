const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name is required field"],

    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required field"],
  },
  imdbRatings: {
    type: Number,
    default: 1.0,
    min: [1, "Ratings must be getar then 1"],
    max: [10, "Ratings must be lass then 10"],
  },
  language: {
    type: String,
    required: [true, "Language is require"],
  },
  releaseYear: {
    type: Number,
    required: [true, "Release Year is required field"],
  },
  genres: {
    type: [String],
    required: [true, "Genres is required field"],
  },
  directors: {
    type: [String],
    required: [true, "Directors is required field"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required field "],
  },
  actors: {
    type: [String],
    required: [true, "Actors is required field"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Movie = mongoose.model("Movies", movieSchema);
module.exports = Movie;
