const express = require("express");
const History = require("../Schema/historySchema");
const ReactionVideos = require("../utils/aggregateVideo");
const Video = require("../Schema/videoSchema");
const router = express.Router();

//get history
router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const limit = req.query.limit
      ? { $limit: +req.query.limit }
      : { $limit: 999999 };

    const query = new ReactionVideos(History);
    const videos = await query.getHistorysLikesWatchLaterVideos(email, limit);
console.log(videos,"history")
    res.status(200).json({
      status: "success",
      length: videos.length,
      data: {
        videos,
      },
    });
  } catch (error) {
    res.send(error);
  }
});

//find all
router.get("/sss", async (req, res) => {
  try {
    const result = await History.find();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

//post history
router.post("/", async (req, res) => {
  try {
    const { videoId } = req.body;
    const result = await History.create(req.body);
    const updateViews = await Video.updateOne(
      { _id: videoId },
      { $inc: { views: 1 } }
    );
    res.status(201).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        result: error.message,
      },
    });
  }
});

//delete history
router.delete("/", async (req, res) => {
  try {
    //{ _id: req.params.id }
    const result = await History.deleteMany();
    res.status(200).json({
      status: "success",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(455).json({
      status: "fail",
      data: {
        result: error.message,
      },
    });
  }
});

module.exports = router;
