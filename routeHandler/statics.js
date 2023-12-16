const express = require("express");
const router = express.Router();
const History = require("../Schema/historySchema");
const Video = require("../Schema/videoSchema");
const User = require("../Schema/userSchema");

//get videos monthly
router.get("/", async (req, res) => {
  try {
    const videos = await User.aggregate([
      {
        $group: {
          _id: { $hour: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);
    console.log(videos, "hello");
    res.send(videos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//top videos
router.get("/topVideos", async (req, res) => {
  try {
    const result = await History.aggregate([
      { $group: { _id: "$videoId", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "_id",
          as: "video",
        },
      },
      { $unwind: "$video" },
    ]);
    res.status(200).json({
      status: "Success",
      length: result.length,
      data: { videos: result },
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
