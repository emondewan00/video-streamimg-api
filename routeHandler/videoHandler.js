const express = require("express");
const Video = require("../Schema/videoSchema");
const History = require("../Schema/historySchema");
const router = express.Router();
const ApiFeatures = require("../utils/ApiFeaturs");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//get video
router.get("/", async (req, res) => {
  try {
    const category = req.query.category ? { category: req.query.category } : {};
    const videoCount = await Video.find(category).count();
    
    const allVideos = new ApiFeatures(Video.find(), req.query)
      .pagination(videoCount)
      .limitFields()
      .sort()
      .filter()
      .getNumberOfDocument()
      .textSearch();

    const videos = await allVideos.query;
    res.status(200).json({
      status: "Success",
      length: videos.length,
      totalVideo: videoCount,
      data: { videos: videos },
    });
  } catch (error) {
    res.send(error);
  }
});

//tags videos
router.get("/tags", async (req, res) => {
  try {
    const { tags, category, id } = req.query;
    const tagsArr = tags.split(",");

    // if (id === undefined) throw new Error("id is not found!");
    const result = await Video.aggregate([
      {
        $match: {
          _id: { $ne: new ObjectId(id) },
          $or: [{ $or: [{ category }, { tags: { $in: tagsArr } }] }],
        },
      },
      { $limit: 10 },
    ]);

    if (result.length < 1) {
      const random = await Video.find({ _id: { $ne: new ObjectId(id) } }).limit(
        10
      );
      return res.status(200).json({
        status: "Success",
        length: random.length,
        data: { videos: random },
      });
    }
    res.status(200).json({
      status: "Success",
      length: result.length,
      data: { videos: result },
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//search video
router.get("/search", async (req, res) => {
  try {
    const text = req.query.text;
    const result = await Video.find({
      $text: { $search: text },
    });
    res.send({
      status: "success",
      length: result.length,
      data: {
        result,
      },
    });
  } catch (error) {
    res.send(error);
  }
});

//create video
router.post("/", async (req, res) => {
  try {
    const tags = req.body.tags.split(",");
    const trimTags = tags.map((tag) => tag.trim().toLowerCase());
    const newVideo = { ...req.body, tags: trimTags };
    const result = await Video.create(newVideo);
    res.status(201).json({
      status: "Success",
      data: { result },
    });
  } catch (error) {
    res.send(error);
  }
});

//get single video
router.get("/single/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const video = await Video.findOne({ _id });
    res.status(200).json(video);
  } catch (error) {
    res.send(error);
  }
});

//edit video
router.patch("/edit/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const video = req.body;
    const updateVideo = await Video.updateOne(
      { _id },
      { $set: video },
      { runValidators: true }
    );
    console.log(updateVideo);
    res.status(200).json({
      status: "Success",
      data: { video: updateVideo },
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//delete a video
router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const session = await Video.startSession();
    await session.withTransaction(async () => {
      try {
        const result = await Video.deleteOne({ _id });
        const deleteformHistory = await History.deleteMany({ videoId: _id });
        console.log(deleteformHistory, "hello 149 line");
        res.status(200).json({
          status: "Success",
          data: {
            result,
          },
        });
      } catch (error) {}
    });
    await session.endSession();
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
