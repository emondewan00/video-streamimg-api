const express = require("express");
const mongoose = require("mongoose");
const Movie = require("../Schema/videoSchema");
const router = express.Router();

//get video
router.get("/", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.status(200).json({
      status: "Success",
      data: { movies: allMovies },
      length: allMovies.length,
    });
  } catch (error) {
    res.send(error);
  }
});
//create video
router.post("/", async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: "Success",
      data: { movie: newMovie },
    });
  } catch (error) {}
});
//edit video
router.patch("/edit/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = req.body;
    const updateVideo = new Movie.updateOne(videoId, { $set: { video } });
    res.status(200).json({
      status: "Success",
      data: { movie: updateVideo },
    });
  } catch (error) {
    res.send(error);
  }
});
//delete a video
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = new Movie.deleteOne(id);
    res.status(200).json({
      status: "Success",
      data: {
        result,
      },
    });
  } catch (error) {}
});

module.exports = router;
