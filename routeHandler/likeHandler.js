const express = require("express");
const { Server } = require("socket.io");
const Like = require("../Schema/likeSchema");
const ReactionVideos = require("../utils/aggregateVideo");
const router = express.Router();

// const io = new Server(3000);

// io.engine.on("connection", (rawSocket) => {
//   // if you need the certificate details (it is no longer available once the handshake is completed)
//   rawSocket.peerCertificate = rawSocket.request.client.getPeerCertificate();
// });

// io.on("connection", (socket) => {
//   console.log(socket.conn.peerCertificate);
// });

//get likes videos
router.get("/ib", async (req, res) => {
  try {
    const limit = req.query.limit ? { $limit: req.query.limit } : {};
    console.log(limit);
    const query = new ReactionVideos(Like);
    const likeVideos = await query.getHistorysLikesWatchLaterVideos(
      req.body.email,
      limit
    );
    res.status(200).json({
      status: "success",
      data: {
        videos: likeVideos,
      },
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Like.find();
    res.send(result);
  } catch (error) {}
});

//post like
router.patch("/", async (req, res) => {
  try {
    const videoId = req.body.videoId;
    const result = await Like.updateOne({ videoId }, req.body, {
      upsert: true,
    });
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

//like to unlike & unlike to like
router.patch("/status/:id", async (req, res) => {
  try {
    const result = await Like.updateOne(
      { _id: req.params.id },
      { $set: { isLike: { $not: "$islike" } } }
    );
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

//revome like
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Like.deleteOne({ _id: req.params.id });
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
