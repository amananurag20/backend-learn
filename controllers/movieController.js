const Movie = require("../models/Movie");



exports.createMovies=async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(200).json({ success: true, movie });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: "something went wrong" });
  }
}

exports.getAllMovies=async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ success: true, movies });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "something went wrong" });
  }
}